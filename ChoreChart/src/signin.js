import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      id:1
    };
  }

  signInUser() {
    var theEmail = this.state.email;
    var thePw = this.state.password;
    var signedIn = true;
    console.log("Email Address is: " + this.state.email);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then (function(){
    if (signedIn === true) 
    {Actions.push('home');};
    })
    .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    signedIn = false;
    });
  }

  goToSignUp() {
    Actions.push('signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={(email) => this.setState({email})}
        value={this.state.email} placeholder="email" style={styles.input} />
        <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})}
        value={this.state.password} placeholder="password" style={styles.input}/>
        <TouchableOpacity onPress={this.signInUser.bind(this)} style={styles.button}><Text style={{color:'black'}}>Sign In</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.goToSignUp.bind(this)} style={styles.button}><Text style={{color:'black'}}>Sign Up</Text></TouchableOpacity>
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

export default SignIn;


