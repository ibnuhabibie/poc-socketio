const express = require('express');
const { join } = require('node:path');
const socketio = require('socket.io');
//const http = require('http');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

//const server = http.Server(app);

const { PORT, SOCKET_PORT } = process.env;

/*
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

setInterval(() => {
  io.send({
    date: new Date(),
    id: (Math.random() + 1).toString(36).substring(7),
    sound_id: `sound${Math.floor(Math.random() * 5) + 1}`,
  });
}, 5000);
*/

app.get('/', (req, res) => {
  return res.json({ message: 'ok' });
});

const server = app.listen(PORT, () => {
  console.log(
    `Example app listening on port http://localhost:${PORT}`
  );
});

const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

setInterval(() => {
  io.send({
    date: new Date(),
    id: (Math.random() + 1).toString(36).substring(7),
    sound_id: `sound${Math.floor(Math.random() * 5) + 1}`,
  });
}, 5000);
