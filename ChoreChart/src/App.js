import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import CreateGroup from './createGroup.js';
// import JoinGroup from './joinGroup.js';
import Launch from './launch.js';
import Home from './home.js';
import SignUp from './signup.js';
import SignIn from './signin.js';
import * as firebase from 'firebase';
import { Router, Scene, Stack} from 'react-native-router-flux';


export default class App extends React.Component {
constructor(props) {
  super(props);
    // Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEyczfrS3xTdkZ-AljW4tycE9_D0aNdHI",
  authDomain: "chorechart-d8661.firebaseapp.com",
  databaseURL: "https://chorechart-d8661.firebaseio.com/",
  storageBucket: "chorechart-d8661.appspot.com"
};
firebase.initializeApp(firebaseConfig);

  }

  render() {
    return (
      <Router>
      <Stack key="root">
        <Scene key="signin" component={SignIn} title="Sign In"/>
        <Scene key="signup" component={SignUp} title="Sign Up"/>
        <Scene key="launch" component={Launch} hideNavBar={true}/>
        <Scene key="home" component={Home} title="Home" hideNavBar={true}/>
        <Scene key="createGroup" component={CreateGroup} title="Create a Group"/>
        {/* <Scene key="joinGroup" component={JoinGroup} title="Home" hideNavBar={true}/> */}
      </Stack>
    </Router>
    );
  }
}
