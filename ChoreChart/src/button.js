import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <TouchableOpacity style={styles.button} onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.text}>{this.props.text}</Text>
        </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    backgroundColor:"#337ab7",
    borderRadius: 5,
    alignItems:'center',
    padding:30,
    marginBottom: 15,
    width: 300
  },
  text: {
      color:'white',
  }
});

export default Button;


