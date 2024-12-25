const {Router} = require("express");
const folderController = require("../controllers/folderController");

const router = Router();



router.post("/library/create", folderController.createFolderPost);
router.post("/library/folder/delete/:id", folderController.deleteFolderPost);
router.post("/library/folder/update/:id", folderController.editFolderPost);
router.get("/library/folder/:id", folderController.getSelectedFolder);
router.post("/library/folder/createSubFolder/:id", folderController.addSubFolderPost)

router.post("/library/subfolder/delete/:id", folderController.deleteSubFolderPost);
router.post("/library/subfolder/update/:id", folderController.editSubFolderPost);


module.exports = router;
