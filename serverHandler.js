
// w3schools.com/nodejs/nodejs_mysql_insert.asp

// https://github.com/chuckdries/cpi310-fall-2019/blob/master/index.js this could be worth doing 

// So what I think needs to happen is this needs to be in the same file as our regular server. It can't just be a script
// That's what Chuck has
// is there anyway i can test this 
// you could save the files locally on your computer?

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
// do you wanna use discord or something to work on it 
// yeah sure that'd be easier. I never know when you're making comments
// https://discord.gg/s9jPTb 
// going to hunt for my headphones
// found them kk 
/*
do we need some code like this
const setup = async () => {
  const db = await dbPromise;
  db.migrate({ force: "last" });
  app.listen(3000, () => console.log("listening on http://localhost:3000"));
};

setup();
*/

// Probably. I'm running into an issue too where it'll load index.html but without images or CSS, and it won't load other pages
// Alright I figured out how to get app.get to load multiple pages, still isn't loading the CSS or images
// And the form works. I'm getting console logs at least. 