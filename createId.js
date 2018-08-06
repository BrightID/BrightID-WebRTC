const { uid, db, schema } = require('./db');

function createId(req, res) {
  const id = uid();
  db.set(id, schema);
  res.json({
    msg: 'successfully created rtc id',
    rtcId: id,
    dispatcher: schema,
  });
  console.log(id);
}

module.exports = createId;
