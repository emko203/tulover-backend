const express = require ('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const dotenv = require('dotenv');

//init app
const app = express();

//Bodyparse middleware
app.use(express.json());

//Load env vars
//dotenv.config({path: "./config.env"});

//const io = socketio(server).sockets;

//DB config
//const db = config.get('mongoURI');

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});