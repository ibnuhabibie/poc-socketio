const express = require('express');
const { join } = require('node:path');
const socketio = require('socket.io');
const cors = require('cors');

require('dotenv').config();

const PORT = process.argv.includes('--port')
  ? process.argv[process.argv.indexOf('--port') + 1]
  : 3000;

const app = express();
app.use(cors());

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

  // socket.on('join', ({ username }) => {
  //   console.log(`${username} has joined.`);
  // });

  setInterval(() => {
    io.sockets.emit('message:frontoffice', {
      date: new Date(),
      id:
        'frontoffice ' +
        (Math.random() + 1).toString(36).substring(7),
      sound_id: `sound${Math.floor(Math.random() * 5) + 1}`,
    });

    io.sockets.emit('message:poc', {
      date: new Date(),
      id: 'poc ' + (Math.random() + 1).toString(36).substring(7),
      sound_id: `sound${Math.floor(Math.random() * 5) + 1}`,
    });

    io.sockets.emit('message:nurse', {
      date: new Date(),
      id: 'nurse ' + (Math.random() + 1).toString(36).substring(7),
      sound_id: `sound${Math.floor(Math.random() * 5) + 1}`,
    });
  }, 5000);
});
