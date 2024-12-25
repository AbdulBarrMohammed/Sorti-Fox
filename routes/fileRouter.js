const {Router} = require("express");
const fileController = require("../controllers/fileController");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })


const upload = multer({ storage })


const router = Router();



router.post("/library/create/file", upload.single('file'), fileController.createFilePost);
router.post("/library/file/delete/:id", fileController.deleteFilePost);
router.post("/library/file/update/:id", fileController.editFilePost);
router.get("/library/file/selectedFile", fileController.getSelectedFile);

router.post("/library/file/createSubFile/:id", upload.single('file'), fileController.addSubFilePost)
router.post("/library/subfile/delete/:id/:folderId", fileController.deleteSubFilePost);
router.post("/library/subfile/update/:id/:folderId", fileController.editSubFilePost);
router.get("/library/file/:id", fileController.getSelectedFile);


module.exports = router;
