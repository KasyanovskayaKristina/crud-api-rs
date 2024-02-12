﻿# crud-api-rs
- Written by typescript with Node.js for Rs School
- Task : https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md
- Start :
 1. git clone https://github.com/KasyanovskayaKristina/crud-api-rs.git
 2. git checkout crud-api
 3. npm i
 - How to run :
   - Run the app in dev mode **npm run start:dev**
   - Run the app in prod mode **npm run start:prod**
   - Run the app in multi mode **npm run start:multi**
  
- Api Implemented endpoint **api/users**
  - GET **api/users** - get all users
  - GET **api/users/${userId}** - get one user
  - POST **api/users** - to create record about new user and store it in database
  - PUT **api/users/${userId}** - to update existing user (field hobbies can be empty)
  - DELETE - **api/users/${userId}** - delete user for id
- Users fields
  - Example:   {
     "username":"Joe",
    "age":32,
    "hobbies": ["sky", "riding"]
    }
