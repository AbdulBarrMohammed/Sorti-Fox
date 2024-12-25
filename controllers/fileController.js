const db = require("../db/queries");
const { formatDistanceToNow }  = require('date-fns');
cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'dzuhra9bj',
    secure: true,
    api_key: '311875277133285',
    api_secret: 'VNh1gI5JRjLCiG6JXpT7lIIgoKs'
});


/**
  * Creates file by storing file into cloudinary
  * @param request, response, next
  * @return none
  */
async function createFilePost(req, res, next) {


    try {
        const { email } = req.user;

        const fileType = req.file.mimetype;


        // Determine resource type based on file MIME type
        let resourceType = "auto";
        if (fileType === "application/pdf") {
            resourceType = "raw";
        } else if (fileType.startsWith("image/")) {
            resourceType = "image";
        }

        //Checks if file extension is not supported
        if (fileType == "text/plain") {

            return res.send(`
                <script>
                alert("Can't accept text files.");
                window.history.back();
                </script>
            `);

        }
        else {
            const results = await cloudinary.uploader.upload(req.file.path, {
                resource_type: resourceType,

            })
            const url = results.secure_url;
            let path = url.replace('/upload/', '/upload/pg_1/').replace('.pdf', '.jpg');


            const { originalname, size } = req.file;
            const createdAt = new Date();
            await db.insertNewFile({originalname, size, path, createdAt, email})
        }





    } catch(err) {
         return res.send(`
        <script>
          alert("Can't accept this type of file.");
          window.history.back(); // Go back to the previous page
        </script>
      `);

    }

    res.redirect("/library")

}


/**
  * Saves edits made to file
  * @param request, response
  * @return none
  */
async function editFilePost(req, res) {
    const { newFileName } = req.body;
    await db.updateFile(req.params.id, newFileName);
    res.redirect("/library");


}

/**
  * Saves edits made to sub files
  * @param request, response
  * @return none
  */
async function editSubFilePost(req, res) {
    const { newFileName } = req.body;
    const id = req.params.folderId;
    const subFolder = await db.getFolder(id);
    const parentId = subFolder.id;

    await db.updateFile(req.params.id, newFileName);

    res.redirect(`/library/folder/${parentId}`)

}


/**
  * Grabs selected file from database
  * @param request, response
  * @return none
  */
async function getSelectedFile(req, res) {
    const id = req.params.id;
    const file = await db.getFile(id)
    res.render(`views/selectedFile`, {user: req.user, file: file});
}


/**
  * Removes file from database
  * @param request, response
  * @return none
  */
async function deleteFilePost(req, res) {

    const id = req.params.id;
    await db.deleteFile(id)

    res.redirect("/library")


}

/**
  * Removes sub file from database
  * @param request, response
  * @return none
  */
async function deleteSubFilePost(req, res) {
    const id = req.params.folderId;
    const subFolder = await db.getFolder(id);
    const parentId = subFolder.id;
    await db.deleteFile(req.params.id);

    res.redirect(`/library/folder/${parentId}`)

}

/**
  * Adds sub file to cloudinary
  * @param request, response, next
  * @return none
  */
async function addSubFilePost(req, res, next) {

    // Gets the file MIME type
    const fileType = req.file.mimetype;


    // Determines the resource type based on file MIME type
    let resourceType = "auto";
    if (fileType === "application/pdf") {
        resourceType = "raw";
    } else if (fileType.startsWith("image/")) {
        resourceType = "image";
    }

    const results = await cloudinary.uploader.upload(req.file.path, {
        resource_type: resourceType,

    })

    const url = results.secure_url;
    let path = url.replace('/upload/', '/upload/pg_1/').replace('.pdf', '.jpg');

    const { email } = req.user;
    const folderId = req.params.id;
    const { originalname, size} = req.file;
    const createdAt = new Date();
    await db.insertNewSubFile({originalname, size, createdAt, path, email, folderId})

    res.redirect(`/library/folder/${folderId}`)

}

module.exports =  {

    createFilePost,
    deleteFilePost,
    editFilePost,
    getSelectedFile,
    addSubFilePost,
    editSubFilePost,
    deleteSubFilePost


  }
