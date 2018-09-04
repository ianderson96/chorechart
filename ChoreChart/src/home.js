import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import SignUp from './signup.js';


class Home extends React.Component {
  constructor(props) {
    super(props);
  var user = firebase.auth().currentUser;  
    this.state = {
      text: 'What is your name?',
      id:1,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
  }


  render() {
    return (
      <View style={styles.container}>
      <Text>{this.state.email}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor:"#8203fd",
    marginTop:10,
    padding:30
  }
});

export default Home;
