import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Appearance, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../component/ui/Button';

function Theme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        const colorTheme = Appearance.getColorScheme();
        setTheme(colorTheme || 'light');
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('theme', theme);
  }, [theme]);

  function lightButtonPressed() {
    setTheme('light');
  }

  function darkButtonPressed() {
    setTheme('dark');
  }

  return (
    <View
      style={[
        styles.container,
        theme === 'light' ? styles.lightContainer : styles.darkContainer,
      ]}>
      <Text
        style={[
          styles.text,
          theme === 'light' ? styles.darkText : styles.lightText,
        ]}>
        Login
      </Text>
      <TextInput
        style={[
          styles.email,
          theme === 'light' ? styles.lightTextField : styles.darkTextField,
        ]}
        placeholder="Enter Email"
        placeholderTextColor={theme === 'light' ? '#000000' : '#ffffff'}
      />
      <TextInput
        style={[
          styles.password,
          theme === 'light' ? styles.lightTextField : styles.darkTextField,
        ]}
        placeholder="Enter Password"
        placeholderTextColor={theme === 'light' ? '#000000' : '#ffffff'}
      />
      <Button>Login</Button>
      <Button style={styles.button} onPress={lightButtonPressed}>
        light
      </Button>
      <Button style={styles.button} onPress={darkButtonPressed}>
        Dark
      </Button>
    </View>
  );
}

export default Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  text: {
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 20,
    fontWeight: '800',
  },
  lightText: {
    color: '#ffff',
  },
  darkText: {
    color: '#000000',
  },
  email: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 100,
    borderRadius: 10,
  },
  password: {
    borderWidth: 1,
    marginTop: 52,
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 10,
  },
  lightTextField: {
    borderColor: '#000000',
  },
  darkTextField: {
    borderColor: '#ffffff',
  },
  button: {
    marginTop: 20,
  },
});
