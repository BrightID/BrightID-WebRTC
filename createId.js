const { uid, db, schema } = require('./db');

function createId(req, res) {
  const id = uid();
  db.set(id, Object.assign({}, schema()));
  res.json({
    msg: 'successfully created rtc id',
    rtcId: id,
    arbiter: db.get(id),
  });
  console.log(`successfully created rtc id ${id}`);
}

module.exports = createId;
