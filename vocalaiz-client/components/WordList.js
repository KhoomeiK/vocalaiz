import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

/**
 * Data:
 * [
 *    [word1, confidenceScore, correctPronounciationBlob],
 *    ...
 * ]
 */

const styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.tintColor,
    borderTopWidth: 2,
    width: '100%',
    paddingTop: 10
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    padding: 5
  },
  badScore: {
    color: Colors.errorColor
  }
});

export default class WordList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.array)
  }

  render () {
    const { data } = this.props;

    if (!data) {
      return <ScrollView style={styles.container}><Text style={styles.text}>No Data loaded</Text></ScrollView>;
    }

    return (
      <ScrollView style={styles.container}>
        {
          data.map((entry, index) => {
            const [ word, confidenceScore ] = entry;
            return (
              <Text key={`${index}-${word}`} style={[styles.text, confidenceScore < 0.7 ? styles.badScore : undefined]} >
                {word} - {confidenceScore}
              </Text>
            );
          })
        }
      </ScrollView>
    );
  }
}
