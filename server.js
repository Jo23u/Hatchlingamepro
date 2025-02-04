const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let active

// In-memory storage for active users
let activeUsers = [];

// Endpoint to get active users
app.get('/active-users', (req, res) => {
    res.json(activeUsers);
});

// Endpoint to add an active user
app.post('/active-users', (req, res) => {
    const { name } = req.body;
    if (!activeUsers.includes(name)) {
        activeUsers.push(name);
        res.status(200).send('User added');
    } else {
        res.status(400).send('User already exists');
    }
});

// Endpoint to remove an active user
app.delete('/active-users', (req, res) => {
    const { name } = req.body;
    activeUsers = activeUsers.filter(user => user !== name);
    res.status(200).send('User removed');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
