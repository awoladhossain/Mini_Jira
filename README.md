# Mini Jira

A mini project management tool inspired by Jira, built with Node.js and TypeScript.

## Description

This project is a backend service for a "Mini Jira" application. It provides a RESTful API for managing users, projects, tasks, and workspaces.

## Features

-   User authentication (signup, login)
-   Project management (create, read, update, delete)
-   Task management (create, read, update, delete, assign)
-   Workspace organization
-   API documentation with Swagger

## Technology Stack

-   **Backend:** Node.js, Express.js
-   **Language:** TypeScript
-   **Database:** (Please specify your database, e.g., PostgreSQL, MongoDB)
-   **API Documentation:** Swagger

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/awoladhossain/Mini_Jira.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd ts-frontend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add the necessary environment variables. You can use `.env.example` as a template.

## Running the application

To run the application in development mode:

```bash
npm run dev
```

To build the application for production:

```bash
npm run build
```

To run the application in production:

```bash
npm start
```

## API Documentation

Once the server is running, you can access the Swagger API documentation at `http://localhost:<PORT>/api-docs`.
