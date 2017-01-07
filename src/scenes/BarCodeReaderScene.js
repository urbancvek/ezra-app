// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Camera, { constants } from 'react-native-camera';

import books from 'data/books.json';
import BookDisplay from 'components/BookDisplay';

@autobind
class BarCodeReaderScene extends Component {
  state: State;
  camera: Object;

  state: State = {
    barCode: null,
  };

  onBarCodeRead(barCode: { data: string }) {
    if (!this.state.barCode) {
      this.setState({
        barCode: barCode.data,
      });
    }
  }

  render() {
    const book = books[this.state.barCode];

    return (
      <View style={styles.container}>
        <Camera
          ref={camera => this.camera = camera}
          style={styles.preview}
          aspect={constants.Aspect.fill}
          onBarCodeRead={this.onBarCodeRead}
        />
        <BookDisplay
          book={book}
          cancelBook={() => this.setState({ barCode: null })}
          addBook={() => this.setState({ barCode: null })}
        />
      </View>
    );
  }
}

type State = {
  barCode: ?string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
});

export default BarCodeReaderScene;
