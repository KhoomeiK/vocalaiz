import React from 'react';
import {
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { tintColor, darkTintColor } from '../constants/Colors';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: tintColor,
    borderRadius: 100000,
    justifyContent: 'center'
  },
  icon: {
    padding: 10
  }
});

export default class RoundIconButton extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    style: PropTypes.any,
    buttonSize: PropTypes.number,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    pressedColor: PropTypes.string,
    onPress: PropTypes.func
  }
  render () {
    return (
      <React.Fragment>
        <TouchableHighlight
          style={[
            styles.button,
            this.props.style,
            // Resize button based on given size
            {
              height: this.props.buttonSize || 64,
              width: this.props.buttonSize || 64
            }
          ]}
          onPress={this.props.onPress}
          underlayColor={this.props.pressedColor || darkTintColor}
        >
          <Ionicons
            style={styles.icon}
            name={this.props.icon}
            size={this.props.iconSize || 42}
            color={this.props.iconColor || '#fff'}
          />
        </TouchableHighlight>
      </React.Fragment>
    );
  }
}
