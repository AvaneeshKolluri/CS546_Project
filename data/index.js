const userData = require('./users');
const pointsData = require('./points');
const locationData = require('./location')
const validateData = require('./validate');

module.exports = {
  users: userData,
  points: pointsData,
  location: locationData,
  validate: validateData
};