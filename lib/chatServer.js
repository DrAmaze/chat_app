const io = require('socket.io');

let chat;
let guestNumber = 1;

const nickNames = {};
let namesUsed = [];
const currentRoom = {};

const chatServer = {
  handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('nameAttempt', (name) => {
      if (name.toLowerCase().startsWith('guest')) {
        socket.emit('nameResult', {
          success: false,
          message: 'Names cannot begin with "Guest"'
        });
      } else {
        if (!namesUsed.includes(name)) {
          const prevName = nickNames[socket.id];
          const prevNameIdx = namesUsed.indexOf(prevName);
          nickNames[socket.id] = name;
          namesUsed = [
            ...namesUsed.slice(0, prevNameIdx),
            ...namesUsed.slice(prevNameIdx + 1),
            name
          ];
          socket.emit('nameResult', {
            success: true,
            name
          });
          socket.broadcast.to(currentRoom[socket.id]).emit('message', {
            text: `${prevName} is now known as ${name}.`
          });
        } else {
          socket.emit('nameResult', {
            success: false,
            message: 'That name is already in use.'
          });
        }
      }
    });
  },
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
