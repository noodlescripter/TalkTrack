const express = require('express');
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8000, () => {
    console.log("Server is listening to 8000");
});
