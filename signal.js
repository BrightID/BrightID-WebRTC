function signal(socket) {
  console.log(`created new websocket ${socket.id}`);
  socket.emit('a message', {
    what: 'huh',
  });

  socket.on('join', (rtcId) => {
    socket.join(rtcId, () => {
      console.log(`created room ${rtcId}`);
    });
  });
}

module.exports = signal;
