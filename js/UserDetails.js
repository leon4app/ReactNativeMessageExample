import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class UserDetails extends Component {

  handleNativeMsg = ( aMsg ) => {
    console.log("Did receive message");
    console.log(aMsg);
  }
  render() {
    var { NativeAppEventEmitter } = require('react-native');
    this.NativeMsgSubscription = NativeAppEventEmitter.addListener(
      'UserDidLoginMsg', (reminder) =>
      {
        this.handleNativeMsg(reminder.message);
      }
    )
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Waiting for user to login...
        </Text>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
