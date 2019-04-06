import React from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  speechText: {
    fontSize: 24
  }
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Vocalaiz'
  };

  render () {
    return (
      <View style={[styles.container, styles.contentContainer]}>
        <Button>Start Recording</Button>
      </View>
    );
  }
}
