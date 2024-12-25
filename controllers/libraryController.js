const db = require('../db/queries');

const { formatDistanceToNow }  = require('date-fns');


/**
  * Logs out user
  * @param request, response
  * @return none
  */
async function logOutGet(req, res){
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });

  }


/**
  * Displays users current folders and files
  * @param request, response
  * @return none
  */
  async function displayLibrary(req, res) {

    try {
      const { email } = req.user;
      const folders = await db.getAllFolders(email);
      const files = await db.getAllFiles(email);
      res.render("views/library", { user: req.user, folders: folders, files: files, formatDistanceToNow: formatDistanceToNow})

    }
    catch(err) {
      console.log(err);
    }


}


  module.exports =  {

    logOutGet,
    displayLibrary



  }
