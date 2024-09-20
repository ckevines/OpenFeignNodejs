const express = require('express');
const app = express();

// Middleware to check Basic Authentication
app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("authorization >" , authHeader)
    const authUser = req.headers['user'];
    console.log("authUser >" , authUser)
    const authPass = req.headers['password'];
    console.log("authPass >" , authPass)

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    // Extract the Base64 part from the header
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Check if username and password match
    if (username === 'test' && password === 'password') {
        next(); // Authentication successful, proceed to next handler
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Books endpoint with id and query parameter 'name'
app.get('/book/:id', (req, res) => {
    const id = req.params.id;           // Get the ID from the URL path
    const name = req.query.name;        // Get the 'name' query parameter
    
    if (!name) {
        return res.status(400).json({ error: 'Name query parameter is missing' });
    }

    // Create the response object
    const response = {
        id: id,
        name: name,
        content: `Book title - ${name}`
    };

    // Return the response as JSON
    res.status(200).json(response);
});

// Start the server on port 5000
app.listen(5500, () => {
    console.log('Server is running on http://localhost:5500');
});

