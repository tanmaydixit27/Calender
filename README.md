# Event Management Application

This is a MERN stack-based Event Management Application with authentication and calendar integration. Users can register, log in, and manage their events in a weekly calendar view. The project supports secure authentication, and optionally, users can sync their events with Google Calendar.

## Features

### Backend
- **User Registration and Login**: Secure authentication with JWT.
- **Event Management**:
  - CRUD operations for events, with schema fields such as `name`, `datetime`, and `tag`.
  - Only one event per time slot allowed, with error handling for conflicts.

  
### Frontend
- **User Interface** built with React and Material UI:
  - Simple login screen with email/password authentication.
  - Weekly calendar view (custom-built, not using any calendar npm package) that displays hourly divisions and user events.
  - Event creation form to schedule events with conflict handling.
  

## Tech Stack

- **Frontend**: React, Material UI, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)


## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB instance (local or clounpm installd)


Commands to run the repository
git clone https://github.com/tanmaydixit27/Calender
cd Calender

cd ../Server
npm install
npm start

cd ../Client
npm install
npm start

