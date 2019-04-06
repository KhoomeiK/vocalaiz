import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Audio from './components/audio';
import microphoneImage from './images/microphone.svg';

const styles = StyleSheet.create({
  recordButton: {
    padding: 0,
    maxWidth: '5rem',
    borderRadius: '50%',
    backgroundColor: '#eee'
  },
  recordButtonImage: {
    maxWidth: '100%'
  }
});

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Audio onStream={this._handleStream} onError={() => console.error('Error')} />
        <button className={css(styles.recordButton)}>
          <img className={css(styles.recordButtonImage)} src={microphoneImage} alt='Record' />
        </button>
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
