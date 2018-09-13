import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import Button from './button.js';
import { Actions } from 'react-native-router-flux';
import { getUserFromDb } from './dbUtils.js';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      id: 1
    };
  }

  hasGroup = user => {
    firebase
      .database()
      .ref('users/' + user.uid)
      .on('value', function(snapshot) {
        if (snapshot.val().groups) {
          return true;
        } else {
          return false;
        }
      });
  };

  signInUser(hasGroup) {
    var signedIn = true;
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function() {
        if (signedIn === true) {
          if (hasGroup) {
            Actions.push('home');
          } else {
            Actions.push('launch');
          }
        }
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        signedIn = false;
      });
  }

  startSignInUser = () => {
    var user;
    getUserFromDb('email', this.state.email).then(result => {
      user = result;
      var val = user.val();
      if (user.child(Object.keys(val)[0]).hasChild('groups')) {
        this.signInUser(true);
      } else {
        this.signInUser(false);
      }
    });
  };

  goToSignUp() {
    Actions.push('signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="email"
          style={styles.input}
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder="password"
          style={styles.input}
        />
        <Button
          style={styles.padBottom}
          onPress={this.startSignInUser.bind(this)}
          text="Sign In"
        />
        <Button onPress={this.goToSignUp.bind(this)} text="Sign Up" />
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
    marginTop: 10,
    padding: 30
  }
});

export default SignIn;
