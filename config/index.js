require('dotenv').config();
const bunyan = require('bunyan');
const serviceAccessToken = require('crypto').randomBytes(16).toString('hex').slice(0, 32);

const log = {
  development: () => {
    return bunyan.createLogger({name: 'HEPA-TIME-development', level: 'debug'});
  },
  production: () => {
    return bunyan.createLogger({name: 'HEPA-TIME-production', level: 'info'});
  },
  test: () => {
    return bunyan.createLogger({name: 'HEPA-TIME-test', level: 'fatal'});
  }
};

module.exports = {
  googleApiKey: process.env.GOOGLE_API_KEY,
  hepaApiToken: process.env.HEPA_API_TOKEN,
  serviceAccessToken: serviceAccessToken,
  log: (env) => {
    if(env) return log[env]();
    return log[process.env.NODE_ENV || 'development']();
  }
};