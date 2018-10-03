import * as firebase from 'firebase';

export function getUserFromDb(key, value) {
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

export function getChoresFromGroupId(groupId) {
  return firebase
    .database()
    .ref('chores')
    .orderByKey()
    .equalTo(groupId)
    .once('value')
    .then(function(snapshot) {
      return snapshot;
    });
}

export function addChoreToGroup(
  groupid,
  description,
  completedFrequency,
  assignedFrequency
) {
  var ref = firebase.database().ref('chores/' + groupid);
  ref.push({
    description: description,
    completedFrequency: completedFrequency,
    assignedFrequency: assignedFrequency,
    completed: false,
    active: true
  });
}

export function addDefaultChores(groupid) {
  var chorelist = [
    'Sweep the kitchen',
    'Clean the fridge',
    'Clean the freezer',
    'Wipe down kitchen counters and cabinets',
    'Dust the kitchen',
    'Vacuum high-traffic areas',
    'Tidy the main living space',
    'Scrub the bathroom counter',
    'Scrub the sink',
    'Scrub the toilet seat and toilet bowl',
    'Clean the shower'
  ];
  for (i = 0; i < chorelist.length; i++) {
    addChoreToGroup(groupid, chorelist[i], 'weekly', 'weekly');
  }
}
