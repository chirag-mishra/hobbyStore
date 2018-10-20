const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.port || 5000;

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req,res)=> {
    console.log("enterred route");
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

const server = http.createServer(app);

server.listen(port, ()=> console.log("running"));