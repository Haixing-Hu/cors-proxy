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
  .usage('<listening-port> <source-host> <source-port> <destination-host> <destination-port>')
  .parse(process.argv)

program.parse(process.argv)

if (program.args.length !== 5) {
  program.help()
}

const port = parseInt(program.args[0])
const srcHost = program.args[1]
const srcPort = parseInt(program.args[2])
const destHost = program.args[3]
const destPort = parseInt(program.args[4])
const srcProtocol = 'http'
const destProtocol = 'http'
const srcServer = srcProtocol + '://' + srcHost + ':' + srcPort
const destServer = destProtocol + '://' + destHost + ':' + destPort

if (isNaN(port) || isNaN(srcPort) || isNaN(destPort)) {
  program.help()
}

console.log('Proxy all HTTP requests from ' + srcServer + ' to ' + destServer)

const app = express()

app.use('/', function(req, res) {
  var url = destServer + req.url
  console.log(req.method + ' ' + req.url + ' => '+ req.method + ' ' + url)
  try {
    req.pipe(request(url)).on('response', function (res) {
      // add the Access-Control-Allow-Origin header to support CORS
      res.headers['access-control-allow-origin'] = srcServer
      res.headers['access-control-allow-credentials'] = true
      res.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, HEAD'
      res.headers['access-control-allow-headers'] = 'Content-Type, *'
    }).pipe(res)
  } catch (e) {
    console.log('ERROR: ' + e)
  }
})

app.listen(port);