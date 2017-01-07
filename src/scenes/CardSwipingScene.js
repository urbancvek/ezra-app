// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';
import clamp from 'clamp';

import Card from 'components/Card';

@autobind
class CardSwipingScene extends Component {
  state: State;
  panResponder: Object;

  state: State = {
    pan: new Animated.ValueXY(),
    books: ['#fff', '#eee', '#ddd'],
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.pan.flattenOffset();

        if (Math.abs(this.state.pan.x._value) > 120) {
          let velocity;
          if (vx >= 0) {
            velocity = clamp(vx, 3, 5);
          } else if (vx < 0) {
            velocity = clamp(vx * -1, 3, 5) * -1;
          }

          Animated.decay(this.state.pan, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.99,
          }).start(this.resetState);
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
          }).start();
        }
      },
    });
  }

  resetState() {
    this.goToNextPerson();
  }

  goToNextPerson() {
    this.setState({
      books: this.state.books.slice(1),
    }, () => this.state.pan.setValue({ x: 0, y: 0 }));
  }

  render() {
    const { pan } = this.state;

    const rotate = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-30deg', '0deg', '30deg'],
    });

    const opacity = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5],
    });

    const animatedCardStyles = { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }], opacity };

    return (
      <View style={styles.container}>
        <Card
          color={this.state.books[2]}
          index={2}
        />
        <Card
          color={this.state.books[1]}
          index={1}
        />
        <Card
          color={this.state.books[0]}
          index={0}
          animatedStyles={animatedCardStyles}
          {...this.panResponder.panHandlers}
        />
      </View>
    );
  }
}

type State = {
  pan: Animated.ValueXY,
  books: Array<string>,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardSwipingScene;
