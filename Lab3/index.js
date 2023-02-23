// Global variables
const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
// Initialize express
const app = express();
// Set up cors
app.use(cors({ origin: 'http://localhost:3000' }));
// Set up express serve static files
app.use('/ITWS4500-S23-howelc', express.static('./ITWS4500-S23-howelc'));

app.get('/trivia', (req, res) => {
    fetch('https://opentdb.com/api.php?amount=20')
        .then(response => response.json())
        .then(data => res.json(data));
});

app.get('/trivia/:category', (req, res) => {
    fetch('https://opentdb.com/api.php?amount=20&category=' + req.params['category'])
        .then(response => response.json())
        .then(data => res.json(data));
});

app.put('/game/put', (req, res) => {
    let putJson = {
        "response": "You put something"
    };
    res.json(putJson);
});

app.post('/game/post', (req, res) => {
    let postJson = {
        "response": "You posted something"
    };
    res.json(postJson);
});

app.delete('/game/delete', (req, res) => {
    let deleteJson = {
        "response": "You deleted something"
    };
    res.json(deleteJson);
});

//Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
