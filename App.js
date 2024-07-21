import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import ProductList from './screens/ProductList';
import ProfileScreen from './screens/ProfileScreen';
import BottomTabScreen from './screens/BottomTabScreen';
import FlashMessage from 'react-native-flash-message';
import {Alert} from 'react-native';
import {Colors} from './constants/Colors';
import ProductListInFunctional from './screens/ProductListInFunctional';
import AgoraCalling from './screens/AgoraCalling';
import LiveStreaming from './screens/LiveStreaming';
import LiveStreaming2 from './screens/LiveStreaming2';
import LiveStreaming3 from './screens/LiveStreaming3';
import LiveStreaming4 from './screens/LiveStreaming4';

const Stack = createNativeStackNavigator();
class App extends React.Component {
  handleLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'Logout',
      },
    ]);
  };
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: Colors.primary50},
              headerTintColor: 'white',
              animation: 'slide_from_right',
              headerShown: false,
            }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
            <Stack.Screen
              name="ProducListInFunctional"
              component={ProductListInFunctional}
            />
            <Stack.Screen name="agoraCalling" component={AgoraCalling} />
            <Stack.Screen name="liveStreaming" component={LiveStreaming} />
            <Stack.Screen name="liveStreaming2" component={LiveStreaming2} />
            <Stack.Screen name="liveStreaming3" component={LiveStreaming3} />
            <Stack.Screen name="liveStreaming4" component={LiveStreaming4} />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" />
      </>
    );
  }
}

export default App;
