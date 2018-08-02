const { db } = require('./db');

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
  const { id, iceCandidtate, offer, answer } = req.body;

  const dispatcher = db.get(id);

  if (!dispatcher) {
    res.json({
      msg: 'no matching id',
      error: 'no matching id',
    });
  } else {
    res.json({
      msg: '${}',
    });
  }

  console.log(dbEntries);
}

module.exports = { entries };
