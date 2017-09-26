import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var { NativeAppEventEmitter } = require('react-native');

export default class UserDetails extends Component {
  constructor(props){
        super(props);
        this.state = ({
          username:"Waiting for user to login...",
        });
    }

  handleNativeMsg = ( aMsg ) => {
    console.log("Did receive message");
    console.log(aMsg);
    this.setState({
            username:aMsg.username,
            nickname:aMsg.nickname,
        });
  }
  componentWillMount() {
    console.log("WillMount");
    this.subscription = NativeAppEventEmitter.addListener(
      'UserDidLoginMsg', (reminder) =>
      {
        this.handleNativeMsg(reminder.message);
      }
    )
  }
  componentWillUnmount() {
    console.log("WillUnmount");
    this.subscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.username}
        </Text>
        <Text style={styles.welcome}>{this.state.nickname}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
