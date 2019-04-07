import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Audio extends Component {
  static propTypes = {
    onStreamChunk: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onNotSupported: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
      supported: true
    };

    this.prepareStream = this.prepareStream.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.streamAudioData = this.streamAudioData.bind(this);
  }

  render () {
    return (
      <div className='App'>
        Hello World
      </div>
    );
  }

  prepareStream () {
    const { onError, onNotSupported } = this.props;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(
        {
          audio: true
        })
        .then(this.startRecording)
        .catch(onError);
    } else {
      this.setState({
        supported: false
      }, () => {
        console.error('getUserMedia not supported on your browser!');
        onNotSupported();
      });
    }
  }

  startRecording (stream, callback) {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    if (!audioContext) {
      return;
    }

    // AudioNode used to control the overall gain (or volume) of the audio graph

    console.log(audioContext);
    const inputPoint = audioContext.createGain();
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    const scriptProcessor = inputPoint.context.createScriptProcessor(2048, 2, 2);

    microphone.connect(inputPoint);
    inputPoint.connect(analyser);
    inputPoint.connect(scriptProcessor);
    scriptProcessor.connect(inputPoint.context.destination);
    // This is for registering to the “data” event of audio stream, without overwriting the default scriptProcessor.onAudioProcess function if there is one.
    scriptProcessor.addEventListener('audioprocess', this.streamAudioData);
  }

  streamAudioData (e) {
    const floatSamples = e.inputBuffer.getChannelData(0);
    this.props.onStreamChunk(floatSamples);
    // HERE GOES THE CODE TO SEND THE CHUNKED DATA FROM STREAM
  }
}
