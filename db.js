const nanoid = require('nanoid');

const db = new Map();

const uid = () => nanoid();

const schema = () => ({
  ALPHA: {
    PUBLIC_KEY: '',
    ICE_CANDIDATE: [],
    OFFER: '',
  },
  ZETA: {
    PUBLIC_KEY: '',
    ICE_CANDIDATE: [],
    ANSWER: '',
  },
});

const ALPHA = 'ALPHA';
const ZETA = 'ZETA';
const ICE_CANDIDATE = 'ICE_CANDIDATE';
const OFFER = 'OFFER';
const ANSWER = 'ANSWER';

const persons = {
  ALPHA,
  ZETA,
};

const types = {
  ICE_CANDIDATE,
  OFFER,
  ANSWER,
};

module.exports = {
  db,
  uid,
  schema,
  persons,
  types,
};
