import * as firebase from 'firebase';

export function getUserFromDb(key, value) {
  var result = 'not working';
  return firebase
    .database()
    .ref()
    .child('users')
    .orderByChild(key)
    .equalTo(value)
    .once('value')
    .then(function(snapshot) {
      return snapshot;
    });
}
