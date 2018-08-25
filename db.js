const nanoid = require('nanoid');

const db = new Map();

const uid = () => nanoid();

const schema = () => ({
  USERA: {
    PUBLIC_KEY: '',
    ICE_CANDIDATE: [],
    OFFER: '',
  },
  USERB: {
    PUBLIC_KEY: '',
    ICE_CANDIDATE: [],
    ANSWER: '',
  },
});

const USERA = 'USERA';
const USERB = 'USERB';
const ICE_CANDIDATE = 'ICE_CANDIDATE';
const OFFER = 'OFFER';
const ANSWER = 'ANSWER';

const persons = {
  USERA,
  USERB,
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
