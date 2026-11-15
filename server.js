'use strict';

// Retired learning-server stub. It intentionally has no database connection.
// Real account data belongs behind authenticated, authorized service endpoints.
const http = require('node:http');

function readPort(value) {
  if (value === undefined) return 3000;
  if (!/^\d+$/.test(value) || Number(value) < 0 || Number(value) > 65535) {
    throw new Error('PORT must be an integer from 0 to 65535.');
  }
  return Number(value);
}

function handleRequest(request, response) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  const pathname = request.url.split('?')[0];
  response.statusCode = pathname === '/user' ? 410 : 404;
  response.end(JSON.stringify({
    error: pathname === '/user'
      ? 'The unauthenticated sample user endpoint has been retired.'
      : 'Not found.',
  }));
}

function startServer(environment = process.env) {
  const port = readPort(environment.PORT);
  const server = http.createServer(handleRequest);
  // Keep this retired sample local; there is deliberately no HOST override.
  server.listen(port, '127.0.0.1');
  return server;
}

if (require.main === module) {
  try {
    const server = startServer();
    server.once('listening', () => console.log('Retired sample stub listening on loopback.'));
    server.once('error', () => {
      console.error('Could not start the local sample stub. Check PORT and whether it is in use.');
      process.exitCode = 1;
    });
  } catch (error) {
    console.error('Could not start the local sample stub. PORT must be an integer from 0 to 65535.');
    process.exitCode = 1;
  }
}

module.exports = { handleRequest, readPort, startServer };
