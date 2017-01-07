// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Camera, { constants } from 'react-native-camera';

@autobind
class BarCodeReaderScene extends Component {
  state: State;
  camera: Object;

  state: State = {
    scanning: true,
    readBarCode: null,
  };

  onBarCodeRead(barCode: { data: string }) {
    if (this.state.scanning) {
      this.setState({
        scanning: false,
        readBarCode: barCode.data,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={camera => this.camera = camera}
          style={styles.preview}
          aspect={constants.Aspect.fill}
          onBarCodeRead={this.onBarCodeRead}
        />
        <Text>{this.state.readBarCode}</Text>
      </View>
    );
  }
}

type State = {
  scanning: boolean,
  readBarCode: ?string,
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
