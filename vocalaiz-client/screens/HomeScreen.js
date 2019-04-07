import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import AudioRecorder from '../components/AudioRecorder';

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
      <View>
        <AudioRecorder style={[styles.container, styles.contentContainer]} />
      </View>
    );
  }
}
