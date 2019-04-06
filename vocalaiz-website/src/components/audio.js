import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Audio extends Component {
  static propTypes = {
    onStream: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onNotSupported: PropTypes.func
  }

  constructor (props) {
    super(props);

    this.state = {
      supported: true
    };

    this.recordStream = this.recordStream.bind(this);
  }

  componentDidMount () {
    this.recordStream();
  }

  render () {
    return (
      <div className='App'>
        Hello World
      </div>
    );
  }

  recordStream () {
    const { onStream, onError, onNotSupported } = this.props;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(
        {
          audio: true
        })
        .then(onStream)
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
}
