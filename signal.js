function signal(socket) {
  console.log(`created new websocket ${socket.id}`);
  socket.emit('a message', {
    test: 'huh what',
  });

  socket.on('join', (rtcId) => {
    socket.join(rtcId, () => {
      console.log(`created room ${rtcId}`);
    });
  });
}

module.exports = signal;
