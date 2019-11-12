
const bodyParser = require('body-parser');
const path = require('path');
const sqlite = require("sqlite");
const express = require('express');
const dbPromise = sqlite.open("./data.sqlite");

// Setting our local port as 3000
const port = 3000
const app = express();


//app.engine('html', require('ejs').__express);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

/*
app.get("/", async (req, res) => {
    const db = await dbPromise;
    const users = await db.all("SELECT * FROM users");
    console.log(users);
});*/

// Currently this is pulling the straight HTML page but isn't posting the CSS or images
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/about.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/about.html'));
});
app.get('/createAccount.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/createAccount.html'));
});
app.get('/howToUse.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/howToUse.html'));
});
app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/myLibrary.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/myLibrary.html'));
});


app.post('/data', async (req, res) => {
    const db = await dbPromise;
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.email);
    console.log(req.body.password);
    await db.run(
        "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?);",
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
    );
    
});

const setup = async () => {	
        const db = await dbPromise;
        //db.migrate({ force: "last"});
        await db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            firstName STRING,
            lastName STRING,
            email STRING,
            password STRING
            );`);
        app.listen(3000, () => console.log("listening on http://localhost:3000"));
};

setup();
