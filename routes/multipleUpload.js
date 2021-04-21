const express = require('express');
// const fs = require('fs');
const { readFilePromise, writeFilePromise } = require('../file-utils');
const multer = require('multer');
// const path = require('path');
const app = express();

const muRouter = express.Router();

const storageMultipleUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'multiple');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storageMultipleUpload
});

muRouter.get('/multiple', async(req, res) => {
    try {
        const result = await readFilePromise('./multipleUpload.html');
        console.log(result);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/multiple', (req, res) => {
    res.sendFile(__dirname + '/multipleUpload.html');
});

app.post('/multiple', upload.array('file-to-upload', 10), (req, res) => {
    if (req.files) {
        const uploadedFiles = req.files;
        res.status(200).json({
            files: req.files
        }).redirect('/');
    } else {
        res.status(500).json({ error: "No such a file" });
    }
});

module.exports.muRouter = muRouter;