import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Button from './button.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
var shortid = require('shortid');

export class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            members: [],
            memberEmails: [],
        };
    }

    componentDidMount() {
        for (i = 0; i < 2; i++) {
            this.addTextInput();
        }
    }

    addTextInput = () => {
        var temp = this.state.members;
        var key = this.state.members.length;
        temp.push(<TextInput key={key}
            placeholder={'group member ' + (this.state.members.length + 1)}
            style={styles.input}
            onChangeText={(email) => this.updateEmailValues(key, email)} />);
        this.setState({
            members: temp
        });
    }

    updateEmailValues = (index, email) => {
        var temp = this.state.memberEmails;
        temp[index] = email;
        this.setState({
            memberEmails: temp
        });
        console.log(this.state.memberEmails);
    }

    createGroup = () => {
        var groupid = shortid.generate();
        var user = firebase.auth().currentUser;
        firebase.database().ref('groups/' + groupid).set({
            // groupOwner: user,
            groupName: this.state.groupName,
        });
        for (i = 0; i < this.state.memberEmails.length; i++) {
            firebase.database().ref('groups/' + groupid + '/members/').update({
                [this.state.memberEmails[i]]: true,
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={(groupName) => this.setState({ groupName })}
                    value={this.state.groupName} placeholder='group name' style={styles.input} />
                {this.state.members.map((value, index) => {
                    return value;
                })}
                <Button onPress={this.addTextInput} text="+" />
                <Button onPress={this.createGroup} text="Create Group" />
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
        marginTop: 0,
        padding: 30
    }
});

export default CreateGroup;


