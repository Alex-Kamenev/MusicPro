const assert = require('node:assert/strict');
const test = require('node:test');
const { once } = require('node:events');
const http = require('node:http');
const { spawnSync } = require('node:child_process');
const { readPort, startServer } = require('../server');

function request(port, path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path, method }, response => {
      let text = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { text += chunk; });
      response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: JSON.parse(text) }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('the retired backend binds only to loopback and never returns user records', async t => {
  const server = startServer({ PORT: '0', HOST: '0.0.0.0' });
  t.after(() => new Promise(resolve => server.close(resolve)));
  await once(server, 'listening');
  assert.equal(server.address().address, '127.0.0.1');
  for (const method of ['GET', 'POST']) {
    const result = await request(server.address().port, '/user?all=1', method);
    assert.equal(result.status, 410);
    assert.deepEqual(result.body, { error: 'The unauthenticated sample user endpoint has been retired.' });
    assert.equal(result.headers['cache-control'], 'no-store');
    assert.equal(result.headers['x-content-type-options'], 'nosniff');
  }
  const missing = await request(server.address().port, '/anything-else');
  assert.equal(missing.status, 404);
  assert.deepEqual(missing.body, { error: 'Not found.' });
});

test('invalid port configuration fails before a server starts', () => {
  assert.equal(readPort(undefined), 3000);
  assert.equal(readPort('0'), 0);
  assert.equal(readPort('8765'), 8765);
  for (const value of ['', '-1', '1.5', '65536', 'not-a-port', '3000;anything']) {
    assert.throws(() => startServer({ PORT: value }), /PORT/);
  }
});

test('importing the server has no database or listener side effects', () => {
  const result = spawnSync(process.execPath, ['-e', "require('./server.js')"], {
    cwd: require('node:path').join(__dirname, '..'), timeout: 3000, encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr || String(result.error));
  assert.equal(result.stdout, '');
});

test('CLI configuration failure exits without printing environment secrets', () => {
  const result = spawnSync(process.execPath, ['server.js'], {
    cwd: require('node:path').join(__dirname, '..'), timeout: 3000, encoding: 'utf8',
    env: { ...process.env, PORT: 'private-invalid-value', DB_PASSWORD: 'private-secret' },
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /PORT/);
  assert.doesNotMatch(result.stderr, /private-invalid-value|private-secret/);
});
