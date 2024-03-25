Audio.prototype.play = (function (play) {
  return function () {
    var audio = this,
      args = arguments,
      promise = play.apply(audio, args);
    if (promise !== undefined) {
      promise.catch((_) => {
        console.log('autoplay denied');
      });
    }
  };
})(Audio.prototype.play);

// const socket = io(`https://poc-server-socketio.on-dev.info`, {
//   socket: true,
// });
const socket = io(`http://localhost:3000`);

function showSocketData(msg) {
  let notif = document.getElementById(msg.sound_id);
  notif.play();

  let li = document.createElement('li');
  let id = document.createElement('span');
  id.innerText = `${msg.id} - ${msg.sound_id}`;

  let date = document.createElement('span');
  date.innerText = msg.date;

  li.appendChild(id);
  li.appendChild(date);

  document.getElementById('content').appendChild(li);
}

// elements
let btnClear = document.getElementById('clear');
let btnLogin = document.getElementById('login');
let username = document.querySelector('input[name="username"]');
let inputwrapper = document.querySelector('.input-wrapper');
let app = document.getElementById('app');

let usernameLs = localStorage.getItem('username');

function connectWs(username) {
  inputwrapper?.classList.add('hidden');

  app?.classList.remove('hidden');

  socket.on(`message:${username}`, async (msg) =>
    showSocketData(msg)
  );
}

if (usernameLs) {
  connectWs(usernameLs);
}

btnClear.addEventListener('click', function () {
  let content = document.getElementById('content');
  content.innerHTML = '';
});

btnLogin.addEventListener('click', function () {
  if (!username.value) return;
  localStorage.setItem('username', username);

  connectWs(username);
});
