/******************************************************************************
 *
 *    Copyright (c) 2016.  Haixing Hu.
 *
 *    Released under the MIT license.
 *
 ******************************************************************************/

`use strict`;

const program = require('commander')
const express = require('express');
const request = require('request');

program
  .version('0.1.0')
  .usage('<listening-port> <remote-server> <remote-port>')
  .parse(process.argv)

program.parse(process.argv)

if (program.args.length !== 3) {
  program.help()
}

const port = parseInt(program.args[0])
const remoteHost = program.args[1]
const remotePort = parseInt(program.args[2])
const remoteProtocol = 'http'
const remoteServer = remoteProtocol + '://' + remoteHost + ':' + remotePort

if (isNaN(port) || isNaN(remotePort)) {
  program.help()
}

console.log('Redirects HTTP requests to http://localhost:' + port + ' to ' + remoteServer)

const app = express();

app.use('/', function(req, res) {
  var url = remoteServer + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(port);