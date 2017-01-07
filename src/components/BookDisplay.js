// @flow
import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

@autobind
class BookDisplay extends Component {
  props: Props;
  state: State;

  state: State = {
    bottom: new Animated.Value(-300),
  };

  componentDidMount() {
    if (this.props.book) {
      Animated.timing(this.state.bottom, { toValue: 0 }).start();
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.book) {
      Animated.timing(this.state.bottom, { toValue: 0 }).start();
    } else {
      Animated.timing(this.state.bottom, { toValue: -300 }).start();
    }
  }

  render() {
    const { book, cancelBook, addBook } = this.props;
    const { bottom } = this.state;

    return (
      <Animated.View style={[styles.container, { bottom }]}>
        {book &&
          <View>
            <Text>
              {book && book.title}
            </Text>
            <Image
              source={{ uri: book && book.image }}
              resizeMode="contain"
              style={styles.image}
            />
            <TouchableOpacity onPress={() => cancelBook()}>
              <View style={styles.button} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addBook()}>
              <View style={styles.button} />
            </TouchableOpacity>
          </View>
        }
      </Animated.View>
    );
  }
}

type Props = {
  book: {
    title: string,
    author: string,
    image: string,
  },
  cancelBook: () => void,
  addBook: () => void,
};

type State = {
  bottom: Animated.Value,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 300,
  },
  image: {
    width: 100,
    height: 200,
    alignSelf: 'center',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
  },
});

export default BookDisplay;
