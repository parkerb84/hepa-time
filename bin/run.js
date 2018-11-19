/* eslint-disable linebreak-style */
'use strict';
const config = require('../config');
const log = config.log();
const request = require('superagent');
const service = require('../server/service')(config);
const http = require('http');

const server = http.createServer(service);
server.listen();

server.on('listening', function() {
  log.info(`Hepa-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

  const announce = () => {
    request.put(`http://localhost:3000/service/time/${server.address().port}`, (err) => {
      if(err) {
        log.debug(err);
        log.info('Error in connecting to Hepa');
        return;
      }
    });
  };

  announce();
  setInterval(announce, 15*1000);
});