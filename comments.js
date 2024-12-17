//create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//create a comment
app.post('/comments', function (req, res) {
    const comment = req.body.comment;
    if (!comment) {
        return res.status(400).send('Missing comment');
    }
    fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Error reading comments file');
        }
        const comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('comments.json', JSON.stringify(comments), function (err) {
            if (err) {
                return res.status(500).send('Error writing comments file');
            }
            res.send('Comment added');
        });
    });
});

//get all comments
app.get('/comments', function (req, res) {
    fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
            return res.status(500).send('Error reading comments file');
        }
        const comments = JSON.parse(data);
        res.send(comments);
    });
});

app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});