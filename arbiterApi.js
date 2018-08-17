const {
  db,
  persons: { ALPHA, ZETA },
  types: { ICE_CANDIDATE, ANSWER, OFFER, PUBLIC_KEY },
} = require('./db');

const updateArbiter = (socket) => (req, res) => {
  /**
   * client sends
   * @param rtcId = db value and io room
   * @param person = db value
   * @param type = db value
   * @param box = db value
   */
  const { rtcId, person, type, box } = req.body;
  // retrieve arbiter form db
  const arbiter = db.get(rtcId);

  // verify person
  const verifyPerson = person === ALPHA || person === ZETA;
  // verify type
  const verifyType =
    type === ICE_CANDIDATE ||
    type === ANSWER ||
    type === OFFER ||
    type === PUBLIC_KEY;
  // update db and send response
  if (arbiter && verifyPerson && verifyType) {
    arbiter[person][type] = box;
    // send arbiter ONLY to who is subscribed to the room
    socket.to(rtcId).emit('update', arbiter);
    res.json({
      msg: 'updated arbiter successfully',
      arbiter,
    });
  } else {
    res.json({
      msg: 'error',
      error: 'wrong person or type - cannot update arbiter',
    });
  }
  // console.log(`updated ${type} with ${box}`);
};

const retrieveArbiter = (req, res) => {
  const { rtcId } = req.body;
  const arbiter = db.get(rtcId);
  if (arbiter) {
    res.json({ msg: 'success', arbiter });
  } else {
    res.json({ msg: 'error', error: "arbiter doesn't exist" });
  }
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
  // console.log(dbEntries);
}

module.exports = { entries, updateArbiter, retrieveArbiter };
