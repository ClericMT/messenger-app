
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM4', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));


let ax;
let ay;
let az;
let A1;

// Read the port data
port.on("open", () => {
  console.log('serial port open');
});
parser.on('data', data =>{
    accel = data.split(' ');
    ax = accel[0];
    ay = accel[1];
    az = accel[2];
    A1 = accel[3];
    accel = [ax, ay, az, A1]

    io.sockets.emit('accel', (accel));
});


const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
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

http.listen(3000, () => {
  console.log('listening on *:3000');
});

