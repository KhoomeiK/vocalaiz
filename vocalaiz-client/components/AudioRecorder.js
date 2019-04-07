/* global FormData fetch */
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { Audio, Permissions } from 'expo';

import RoundIconButton from './RoundIconButton';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  infoText: {
    marginTop: 15,
    fontSize: 18
  }
});

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props);

    this.recording = undefined;
    this.state = {
      hasPermissions: false,
      isRecording: false,
      isLoading: false,
      error: undefined
    };
  }

  async componentDidMount () {
    await this._askForPermissions();
  }

  render () {
    const { hasPermissions, isRecording, isLoading, error } = this.state;

    if (!hasPermissions) {
      return <View style={styles.container}><Text style={styles.infoText}>Please enable microphone permissions.</Text></View>;
    }

    if (error) {
      return <View style={styles.container}><Text style={styles.infoText}>Error while recording: {error}</Text></View>;
    }

    return (
      <View style={styles.container}>
        <RoundIconButton
          icon={isLoading ? 'md-sync' : 'md-mic'}
          style={{ backgroundColor: isRecording ? 'red' : 'blue' }}
          onPress={this._handlePressRecordButton}
          iconSize={64}
          buttonSize={128}
        />
        <Text style={styles.infoText}>{isRecording ? 'Recording...' : (isLoading ? 'Loading...' : 'Ready to record.')}</Text>
      </View>
    );
  }

  _askForPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    this.setState({
      hasPermissions: status === 'granted'
    });
  }

  _handlePressRecordButton = async () => {
    const { isRecording } = this.state;
    if (isRecording) {
      await this._stopAudioRecording();
    } else {
      await this._startAudioRecording();
    }
  }

  _startAudioRecording = async () => {
    this.setState({
      isLoading: true
    });
    this.recording = new Audio.Recording();
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false
      });
      await this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await this.recording.startAsync();
      this.setState({
        isRecording: true,
        isLoading: false
      });
      console.log('Recording!');
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  _stopAudioRecording = async () => {
    this.setState({
      isLoading: true
    });
    if (this.recording) {
      try {
        await this.recording.stopAndUnloadAsync();
        this.setState({
          isRecording: false,
          isLoading: false
        });
        console.log('Stopped recording.');

        await this._uploadAudio(this.recording.getURI());
      } catch (error) {
        this.setState({
          error
        });
      }
    }
  }

  _uploadAudio = async (fileUri) => {
    const data = await fetch(fileUri);
    const blob = await data.blob();

    // Upload the recordings using the fetch and FormData APIs
    let formData = new FormData();
    formData.append('recording', blob);

    console.log(formData);

    if (data) {
      console.log('TODO FILL IN THE SERVER_URL');
      return;
    }

    return fetch('SERVER URL', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data'
      }
    });
  }
}
