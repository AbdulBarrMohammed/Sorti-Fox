const db = require("../db/queries");
const { formatDistanceToNow }  = require('date-fns');


/**
  * Creates new folder
  * @param request, response
  * @return none
  */
async function createFolderPost(req, res) {
    //Gets email for current logged in user
    const { email } = req.user;
    const { folderName } = req.body;
    const createdAt = new Date();

    //Inserts new folder
    await db.insertNewFolder({ email, folderName, createdAt })

    res.redirect("/library")


}


/**
  * Removes folder from database
  * @param request, response
  * @return none
  */
async function deleteFolderPost(req, res) {
    const id = req.params.id;

    //Delete the parent folders files first;
    await db.deleteSubFolderFiles(id);
    await db.deleteFolder(id)

    res.redirect("/library")


}

/**
  * Edits changes made to folder
  * @param request, response
  * @return none
  */
async function editFolderPost(req, res) {
    const {newFolderName} = req.body;
    await db.updateFolder(req.params.id, newFolderName);
    res.redirect("/library");


}

/**
  * Grabs folder from database and displays it to user
  * @param request, response
  * @return none
  */
async function getSelectedFolder(req, res) {
    const id = req.params.id;
    const folder = await db.getFolder(id);
    const parentId = req.params.id;
    const subFolders = await db.getAllSubFolders(parentId);
    const subFiles = await db.getAllSubFiles(parentId);
    res.render(`views/selectedFolder`, {user: req.user, folder: folder, formatDistanceToNow: formatDistanceToNow, subFolders: subFolders, subFiles: subFiles});
}


/**
  * Adds sub folder to database
  * @param request, response
  * @return none
  */
async function addSubFolderPost(req, res) {
    //Gets parent id from current folder;
    const { email } = req.user;
    const parentId = req.params.id;
    const { subFolderName } = req.body;
    const createdAt = new Date();
    await db.insertNewSubFolder({ subFolderName, createdAt, parentId, email });
    res.redirect(`/library/folder/${parentId}`)



}

/**
  * Deletes sub folder from database
  * @param request, response
  * @return none
  */
async function deleteSubFolderPost(req, res) {
    const id = req.params.id;
    const subFolder = await db.getFolder(id);
    const parentId = subFolder.parentId

    //First deletes all files of the folder
    await db.deleteSubFolderFiles(id);
    await db.deleteFolder(id)

    res.redirect(`/library/folder/${parentId}`)
}

/**
  * Edits changes made to sub folder
  * @param request, response
  * @return none
  */
async function editSubFolderPost(req, res) {

    const id = req.params.id;
    const subFolder = await db.getFolder(id);
    const parentId = subFolder.parentId;

    const {newSubFolderName} = req.body;
    await db.updateFolder(req.params.id, newSubFolderName);

    res.redirect(`/library/folder/${parentId}`)

}



module.exports =  {
    createFolderPost,
    deleteFolderPost,
    editFolderPost,
    getSelectedFolder,
    addSubFolderPost,
    deleteSubFolderPost,
    editSubFolderPost

  }
