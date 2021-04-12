const express = require('express');
const fs = require('fs');
const { readFilePromise, writeFilePromise } = require('../file-utils');

const router = express.Router();

router.get('/login', async(req, res) => {
    try {
        const result = await readFilePromise('./login.html');
        console.log(result);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports.router = router;