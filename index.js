const express = require('express');
const fs = require('fs');
const app = express();
const multer = require('multer');
const path = require('path');

const { router } = require('./routes/login');
const { suRouter } = require('./routes/singleUpload')
const { readFilePromise, writeFilePromise } = require('./file-utils');

require('dotenv').config();
const port = process.env.PORT || 3001;

const storageSingleUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'info');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storageSingleUpload
});


app.use(express.json());

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

//===Upload a single file===
app.post('/', upload.single('file-to-upload'), (req, res) => {
    if (req.file) {
        res.status(200).json({  
            file: req.file
        });
    } else {
        res.status(500).json({ error: "No such a file" });
    }
});

//===Upload multiple files===
// app.post('/', upload.array('file-to-upload', 10), (req, res) => {
//     // res.redirect('/');
//     if (req.files) {
//         const uploadedFiles = req.files;
//         res.status(200).json({
//             files: req.files
//         });
//     } else {
//         res.status(500).json({ error: "No such a file" });
//     }
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});