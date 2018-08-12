const {
  db,
  persons: { ALPHA, ZETA },
  types: { ICE_CANDIDATE, ANSWER, OFFER },
} = require('./db');

const update = (socket) => (req, res) => {
  /**
   * client sends
   * @param rtcId = db value and io room
   * @param person = db value
   * @param type = db value
   * @param value = db value
   */
  const { rtcId, person, type, value } = req.body;
  // retrieve dispatcher form db
  const dispatcher = db.get(rtcId);

  // verify person
  const verifyPerson = person === ALPHA || person === ZETA;
  // verify type
  const verifyType =
    type === ICE_CANDIDATE || type === ANSWER || type === OFFER;
  // update db and send response
  if (dispatcher && verifyPerson && verifyType) {
    dispatcher[person][type] = value;
    // send dispatcher ONLY to who is subscribed to the room
    socket.to(rtcId).emit('update', dispatcher);
    res.json({
      msg: 'updated dispatcher successfully',
      dispatcher,
    });
  } else {
    res.json({
      msg: 'error',
      error: 'wrong person or type - cannot update dispatcher',
    });
  }
};

const retrieveDispatcher = (socket) => (req, res) => {
  const { rtcId } = req.body;
  const dispatcher = db.get(rtcId);
  if (dispatcher) {
    res.json({ msg: 'success', dispatcher });
  } else {
    res.json({ msg: 'error', error: "dispatcher doesn't exist" });
  }
  console.log(`fetching ${rtcId}`);
};

function entries(req, res) {
  const dbEntries = [];
  for (let i of db.keys()) {
    dbEntries.push(i);
  }
  res.json({
    entries: dbEntries,
    db: db,
  });
  console.log(dbEntries);
}

module.exports = { entries, update, retrieveDispatcher };
