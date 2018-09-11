import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Button from './button.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
var shortid = require('shortid');

export class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.createGroup = this.createGroup.bind(this);
    this.state = {
      groupName: '',
      members: [],
      memberUsernames: [],
      currentEmail: ''
    };
  }

  componentDidMount() {
    for (i = 0; i < 2; i++) {
      this.addTextInput();
    }
    var user = firebase.auth().currentUser;
    firebase
      .database()
      .ref('users/' + user.uid)
      .once('value')
      .then(snapshot => {
        this.setState({
          currentEmail: snapshot.val().username
        });
      });
  }

  addTextInput = () => {
    var temp = this.state.members;
    var key = this.state.members.length;
    temp.push(
      <TextInput
        key={key}
        placeholder={'group member ' + (this.state.members.length + 1)}
        style={styles.input}
        onChangeText={username => this.updateUsernameValues(key, username)}
      />
    );
    this.setState({
      members: temp
    });
  };

  updateUsernameValues = (index, username) => {
    var temp = this.state.memberUsernames;
    temp[index] = username;
    this.setState({
      memberUsernames: temp
    });
  };

  // creates the group in the database.
  createGroup = () => {
    var groupid = shortid.generate();
    var user = firebase.auth().currentUser;
    // set the group with the name
    firebase
      .database()
      .ref('groups/' + groupid)
      .set({
        groupName: this.state.groupName
      });
    // add group id to user
    firebase
      .database()
      .ref('users/' + user.uid + '/groups/')
      .set({
        [groupid]: true
      });
    firebase
      .database()
      .ref('groups/' + groupid + '/members/')
      .update({
        [this.state.currentEmail]: true
      });
    // add all other group members into the group, and adds the groupid to each user
    for (i = 0; i < this.state.memberUsernames.length; i++) {
      firebase
        .database()
        .ref('groups/' + groupid + '/members/')
        .update({
          [this.state.memberUsernames[i]]: true
        });
      firebase
        .database()
        .ref()
        .child('users')
        .orderByChild('username')
        .equalTo(this.state.memberUsernames[i])
        .on('value', function(snapshot) {
          var uid = Object.keys(snapshot.val())[0];
          firebase
            .database()
            .ref('users/' + uid + '/groups/')
            .set({
              [groupid]: true
            });
        });
    }
  };

  // renders the createGroup component
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={groupName => this.setState({ groupName })}
          value={this.state.groupName}
          placeholder="group name"
          style={styles.input}
        />
        {this.state.members.map((value, index) => {
          return value;
        })}
        <Button onPress={this.addTextInput} text="+" />
        <Button onPress={this.createGroup} text="Create Group" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 600
  },
  input: {
    marginTop: 0,
    padding: 30
  }
});

export default CreateGroup;
