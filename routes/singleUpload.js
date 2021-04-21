const express = require('express');
// const fs = require('fs');
const { readFilePromise, writeFilePromise } = require('../file-utils');
const multer = require('multer');
const app = express();
// const path = require('path');

const suRouter = express.Router();

const storageSingleUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'single');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storageSingleUpload
});

app.get('/single', async(req, res) => {
    try {
        const result = await readFilePromise('./singleUpload.html');
        console.log(result);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/single', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/single', upload.single('file-to-upload'), (req, res) => {
    if (req.file) {
        // const uploadedFile = req.file;
        res.status(200).json({
            file: req.file
        });
    } else {
        res.status(500).json({ error: "No such a file" });
    }
});

module.exports.suRouter = suRouter;