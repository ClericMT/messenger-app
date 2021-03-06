const express = require('express');
const socketIO = require('socket.io');

const app = require('express')();
const http = require('http').createServer(app);

port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log('listening on *:3000');
});

const io = socketIO(http);

const bodyParser = require('body-parser');
const { json } = require('body-parser');

app.use(express.static("public"));
app.set('view engine', 'ejs') //sets EJS as template engine
app.use(bodyParser.urlencoded({ extended: true }))  // Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.json()) //So server can read JSON
app.use(express.static('public')) //This allows server to serve files in public folder

app.get('/', (req, res) => { //When the main page loads, the esj file will render
    res.render('index.ejs')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

io.on('connection', (socket) => {
  socket.on('new username', (msg) => {
    io.emit('new username', msg);
  });
});



