const express = require('express');
const fs = require('fs');
const app = express();
const multer = require('multer');
const path = require('path');

const { router } = require('./routes/login');
const { readFilePromise, writeFilePromise } = require('./file-utils');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'info');
    },
    filename: (req, file, cb) => {
        console.log('file: ' + file);
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});


require('dotenv').config();
const port = process.env.PORT || 3001;

app.use(express.json());

// app.get('/', (req, res) => {
//     res.setHeader('Content-Type', 'text/html');
//     // res.send("Hello world!");
//     res.end('<p>zadara</p>');
// });

app.use('/', router);

app.get('/', async(req, res) => {
    try {
        const result = await readFilePromise('./index.html');
        res.send(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', upload.array('file-to-upload', 10), (req, res) => {
    if (req.files) {
        const uploadedFiles = req.files;
        // res.redirect('/');
        res.status(200).json({
            files: req.files
        });
    } else {
        res.status(500).json({ error: "No such a file" });
    }
    // res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});