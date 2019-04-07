import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import Fab from '@material-ui/core/Fab';
import MicIcon from '@material-ui/icons/Mic';

import Audio from './components/audio';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  recordButton: {
    margin: '1em'
  }
});

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      data: undefined,
      error: undefined
    };

    this.audioRef = React.createRef();

    this._handleRecord = this._handleRecord.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleStream = this._handleStream.bind(this);
  }

  render () {
    return (
      <div className={css(styles.container)}>
        <Fab size='large' color={this.state.data ? 'secondary' : 'primary'} aria-label='Record' className={css(styles.recordButton)} onClick={this._handleRecord}>
          <MicIcon />
        </Fab>
        <Audio ref={this.audioRef} onStreamChunk={this._handleStream} onError={this._handleError} />
        <p>{ this.state.data ? JSON.stringify(this.state.data) : 'No data' }</p>
        <p>{ this.state.error ? this.state.error.toString() : 'No errors' }</p>
      </div>
    );
  }

  _handleStream (data) {
    console.log('Have a stream');
    console.log(data);
    this.setState({
      data
    });

    // TODO: Use stream
  }

  _handleError (error) {
    this.setState({
      error
    });
  }

  _handleRecord () {
    if (this.audioRef.current) {
      this.audioRef.current.prepareStream();
    }
  }
}

export default App;
