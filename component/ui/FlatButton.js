import React from 'react';
import {Colors} from '../../constants/Colors';
import {Pressable, StyleSheet, Text, View} from 'react-native';
class FlatButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Pressable
        style={({pressed}) => [styles.button, pressed && styles.pressed]}
        onPress={this.props.onPress}>
        <View>
          <Text style={styles.buttonText}>{this.props.children}</Text>
        </View>
      </Pressable>
    );
  }
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: Colors.primary50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.primary50,
  },
});
