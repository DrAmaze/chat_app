class Chat {
  constructor(socket) {
    this.socket = socket;
    this.sendMessage = this.sendMessage.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
    this.processCommand = this.processCommand.bind(this);
  }

  sendMessage(room, msg) {
    this.socket.emit('message', { text: msg, room });
  }

  changeRoom(room) {
    this.socket.emit('join', { newRoom: room });
  }

  processCommand(command) {
    const words = command.split(' ');
    const parsedCmd = words[0].substring(1, words[0].length).toLowerCase();
    let msg = false;

    switch (parsedCmd) {
      case 'join':
        words.shift();
        const room = words.join(' ');
        this.changeRoom(room);
        break;
      case 'nick':
        words.shift();
        const name = words.join(' ');
        this.socket.emit('nameAttempt', name);
        break;
      default:
        msg = 'Unrecognized command.';
        break;
    }
    return msg;
  }
}

module.exports = Chat;
