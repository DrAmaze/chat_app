class Chat {
  constructor(socket) {
    this.socket = socket;
    this.sendMessage = this.sendMessage.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
  }

  sendMessage(room, msg) {
    this.socket.emit('message', { text: msg, room });
  }

  changeRoom(room) {
    this.socket.emit('join', { newRoom: room });
  }
}

module.exports = Chat;
