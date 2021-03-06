import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Button } from './button';

export class Launch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createGroup() {
    Actions.push('createGroup');
  }

  joinGroup() {
    Actions.push('joinGroup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text="Create New Group" onPress={this.createGroup.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 700
  },
  button: {
    backgroundColor: '#8203fd',
    marginTop: 10,
    padding: 30
  },
  input: {
    marginTop: 10,
    padding: 30
  }
});

export default Launch;
