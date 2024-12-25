
# SortiFox

Sorti Fox is a web application that can store files and store files into as many different folders as a user wants as well as delete files and folders and download the files they saved and share it with others by email. They can also see the size of each file and folder and see the date created and the date updated of each file and folder

## Functionality 

The following **required** functionality is completed:

* [ ] User can log in or create a new account by entering an email and password
* [ ] Once user is logged in they can upload a new file or create a new folder
* [ ] Each folder they create can store a new folder or another file
* [ ] The user can also edit and delete folders or files
* [ ] Users can also download or share the file they uploaded
* [ ] Users will be able to see the file size, date created, and date updated of each file or folder they create

The following **extensions** are implemented:

* ejs
* Prisma
* Postgresql
* Cloudinary
* Session
* Database
* Passport
* Express
* NodeJS
* Jsdeliver


## Video Walkthrough

Here's a walkthrough of implemented user stories:

![SortiFoxDemo](https://github.com/user-attachments/assets/a62ad81f-a04c-4b49-ad0e-0ce66dd5b8d8)


<img src='walkthrough.gif' title='Video Walkthrough' width='60%' alt='Video Walkthrough' />

## Notes

I faced the challenge of storing files into cloudinary and retrieving the files to display it to the user when requested. I also faced the challenge of figuring out a way that the user can download the file and creating a way for the user to send their files to others by email using jsdeliever. I also had trouble figuring out a way to have files and folders be set under another folder using prisma data model.


## License

    Copyright 2024 Abdul-Barr Mohammed

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0
