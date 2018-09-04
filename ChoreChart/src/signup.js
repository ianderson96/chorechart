import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    var createUser = this.createUser.bind(this);
    this.state = {
      username: '',
      email: '',
      password: '',
      id:1
    };
  }

  createUser() {
    var theEmail = this.state.email;
    var thePw = this.state.password;
    var userCreated = true;
    console.log("Email Address is: " + this.state.email);
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then (function(){
    console.log("Out of catch block, boolean is: " + userCreated);
    if (userCreated === true) 
    {Actions.push('home');};
    })
    .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error message is " + errorMessage);
    userCreated = false;
    console.log("In catch block, boolean is: " + userCreated);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={(username) => this.setState({username})}
        value={this.state.username} placeholder='username' style={styles.input} />
        <TextInput onChangeText={(email) => this.setState({email})}
        value={this.state.email} placeholder='email' style={styles.input} />
        <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})}
        value={this.state.password} placeholder='password' style={styles.input}/>
        <TouchableOpacity onPress={this.createUser.bind(this)} style={styles.button}><Text style={{color:'black'}}>Click here</Text></TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:600,
  },
  button: {
    backgroundColor:"#8203fd",
    marginTop:10,
    padding:30
  },
  input: {
    marginTop: 10,
    padding:30
  }
});

export default SignUp;


