const Chat = require('./chat');

class ChatUI {
  constructor(socket) {
    this.chat = new Chat(socket);
    this.form = document.querySelector('form');
    this.msgList = document.querySelector('ul#msg-list');
    this.roomList = document.querySelector('ul#room-list');
    this.input = document.querySelector('input');
    this.room = document.querySelector('#room');
    this.submitHandler();
  }

  getInput() {
    return this.input.value;
  }

  setRoom(room) {
    this.room.textContent = room;
  }

  sendMsg(room) {
    this.chat.sendMessage(room, this.getInput());
  }

  addMsg(msg) {
    const newMessage = document.createElement('li');
    newMessage.textContent = msg;
    this.msgList.appendChild(newMessage);
  }

  addRoom(room) {
    const newRoom = document.createElement('li');
    newRoom.textContent = room;
    this.roomList.appendChild(newRoom);
  }

  processUserInput() {
    const msg = this.getInput();
    let response;
    if (msg[0] === '/') {
      response = this.chat.processCommand(msg);
      if (response) {
        this.addMsg(response);
      }
    } else {
      this.sendMsg(this.room.textContent);
      this.addMsg(msg);
    }
  }

  submitHandler() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.processUserInput();
      this.input.value = '';
    });
  }
}

module.exports = ChatUI;
