/* eslint-disable linebreak-style */
'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

module.exports = (config) => {
  const log = config.log();
 
  service.get('/service/:location', (req, res) => {
    
    if(req.get('X-HEPA-SERVICE-TOKEN') !== config.serviceAccessToken) {
      return res.sendStatus(403);
    }
    
    request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.location}&key=${config.googleApiKey}`, (err,response) => {
      if(err) {
        log.error(err);
        return res.sendStatus(500);
      }
      const location = response.body.results[0].geometry.location;
      const timestamp = +moment().format('X');
  
      request.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${timestamp}&key=${config.googleApiKey}`, (err,response) => {
        if (err) {
          log.error(err);
          return res.sendStatus(500);
        }
  
        const result = response.body;
        const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
  
        res.json({result: timeString});
      });
    });
      
  });

  return service;
};