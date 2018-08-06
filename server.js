const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');
const createId = require('./createId');
const { entries, update, retrieveDispatcher } = require('./dispatcher');
const signal = require('./signal');

const PORT = 3001;

const socket = io.of('/signal').on('connection', signal);

app.use(bodyParser.json());
app.use(cors());

app.get('/id', createId);

app.get('/entries', entries);

app.post('/update', update(socket));

app.post('/dispatcher', retrieveDispatcher(socket));

server.listen(PORT, () => {
  console.log(`WebRTC signaling server listening on port ${PORT}!`);
});
