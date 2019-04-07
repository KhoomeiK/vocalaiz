/* global FormData fetch */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button
} from 'react-native';

import { FileSystem, Audio, Permissions } from 'expo';

import RoundIconButton from './RoundIconButton';
import Colors from '../constants/Colors';
import WordList from './WordList';

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
  },
  top: {
    marginTop: 25,
    marginBottom: 25
  }
});

export default class AudioRecorder extends React.Component {
  constructor (props) {
    super(props);

    this.recording = undefined;
    this.state = {
      hasPermissions: false,
      isRecording: false,
      isLoading: false,
      error: undefined,
      resultData: undefined
    };
  }

  async componentDidMount () {
    await this._askForPermissions();
  }

  render () {
    const { hasPermissions, isRecording, isLoading, error, resultData } = this.state;

    if (!hasPermissions) {
      return <View style={styles.container}><Text style={styles.infoText}>Please enable microphone permissions.</Text></View>;
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.infoText}>Error while recording: {error.message}</Text>
          <Button title='Clear Error' onPress={() => this.setState({ error: undefined })} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <RoundIconButton
            icon={isLoading ? `${Platform.OS === 'ios' ? 'ios' : 'md'}-sync` : `${Platform.OS === 'ios' ? 'ios' : 'md'}-mic`}
            style={{ backgroundColor: isRecording ? Colors.errorColor : Colors.tintColor }}
            onPress={this._handlePressRecordButton}
            pressedColor={isRecording ? Colors.darkErrorColor : Colors.darkTintColor}
            iconSize={72}
            buttonSize={128}
          />
          <Text style={styles.infoText}>{isRecording ? 'Recording...' : (isLoading ? 'Loading...' : 'Ready to record.')}</Text>
        </View>
        <WordList data={resultData} />
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
      await this.recording.prepareToRecordAsync({ ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY, extension: '.wav' });
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
    const file = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingTypes.Base64 });

    // Upload the recordings using the fetch and FormData APIs
    let formData = new FormData();
    formData.append('recording', file);

    const res = await fetch('http://35.233.183.157/prelim', {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data'
      }
    });

    this.setState({
      // Get the output data
      // TODO: Rohan might have formatted this differentyl
      resultData: res.body
    });
  }
}
