const assert = require('node:assert/strict');
const test = require('node:test');
const { registerAccount, loginAccount } = require('../lib/auth');

const fields = {
  name: 'Test student', email: 'test@example.invalid',
  password: 'test-only-password', confirmPassword: 'test-only-password', student: true,
};

function deferred() {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
}

function fixture({ authFailure, writeFailure, readFailure, role = 'student',
  user = { uid: 'new-user', email: fields.email }, write, started } = {}) {
  const calls = [];
  const ready = [];
  const authenticate = async (email, password) => {
    calls.push(['authenticate', email, password]);
    if (authFailure) throw authFailure;
    return { user };
  };
  const firebase = {
    auth: () => ({
      createUserWithEmailAndPassword: authenticate,
      signInWithEmailAndPassword: authenticate,
      get currentUser() { throw new Error('A stale session must not be used.'); },
    }),
    database: () => {
      calls.push(['database']);
      return {
        ref: path => ({
          set: async profile => {
            calls.push(['set', path, profile]);
            if (started) started.resolve();
            if (writeFailure) throw writeFailure;
            if (write) await write.promise;
          },
          once: async event => {
            calls.push(['once', path, event]);
            if (readFailure) throw readFailure;
            return { val: () => role };
          },
        }),
      };
    },
  };
  return { firebase, calls, ready, onReady: value => ready.push(value) };
}

test('a failed sign-up never reads/writes the database or opens a dashboard', async () => {
  const failure = new Error('Authentication rejected');
  const f = fixture({ authFailure: failure });
  await assert.rejects(registerAccount(f.firebase, fields, f.onReady), error => error === failure);
  assert.deepEqual(f.calls.map(call => call[0]), ['authenticate']);
  assert.deepEqual(f.ready, []);
});

test('mismatched passwords stop before any authentication call', async () => {
  const f = fixture();
  await assert.rejects(registerAccount(f.firebase, { ...fields, confirmPassword: 'different' }, f.onReady), /passwords match/);
  assert.deepEqual(f.calls, []);
  assert.deepEqual(f.ready, []);
});

test('sign-up waits for the profile write and uses only the returned credential', async () => {
  for (const student of [true, false]) {
    const write = deferred();
    const started = deferred();
    const f = fixture({ write, started });
    const pending = registerAccount(f.firebase, { ...fields, student }, f.onReady);
    await started.promise;
    assert.deepEqual(f.ready, [], 'navigation must wait for the database write');
    const role = student ? 'student' : 'teacher';
    assert.deepEqual(f.calls.find(call => call[0] === 'set'), ['set', 'users/new-user/info', {
      email: fields.email, uid: 'new-user', name: fields.name, userType: role,
    }]);
    write.resolve();
    assert.equal(await pending, role);
    assert.deepEqual(f.ready, [role]);
  }
});

test('a rejected profile write never opens a dashboard', async () => {
  const failure = new Error('Profile permission denied');
  const f = fixture({ writeFailure: failure });
  await assert.rejects(registerAccount(f.firebase, fields, f.onReady), error => error === failure);
  assert.deepEqual(f.ready, []);
});

test('a failed login never reads a profile or opens a dashboard', async () => {
  const failure = new Error('Invalid credentials');
  const f = fixture({ authFailure: failure });
  await assert.rejects(loginAccount(f.firebase, fields, f.onReady), error => error === failure);
  assert.deepEqual(f.calls.map(call => call[0]), ['authenticate']);
  assert.deepEqual(f.ready, []);
});

test('successful login reads the role once and selects the corresponding dashboard', async () => {
  for (const role of ['student', 'teacher']) {
    const f = fixture({ role });
    assert.equal(await loginAccount(f.firebase, fields, f.onReady), role);
    assert.deepEqual(f.calls.filter(call => call[0] === 'once'), [
      ['once', 'users/new-user/info/userType', 'value'],
    ]);
    assert.deepEqual(f.ready, [role]);
  }
});

test('profile errors and unsupported/missing roles never open a teacher dashboard', async () => {
  const failure = new Error('Profile permission denied');
  const f = fixture({ readFailure: failure });
  await assert.rejects(loginAccount(f.firebase, fields, f.onReady), error => error === failure);
  assert.deepEqual(f.ready, []);
  for (const role of [null, '', 'admin']) {
    const invalid = fixture({ role });
    await assert.rejects(loginAccount(invalid.firebase, fields, invalid.onReady), /profile/);
    assert.deepEqual(invalid.ready, []);
  }
});

test('missing authentication credentials never fall back to a previous session', async () => {
  for (const workflow of [registerAccount, loginAccount]) {
    const f = fixture({ user: null });
    await assert.rejects(workflow(f.firebase, fields, f.onReady), /return a user/);
    assert.deepEqual(f.calls.map(call => call[0]), ['authenticate']);
    assert.deepEqual(f.ready, []);
  }
});
