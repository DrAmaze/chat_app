document.addEventListener('DOMContentLoaded', () => {
  const socket = require('socket.io-client')();
  const myChat = require('./chatUI');

  console.log('here', socket);

  setInterval(() => {
    socket.emit('rooms');
  }, 1000);

  // myChat.input.focus();
});
