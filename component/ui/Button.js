import React from 'react';
import {Colors} from '../../constants/Colors';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({onPress, style, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingVertical: 12,
    marginHorizontal: 20,
    backgroundColor: Colors.primary50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
