import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Button from '../component/ui/Button';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={styles.textView}>
            <Text style={styles.text}>Welcome Screen</Text>
          </View>

          <View style={styles.buttonViewContainer}>
            <View style={styles.button}>
              <Button
                onPress={() => this.props.navigation.navigate('ProductList')}>
                Show Products List
              </Button>
            </View>

            <View style={styles.button}>
              <Button
                onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                Go to Profile Screen
              </Button>
            </View>
            <View style={styles.button}>
              <Button
                onPress={() =>
                  this.props.navigation.navigate('BottomTabScreen')
                }>
                Go to Bottom Tab Screen
              </Button>
            </View>
            <View style={styles.button}>
              <Button
                onPress={() =>
                  this.props.navigation.navigate('ProducListInFunctional')
                }>
                Go to Product Functional
              </Button>
            </View>

            <View style={styles.button}>
              <Button
                onPress={() => this.props.navigation.navigate('agoraCalling')}>
                Agora Calling
              </Button>
            </View>

            <View style={styles.button}>
              <Button
                onPress={() => this.props.navigation.navigate('liveStreaming')}>
                Live Streaming
              </Button>
            </View>
            <View style={styles.button}>
              <Button
                onPress={() =>
                  this.props.navigation.navigate('liveStreaming2')
                }>
                Live Streaming 2
              </Button>
            </View>
            <View style={styles.button}>
              <Button
                onPress={() =>
                  this.props.navigation.navigate('liveStreaming3')
                }>
                Live Streaming 3
              </Button>
            </View>

            <View style={styles.button}>
              <Button
                onPress={() =>
                  this.props.navigation.navigate('liveStreaming4')
                }>
                Live Streaming 4
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  textView: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  button: {
    width: 150,
    marginHorizontal: 125,
    margin: 4,
  },
});
