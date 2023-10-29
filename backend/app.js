const EXPRESS = require('express');
const app = EXPRESS();
const SESSION = require('express-session');
const flash = require('connect-flash');
const {log, info, error} = require('console');
const path = require('path');
const MATE = require('ejs-mate');
const bodyParser = require('body-parser');
const method_override = require('method-override');
const MyData = require('./models/apiresponseStorage');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();
const https = require('https');
const fs = require('fs');



/*
    Shit goes in here
*/
const sessionConfig = {
    secret: 'needstobesomesecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}

app.use(EXPRESS.static('public'));
/* Body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Proper error handling */

/* Method OR */

app.use(SESSION(sessionConfig));
app.use(cors());

/* Routes goes here */

/* app.get('/engine', (req, res) => {
    res.render('pages/engine_v2');
}); */

/* Database connection */
/* Database connection */
const key = fs.readFileSync(__dirname+'/selfsigned.key');
const cert = fs.readFileSync(__dirname+'/selfsigned.crt');

const options = {
    key: key,
    cert: cert
}

const httpsServer = https.createServer(options, app);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
});

const db = mongoose.connection;
db.on('error', error => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/home/session', async (req, res) => {
    try {
        const body = req.body;

        if (!body.iden) {
            res.status(400).send("Bad Request: Missing 'iden' in the request body");
        } else {
            info(req.body);
            const newData = new MyData(body);
            await newData.save();
            await info('Worked Fine');
            res.status(201).send("Created");
        }
    } catch (e) {
        const msg = "You don't have a successful Database connection";
        res.status(500).send(msg);
    }
});

app.get('/home/session/alldata', async function (req, res) {
    let data = await MyData.find({});
    res.status(200).send(data);
});


app.get('/disconnect', function (req, res) {
    API_KEY = "";
    mongoose.connection.close();
    res.redirect('/login');
});




/* server */
httpsServer.listen(2000, function (req, res) {
    info('Backend is up at https://******:2000');
});
