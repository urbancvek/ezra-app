// @flow
import React, { Component } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

class Card extends Component {
  props: Props;
  state: State;

  state = {
    enter: new Animated.Value(1),
  }

  componentDidMount() {
    Animated.timing(this.state.enter, { toValue: 0 }).start();
  }

  componentWillReceiveProps() {
    this.setState({ enter: new Animated.Value(1) }, () => {
      Animated.timing(this.state.enter, { toValue: 0, duration: 300 }).start();
    });
  }

  render() {
    const { color, index, animatedStyles } = this.props;
    const { enter } = this.state;

    const offset = index * 6;

    const additionalStyles = {
      backgroundColor: color,
      left: enter.interpolate({
        inputRange: [0, 1],
        outputRange: [40 - offset, 40 - (offset + 6)],
      }),
      top: enter.interpolate({
        inputRange: [0, 1],
        outputRange: [100 - offset, 100 - (offset + 6)],
      }),
      width: enter.interpolate({
        inputRange: [0, 1],
        outputRange: [(width - 80) + (offset * 2), (width - 80) + (offset * 2) + 6],
      }),
      height: height - 200,
    };

    return (
      <Animated.View
        style={[styles.container, animatedStyles, additionalStyles]}
        {...this.props}
      />
    );
  }
}

type Props = {
  animatedStyles?: Object,
  color: string,
  index: number,
};

type State = {
  enter: Animated.Value,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
    },
  },
});

export default Card;
