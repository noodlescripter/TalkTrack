const express = require('express');
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
require('dotenv').config();
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');

const options = {
    key:key,
    cert:cert
}

const httpsServer = https.createServer(options, app);

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

httpsServer.listen(3000, () => {
    console.log("Server is listening to https://******:3000");
});
