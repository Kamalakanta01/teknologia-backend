<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Express Server Documentation</h1>

<h2>Overview</h2>

<p>This document outlines the functionality and usage of an Express.js server implemented with various middleware and routes for handling data and file uploads. The server includes endpoints for retrieving, uploading, and deleting data, as well as connection with a database.</p>

<h2>Dependencies</h2>

<ul>
    <li><strong>Express</strong>: A web application framework for Node.js.</li>
    <li><strong>bcrypt</strong>: A library for hashing passwords.</li>
    <li><strong>mongoose</strong>: An Object Data Modeling (ODM) library for MongoDB and Node.js.</li>
    <li><strong>dotenv</strong>: A zero-dependency module for loading environment variables from a <code>.env</code> file into <code>process.env</code>.</li>
    <li><strong>multer</strong>: A middleware for handling <code>multipart/form-data</code>, primarily used for file uploads.</li>
    <li><strong>cors</strong>: A middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js applications.</li>
</ul>

<h2>Configuration</h2>

<ol>
    <li><strong>Express Setup</strong>: The server is initialized using Express.</li>
    <li><strong>Environment Variables</strong>: Environment variables are loaded from a <code>.env</code> file using <code>dotenv</code>.</li>
    <li><strong>Database Connection</strong>: Connection to a MongoDB database is established using the <code>connection</code> object.</li>
    <li><strong>Multer Storage Configuration</strong>: Multer middleware is configured to store uploaded files in memory.</li>
    <li><strong>CORS Setup</strong>: Cross-Origin Resource Sharing is enabled using the <code>cors</code> middleware.</li>
    <li><strong>Server Port</strong>: The server listens on port 8080.</li>
</ol>

<h2>Routes</h2>

<ol>
    <li><strong>GET /data</strong>:
        <ul>
            <li>Retrieves paginated data from the database.</li>
            <li>Parameters:
                <ul>
                    <li><code>page</code>: Optional query parameter specifying the page number (default is 1).</li>
                </ul>
            </li>
            <li>Returns:
                <ul>
                    <li>JSON response containing retrieved data, current page, total pages, and total count.</li>
                </ul>
            </li>
            <li>Error Handling:
                <ul>
                    <li>Returns a 500 status with an error message if data retrieval fails.</li>
                </ul>
            </li>
        </ul>
    </li>
    <li><strong>POST /upload</strong>:
        <ul>
            <li>Handles file uploads along with user data.</li>
            <li>Parameters:
                <ul>
                    <li><code>name</code>: User name.</li>
                    <li><code>password</code>: User password.</li>
                    <li><code>resume</code>: File upload (expects a file named "resume").</li>
                </ul>
            </li>
            <li>Returns:
                <ul>
                    <li>JSON response containing saved data if successful.</li>
                </ul>
            </li>
            <li>Error Handling:
                <ul>
                    <li>Returns a 400 status if a duplicate resume is detected.</li>
                    <li>Returns a 500 status with an error message if upload fails.</li>
                </ul>
            </li>
        </ul>
    </li>
    <li><strong>DELETE /data/:id</strong>:
        <ul>
            <li>Deletes data by ID from the database.</li>
            <li>Parameters:
                <ul>
                    <li><code>id</code>: ID of the data to be deleted.</li>
                </ul>
            </li>
            <li>Returns:
                <ul>
                    <li>JSON response containing deleted data if successful.</li>
                </ul>
            </li>
            <li>Error Handling:
                <ul>
                    <li>Returns a 404 status if data with the given ID is not found.</li>
                    <li>Returns a 500 status with an error message if deletion fails.</li>
                </ul>
            </li>
        </ul>
    </li>
</ol>

<h2>Constants</h2>

<ul>
    <li><strong>ITEMS_PER_PAGE</strong>: Defines the number of items to display per page in paginated results.</li>
</ul>

<h2>Middleware</h2>

<ul>
    <li><strong>express.json()</strong>: Parses incoming request bodies with JSON payloads.</li>
    <li><strong>upload.single("resume")</strong>: Handles single file uploads with the field name "resume".</li>
</ul>

<h2>Error Handling</h2>

<ul>
    <li>Errors are logged to the console and appropriate HTTP status codes and error messages are returned in case of failures.</li>
</ul>

<h2>Server Initialization</h2>

<ul>
    <li>The server listens on port 8080.</li>
    <li>Connection to the database is established asynchronously, with console logs indicating successful connection or any errors encountered.</li>
</ul>

</body>
</html>
