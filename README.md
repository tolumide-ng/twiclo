# Movies Vault

## Table of Content

- [About this Application](#about-this-application)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [General](#general)
- [How does the application work](#how-does-the-application-work)
- [Running this application locally and testing](#running-this-application-locally-and-testing)
  - [Using npm](#using-npm)
    - [Prerequisites](#prerequisites-1)
    - [Run the Application's Unit tests](#using-npm-run-the-applications-unit-tests)
    - [Start the Application locally](#using-npm-start-the-application-locally)
    - [Shutdown the Application](#using-npm-shutdown-the-application)
  - [Some Decisions made](#some-decision-made)
  - [TroubleShooting](#troubleshooting)
  - [Recording](#recording)

## About this Application

The application focuses on the following key principles:

- **Accessibility(Respsonsiveness)**: The application is designed to be user-friendly across devices, making navigation and interaction seamless on both mobile and desktop platforms
- **Modularity**: Embraces the Atomic Design Pattern
- **Testability**: Enables robust and efficient testing to ensure reliability and quality
- **Performance**: Optimizes performance by loading resources only when needed, reducing initial load times
- **Clean Code**: Writing maintainable, readable, and efficient code for better collaboration and future updates.
- **Scalability**
- **Error Handling**

### Frontend

- The application enables a user to view their homeFeed on their twitter account
- The application allows a user to go the specific profile page of an existing user either by clicking on such user's post or directly through the URL
- The application allows users to post their own content on the application
  - At the moment this is limited to 280 characters

### Backend

- The Application's backend uses mock data which are available in `backend.src/data/\*.json`
- The API uses a simple json doc as a mock db, new tweets are written to the file, and existing tweets are fetched from it
- The API supports the ability to:
  1. Create a post
  2. Fetch the post feed on your account as a user
  3. Fetch the most recent posts of a specific user

### General

- This application is accessible on all types of devices (mobile and desktop)
- This project uses the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/) for it's component structure
- It is built with

  - [React v19](https://reactjs.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Axios](https://www.npmjs.com/package/axios) for Handling Network requests
  - Styled with CSS
    - and modularized with css modules
  - React ContextAPI [ContextAPI](https://react.dev/reference/react/createContext) for State management
  - Bundled with [Vite](https://www.npmjs.com/package/vite)
  - Routing is managed with [React Router](https://reactrouter.com/)

- The application is tested (Unit tests) using:
  - [Jest](https://jestjs.io/) and,
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## How Does the application work

This application is a twitter clone, it enables users to make posts on their account, view posts on their feed, and view the profile of users in their feed. This application does not require any means of authentication at the momeent

<br />
<br />

> [!NOTE] Please ensure that port `5173` and port `4000` are free and available for use on your machine as these are the ports used in this application
>
> - Port 5173: Frontend
> - Port 4000: Backend

## Running this application locally and testing

1. Open your workspace terminal
2. Clone this repository
3. Cd into the cloned repository
4. Continue with npm below

### Using npm:

#### Prerequisites:

1. [Node](https://nodejs.org/en/) at least v21.7.3
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Using npm: Run the Application's Unit tests

1. Install the dependencies with:

```
npm install
```

2. Run the tests with:

```
npm test
```

#### Using npm: Start the Application locally

1. Install the dependencies with:

```
npm install
```

2. Start the application with:

```
npm start
```

Visit [`localhost:5173`](localhost:5173) on your favourite browser to view the application

#### Using npm: Shutdown the Application

1. Press `Cmd + C` on MacOs or `Ctrl + C` on Ubuntu to stop the application

## Some Decision Made

- The backend (API_URL) was intentionally exposed on this application to make the access easier in one command without having to set up any config which might introduce an inconvience for users
  - In a Production application, this would be stored and accessed using secret management tools like a `.env` file
- The application automatically assigns you a user-account at the moment so you don't have to login or signup on your own. You can update your user account by changing your account uuid in the apiCall utility function
- The application uses simple RESTful API at the moment over something like Server Sent Events (SSE) which would be more appropriate for this uscase to minimize efforts and better focus on other parts of the application
- Testing for the bakend endpoints are out of scope for this delivery

## TroubleShooting:

1. Be sure to confirm that you do not have another project running on [`port 4000`](localhost:4000) and [`port 5173`](localhost:5173) before running this application
2. Ensure that you're logged into the application to access the `Favorite Movies` Feature
3. Seeing an Error like this error when trying to install depdencies on Ubuntu?

```
Error: EACCES: Permission denied, mkdir '/<file_path>
```

Solution:

- Run `rm -rf node_modules` in the repository and then `npm install` again

## Recording
