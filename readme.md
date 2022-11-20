## Event Management

### Installation

After cloning the project at first please install the above packages.

You can install these packages using:

- npm install

### Database

Mysql Database is used in this project. You have to create a database named 'eventdb' and import the following sqlfile in the database

## Running the project

#### After completing the database setup and installing the packages, you can run the project using the following command:

- node server.js

This will run the project in your localhost: http://localhost:8080/

# API EndPoint

Event List API, where we can get all active events .

- Get- http://localhost:8080/api/activeEvent

Event Details API, where we can get single event information

- Get- http://localhost:8080/api/event/1

Workshop List API, where we can get all the active workshops of a single
event

- Get- http://localhost:8080/api/activeWorkshopEvent/1

Workshop Details API, where we can get single workshop information

- Get- http://localhost:8080/api/workshop/1

Reservation API where we can reserve a workshop by giving user id as url param and workshop id as req body

- Post- http://localhost:8080/api/addUserWorkshop/1
  request body -
  {
  "workshop_id": 2
  }
