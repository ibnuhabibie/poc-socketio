const express = require('express');
const { join } = require('node:path');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
app.use(express.static('public'));

const { PORT, SOCKET_PORT } = process.env;

const io = new Server(SOCKET_PORT, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  setInterval(() => {
    io.emit('message', {
      date: new Date(),
      id: (Math.random() + 1).toString(36).substring(7),
    });
  }, 10000);
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(
    `Example app listening on port http://localhost:${PORT}`
  );
});
