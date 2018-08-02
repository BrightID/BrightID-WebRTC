const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const createId = require('./createId');
const { entries, update } = require('./dispatcher');

const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/id', createId);

app.get('/entries', entries);

app.get('/update', update);

app.listen(PORT, () =>
  console.log(`WebRTC signaling server listening on port ${PORT}!`),
);
