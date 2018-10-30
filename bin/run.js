'use strict';

require('dotenv').config();
const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
server.listen();

server.on('listening', function() {
    console.log(`Hepa-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://localhost:3000/service/time/${server.address().port}`, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error in connecting to Hepa");
                return;
            }
        });
    };

    announce();
    setInterval(announce, 15*1000);
});