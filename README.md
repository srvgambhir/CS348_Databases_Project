# 348 Project

## Getting started

1. Clone the git repo

### Start a local instance of the database

1. mysql -u root -p
2. CREATE DATABASE soccerDB;
3. USE soccerDB
4. GRANT ALL PRIVILEGES ON database_name.\* TO 'root'@'localhost';

You now have created a local instance of the database. The backend will auto populate the database once the server is running. Note that we developed only using the **production dataset**, and that thse steps are for initilizing and populating using the full production data.

### Start the backend server

1. Open another terminal window and cd into the root of the project
2. cd backend
3. npm install
4. npm start

The backend server should now be running on port 8080

Note: The password for local root user in mysql needs to be set to empty

### Start the frontend

1. Open another terminal window and cd into the root of the project
2. cd client
3. npm install
4. npm start

The frontent should now appear on port 3000


## Current Features
- Filter by Team
- Filter by Team in a Season
- Filter by Stat 
- Aggregated stats for each team
- Filter by Season
- Order by in Season table
