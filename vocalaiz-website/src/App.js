import React, { Component } from 'react';

import Audio from './components/audio';

import microphoneImage from './images/microphone.png';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Audio onStream={this._handleStream} onError={() => console.error('Error')} />
        <img src={microphoneImage} alt='Record' />
      </div>
    );
  }

  _handleStream (stream) {
    console.log('Have a stream');
    console.log(stream);
    // TODO: Use stream
  }
}

export default App;
