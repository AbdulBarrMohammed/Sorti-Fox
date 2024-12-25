const { PrismaClient } = require("@prisma/client");
const { emit } = require("process");
const prisma = new PrismaClient()

async function insertNewUsers({ email, hashedPassword }) {
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }



async function getUser(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async function getUserById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async function getAllFolders( email ) {
    const user = await prisma.user.findUnique({
       where: {
         email: email
       }
    })

    const folders = await prisma.folder.findMany({
      where: {
        authorId: user.id,
        parentId: null
      }
    })
    return folders;

  }

  async function deleteFolder( id ) {
   const deleteFolder = await prisma.folder.delete({
    where: {
      id: id
    },
  })

  return deleteFolder;
  }

  async function deleteSubFolderFiles(folderId) {
    const deleteFiles = await prisma.file.deleteMany({
      where: {
        folderId: folderId
      },
    })

    return deleteFiles;

  }




  async function insertNewFolder({ email, folderName, createdAt, parentId = null }) {
    try {
      // Finds the user by email
      const user = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Creates a new folder linked to the user and possibly a parent folder
      const newFolder = await prisma.folder.create({
        data: {
          name: folderName,
          createdAt: createdAt,
          author: {
            connect: { id: user.id } // Links the folder to the user (author)
          },
          parent: parentId ? { connect: { id: parentId } } : undefined, // Optionally links to a parent folder
        }
      });

      return newFolder;
    } catch (error) {
      throw error;
    }
  }

  async function updateFolder(id, newFolderName) {

    const updateFolder = await prisma.folder.update({
      where: {
        id: id
      },
      data: {
        name: newFolderName,
      }
    });

    return updateFolder


  }

  async function insertNewSubFolder({ subFolderName, createdAt, parentId, email }) {
    try {


      const user = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!subFolderName| !createdAt || !parentId) {
        throw new Error('Missing required fields: folderName, createdAt, or parentId');
      }

      const newSubFolder = await prisma.folder.create({
        data: {
          name: subFolderName,
          createdAt: createdAt,
          parent: {
            connect: { id: parentId }
          },
          author: {
            connect: { id: user.id }
          }
        }
      });

      return newSubFolder;
    } catch (error) {
      throw new Error('Failed to create subfolder');
    }
  }

  async function getFolder(id) {
    const folder = await prisma.folder.findUnique({
      where: { id: id }
    });

    return folder;

  }

  async function getAllSubFolders(parentId) {

   const folders = await prisma.folder.findMany({
     where: {
       parentId: parentId
     }
   })
   return folders;

  }


  async function insertNewFile({ originalname, size, path, createdAt, email }) {
    try {
      // Finds the user by email
      const user = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Creates a new folder linked to the user and possibly a parent folder
      const newFile = await prisma.file.create({
        data: {
          name: originalname,
          createdAt: createdAt,
          path: path,
          blob: size,
          owner: {
            connect: { id: user.id }
          },
        }
      });

      return newFile;
    } catch (error) {
      throw error;
    }
  }

  async function getAllFiles( email ) {
    const user = await prisma.user.findUnique({
       where: {
         email: email,

       }
    })

    const files = await prisma.file.findMany({
      where: {
        ownerId: user.id,
        folderId: null
      }
    })
    return files;

  }




  async function deleteFile( id ) {
    const deleteFile = await prisma.file.delete({
     where: {
       id: id
     },



   });
   return deleteFile;
  }


  async function updateFile(id, newFileName) {

    const updateFile = await prisma.file.update({
      where: {
        id: id
      },
      data: {
        name: newFileName,
      }
    });

    return updateFile;


  }

  async function getAllSubFiles(folderId) {

   const files = await prisma.file.findMany({
     where: {
      folderId: folderId
     }
   })
   return files;

  }


  async function insertNewSubFile({originalname, size, createdAt, path, email, folderId}) {
    try {


      const user = await prisma.user.findUnique({
        where: { email: email }
      });


      const newSubFile = await prisma.file.create({
        data: {
          name: originalname,
          blob: size,
          path: path,
          createdAt: createdAt,
          folder: {
            connect: { id: folderId }
          },
          owner: {
            connect: { id: user.id }
          }
        }
      });

      return newSubFile;
    } catch (error) {
      throw new Error('Failed to create subfolder');
    }
  }

  async function getFile(id) {
    const file = await prisma.file.findUnique({
      where: { id: id }
    });

    return file;

  }

  module.exports = {
    insertNewUsers,
    getUser,
    getUserById,
    insertNewFolder,
    getAllFolders,
    deleteFolder,
    updateFolder,
    insertNewSubFolder,
    getFolder,
    getAllSubFolders,
    insertNewFile,
    getAllFiles,
    deleteFile,
    updateFile,
    getAllSubFiles,
    insertNewSubFile,
    getAllSubFiles,
    getFile,
    deleteSubFolderFiles

  };
