const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');
const createId = require('./createId');
const { updateArbiter, retrieveArbiter } = require('./arbiterApi');
const uploadFile = require('./uploadFile');
const signal = require('./signal');

const PORT = 3001;

const socket = io.of('/signal').on('connection', signal);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use('/images', express.static('images'));

app.get('/id', createId);

app.post('/update', updateArbiter(socket));

app.post('/dispatcher', retrieveArbiter);

app.post('/avatar', uploadFile(socket));

server.listen(PORT, () => {
  console.log(`WebRTC signaling server started!`);
});
