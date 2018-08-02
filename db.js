const nanoid = require('nanoid');

const db = new Map();

const uid = () => nanoid();

const schema = {
  alpha: {
    iceCandidate: '',
    offer: '',
  },
  zeta: {
    iceCandidate: '',
    answer: '',
  },
};

module.exports = {
  db,
  uid,
  schema,
};
