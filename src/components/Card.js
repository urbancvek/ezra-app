// @flow
import React, { Component } from 'react';
import { Animated, StyleSheet, Dimensions, Image, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

class Card extends Component {
  props: Props;
  state: State;

  state = {
    enter: new Animated.Value(1),
    imageSize: {
      width: 0,
      height: 0,
    },
  }

  componentDidMount() {
    Animated.timing(this.state.enter, { toValue: 0 }).start();
    Image.getSize(this.props.book.image, (width, height) => this.setState({ imageSize: { width: width / 1.8, height: height / 1.8 } }));
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.book) {
      Image.getSize(newProps.book.image, (width, height) => this.setState({ imageSize: { width: width / 1.8, height: height / 1.8 } }));
    }

    this.setState({ enter: new Animated.Value(1) }, () => {
      Animated.timing(this.state.enter, { toValue: 0, duration: 300 }).start();
    });
  }

  render() {
    const { index, animatedStyles, book } = this.props;
    const { enter, imageSize } = this.state;

    const offset = index * 6;

    const additionalStyles = {
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
      height: height - 230,
    };

    return (
      <Animated.View
        style={[styles.container, animatedStyles, additionalStyles]}
        {...this.props}
      >
        <Image
          source={{ uri: book && book.image }}
          resizeMode="contain"
          style={[styles.image, { width: imageSize.width, height: imageSize.height }]}
        />
        <Text style={styles.title} numberOfLines={2}>
          {book && book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book && book.author}
        </Text>
      </Animated.View>
    );
  }
}

type Props = {
  animatedStyles?: Object,
  index: number,
  book: Book,
};

type State = {
  enter: Animated.Value,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
    },
  },
  image: {
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    fontFamily: 'Brandon Text',
    fontWeight: '600',
    fontSize: 21,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  author: {
    fontFamily: 'Brandon Text',
    fontWeight: '400',
    fontSize: 18,
  },
});

export default Card;
