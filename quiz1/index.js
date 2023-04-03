
// Global variables
const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
// Initialize express
const app = express();
// Set up cors
app.use(cors({ origin: 'http://localhost:3000' }));
// Set up express serve static files
app.use('/quiz1', express.static('./static'));

app.get('/uni/:name', (req, res) => {
    fetch('http://universities.hipolabs.com/search?name=' + req.params['name'])
        .then(response => response.json())
        .then(data => res.json(data));
});

app.get('/uni/:name/:country', (req, res) => {
    fetch('http://universities.hipolabs.com/search?name=' + req.params['name'] +"&country=" + req.params['country'])
        .then(response => response.json())
        .then(data => res.json(data));
});
//Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});