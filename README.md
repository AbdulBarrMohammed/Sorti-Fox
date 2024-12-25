
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


## Image Walkthrough

Home page layout:

<img width="1000" alt="Screenshot 2024-12-25 at 3 25 10 PM" src="https://github.com/user-attachments/assets/160b17a9-1a97-4c47-908f-f389f64c1571" />




Log in and sign up page:

<img width="1439" alt="Screenshot 2024-12-25 at 12 06 11 PM" src="https://github.com/user-attachments/assets/861c753c-185d-4415-ba62-dd8fe167b406" />

<img width="1440" alt="Screenshot 2024-12-25 at 12 06 04 PM" src="https://github.com/user-attachments/assets/0bf74af4-26e8-439c-8fdc-34928117c863" />





Files and Folders layout:

<img width="1440" alt="Screenshot 2024-12-25 at 12 04 32 PM" src="https://github.com/user-attachments/assets/963f9b43-3fce-45aa-a7bf-8f84769afba5" />





Creating new Folder:

<img width="1439" alt="Screenshot 2024-12-25 at 12 04 51 PM" src="https://github.com/user-attachments/assets/d8447c02-b9cc-48e6-8fdb-68787a1ee98a" />





Sharing file:

![Screenshot 2024-12-25 at 12 07 38 PM](https://github.com/user-attachments/assets/4c9a0093-33fd-4408-8a63-010b8c4d8363)





Navigating to folder created:

<img width="1438" alt="Screenshot 2024-12-25 at 12 05 34 PM" src="https://github.com/user-attachments/assets/38a4ac4c-4348-4afa-9970-9f02d8642493" />





Selected file:

<img width="1440" alt="Screenshot 2024-12-25 at 12 07 00 PM" src="https://github.com/user-attachments/assets/347477f2-eb67-4372-a296-89fbfb8ab8e6" />





## Notes

I faced the challenge of storing files into cloudinary and retrieving the files to display it to the user when requested. I also faced the challenge of figuring out a way that the user can download the file and creating a way for the user to send their files to others by email using jsdeliever. I also had trouble figuring out a way to have files and folders be set under another folder using prisma data model.


## License

    Copyright 2024 Abdul-Barr Mohammed

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0
