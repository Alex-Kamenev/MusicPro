'use strict';

function authenticatedUser(credential) {
  const user = credential && credential.user;
  if (!user || !user.uid) throw new Error('Authentication did not return a user.');
  return user;
}

async function registerAccount(firebase, fields, onReady) {
  const { name, email, password, confirmPassword, student } = fields;
  if (password !== confirmPassword) throw new Error('Make sure the passwords match!');

  // Use this operation's credential, never a possibly stale currentUser session.
  const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  const user = authenticatedUser(credential);
  const role = student ? 'student' : 'teacher';
  await firebase.database().ref(`users/${user.uid}/info`).set({
    email: user.email,
    uid: user.uid,
    name,
    userType: role,
  });
  // A rejected authentication/profile write exits before any dashboard navigation.
  onReady(role);
  return role;
}

async function loginAccount(firebase, fields, onReady) {
  const credential = await firebase.auth().signInWithEmailAndPassword(fields.email, fields.password);
  const user = authenticatedUser(credential);
  // A one-time read avoids accumulating listeners and repeated navigation.
  const snapshot = await firebase.database().ref(`users/${user.uid}/info/userType`).once('value');
  const role = snapshot.val();
  if (role !== 'student' && role !== 'teacher') {
    throw new Error('Your account profile is missing or has an unsupported role.');
  }
  onReady(role);
  return role;
}

module.exports = { registerAccount, loginAccount };
