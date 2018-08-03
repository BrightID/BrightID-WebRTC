const {
  db,
  persons: { ALPHA, ZETA },
  types: { ICE_CANDIDATE, ANSWER, OFFER },
} = require('./db');

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

function update(req, res) {
  const { rtcId, person, type, value } = req.body;

  const dispatcher = db.get(rtcId);

  const verifyPerson = person === ALPHA || person === ZETA;

  const verifyType =
    type === ICE_CANDIDATE || type === ANSWER || type === OFFER;

  if (verifyPerson && verifyType) {
    dispatcher[person][type] = value;
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

  console.log(dispatcher);
}

function retrieveDispatcher(req, res) {
  const { rtcId } = req.body;
  const dispatcher = db.get(rtcId);
  if (dispatcher) {
    res.json({ msg: 'success', dispatcher });
  } else {
    res.json({ msg: 'error', error: "dispatcher doesn't exist" });
  }
}

module.exports = { entries, update, retrieveDispatcher };
