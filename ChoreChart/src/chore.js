import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Chore extends React.Component {
  render() {
    // if (this.props.type === 'display') {
    return (
      <View style={styles.container}>
        <Text>{this.props.description}</Text>
      </View>
    );
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#979797',
    borderStyle: 'solid',
    shadowColor: 'rgba(0,0,0,0.50)',
    shadowOffset: {
      width: 1,
      height: 2
    },
    borderRadius: 4,
    width: '90%',
    height: 41
  }
});

export default Chore;
