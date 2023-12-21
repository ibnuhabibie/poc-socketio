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

const socket = io(`http://${window.location.host}:3030`);
// const socket = io(`http://localhost:3030`);

socket.on('message', async (msg) => {
  let notif = document.getElementById(msg.sound_id);
  notif.play();
  // let permission = await Notification.requestPermission();
  // if (permission == 'granted') {
  // const greeting = new Notification('Hi, How are you?');
  // greeting.onclick = () => window.open('http://localhost:3000/');
  // }
  // console.log(permission);

  let li = document.createElement('li');
  let id = document.createElement('span');
  id.innerText = `${msg.id} - ${msg.sound_id}`;

  let date = document.createElement('span');
  date.innerText = msg.date;

  li.appendChild(id);
  li.appendChild(date);

  document.getElementById('content').appendChild(li);
});

let btnClear = document.querySelector('button');
btnClear.addEventListener('click', function () {
  let content = document.getElementById('content');
  content.innerHTML = '';
});
