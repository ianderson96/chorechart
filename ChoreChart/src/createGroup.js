import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Button from './button.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export class CreateGroup extends React.Component {
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

  submitForm() {
      
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
        <Button onPress={this.createUser.bind(this)} text="Sign Up" />
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
  input: {
    marginTop: 10,
    padding:30
  }
});

export default CreateGroup;


