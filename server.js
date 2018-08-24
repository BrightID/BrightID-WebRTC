const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');
const createId = require('./createId');
const {
  updateArbiter,
  retrieveArbiter,
  exchangeAvatar,
} = require('./arbiterApi');
const signal = require('./signal');

const PORT = 3001;

const socket = io.of('/signal').on('connection', signal);

app.use(bodyParser.json());
app.use(cors());

app.get('/id', createId);

app.post('/update', updateArbiter(socket));

app.post('/dispatcher', retrieveArbiter);

app.post('/avatar', exchangeAvatar(socket));

server.listen(PORT, () => {
  console.log(`WebRTC signaling server started!`);
});
