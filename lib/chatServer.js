const io = require('socket.io');

let chat;
let guestNumber = 1;

const nickNames = {};
let namesUsed = [];
const currentRoom = {};

const chatServer = {
  listen(server) {
    chat = io(server);

    chat.on('connection', (socket) => {
      console.log('connected');
      // guestNumber = this.assignGuestName(
      //   socket, guestNumber, nickNames, namesUsed
      // );
      // this.joinRoom(socket, 'lobby');
      // this.handleMessageBroadcast(socket, nickNames);
      // this.handleNameChangeAttempts(socket, nickNames, namesUsed);
      // this.handleRoomJoining(socket);
      // socket.on('rooms', () => {
      //   let rooms = [];
  	  //   for (let s in chat.sockets.sockets) {
  	  //     rooms = rooms.concat(this.listRooms(chat.sockets.sockets[s]));
  	  //   }
  	  //   rooms = Array.from(new Set(rooms));
      //   socket.emit('rooms', rooms);
      // });

      // this.handleClientDisconnection(socket);
    });
  }
};

module.exports = chatServer;
