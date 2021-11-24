# twitter-clone

![project-url](https://twitter-squareboat.herokuapp.com/login)

## Description

A full-stack Twitter clone app built using Node.js, Express.js, React.js, and MongoDB.

### Background

The project was created as an assignment.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have a running MongoDB instance.

### Configuration

Copy the `server/.env.example` file to `server/.env` and update the values if your configuration is different than the default.

Create a `.env` file in frontend folder and copy and past below command
REACT_APP_BACKEND_URL=http://localhost:5000/api


### Installing

Install server dependencies

```bash
$ cd backend
$ npm install
```

Install client dependencies

```bash
$ cd frontend
$ npm install
```

### Start the server in development mode

```bash
$ cd backend
$ npm run dev
```

If everything was successful, you should see the messages being displayed in the terminal, telling that the server has successfully connected to a MongoDB and runs on a given port.

### Start the client

```bash
$ cd frontend
$ npm start
```

Now, the app should be running on `http://localhost:3000`.