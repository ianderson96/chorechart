import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Button from './button.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    var createUser = this.createUser.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userCreatedId: '',
    };
  }

  createUser() {
    if (!this.state.firstName) {
      throw "Please enter your first name.";
    }
    if (!this.state.lastName) {
      throw "Please enter your last name.";
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function (user) {
        var theId = user.user.uid;
        console.log(theId)
        this.setState({
          userCreatedId: theId
        });
        console.log("user id: " + this.state.userCreatedId);
        firebase.database().ref('users/' + this.state.userCreatedId).set({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        });
      }.bind(this))
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error message is " + errorMessage);
      });
  }


  submitCreateUserForm() {
    var userCreated = true;
    try {
      this.createUser();
    }
    catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error message is " + errorMessage);
      userCreated = false;
    }
    if (userCreated === true) { Actions.push('launch'); };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={(firstName) => this.setState({ firstName })}
          value={this.state.firstName} placeholder='first name' style={styles.input} />
        <TextInput onChangeText={(lastName) => this.setState({ lastName })}
          value={this.state.lastName} placeholder='last name' style={styles.input} />
        <TextInput onChangeText={(email) => this.setState({ email })}
          value={this.state.email} placeholder='email' style={styles.input} />
        <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({ password })}
          value={this.state.password} placeholder='password' style={styles.input} />
        <Button onPress={this.submitCreateUserForm.bind(this)} text="Sign Up" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
  },
  input: {
    marginTop: 10,
    padding: 30
  }
});

export default SignUp;


