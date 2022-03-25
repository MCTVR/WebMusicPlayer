const express = require("express");
const https = require("https");
const compression = require("compression");
const fs = require("fs");

const env = require("./env.json");

const app = express();
app.use(compression());
app.use(express.static("static"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "*");
    res.setHeader("Content-Range", "bytes");
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/js", (req, res) => {
    reqURL = req.url.replace("/js", "");
    res.sendFile(__dirname + reqURL);
});

app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

https.globalAgent.maxSockets = Infinity;

const options = {
    key: fs.readFileSync("./certs/localhost.key"),
    cert: fs.readFileSync("./certs/localhost.crt"),
};

https.createServer(options, app)
    .listen(env.SERVER_PORT, () => {
        console.log(`Server is listening on port ${env.SERVER_PORT}`);
    });