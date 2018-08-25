const {
  db,
  persons: { USERA, USERB },
  types: { ICE_CANDIDATE, ANSWER, OFFER },
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
  const verifyPerson = person === USERA || person === USERB;
  // verify type

  const answerOffer = type === ANSWER || type === OFFER;
  // update db and send response
  if (arbiter && verifyPerson && answerOffer) {
    arbiter[person][type] = box;
    // send arbiter ONLY to who is subscribed to the room
    socket.to(rtcId).emit('update', arbiter);
    res.json({
      msg: 'updated arbiter successfully',
      arbiter,
    });
  } else if (arbiter && verifyPerson && type === ICE_CANDIDATE) {
    // append ice candidates to array and notify users of new-ice-candidate
    arbiter[person][type].push(box);
    socket.to(rtcId).emit('new-ice-candidate', { candidate: box, person });
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

const exchangeAvatar = (socket) => (req, res) => {
  const { rtcId, avatar, person } = req.body;
  console.log(`avatar: ${avatar}`);
  socket.to(rtcId).emit('avatar', { person, avatar });
  res.json({
    msg: 'avatar recieved',
  });
  console.log(`avatar: ${avatar}`);
};

module.exports = { updateArbiter, retrieveArbiter, exchangeAvatar };
