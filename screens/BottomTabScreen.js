import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalenderScreen from './CalenderScreen';
import IndexScreen from './IndexScreen';
import NewScreen from './NewScreen';
import ProfileScreen from './ProfileScreen';
import ProductList from './ProductList';
import {Image, StyleSheet, View, Text, Platform} from 'react-native';
import {Colors} from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const BottomTabScreen = () => {
  return (
    <>
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 85,
            backgroundColor: 'black',
          },
        }}>
        <BottomTab.Screen
          name="IndexScreen"
          component={IndexScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={styles.iconContainer}>
                  {focused ? (
                    <Image
                      source={require('../assets/BottomTabIcon/final/home-2.png')}
                    />
                  ) : (
                    <Image
                      source={require('../assets/BottomTabIcon/initial/home-2.png')}
                    />
                  )}
                  <Text style={styles.iconText}>Index</Text>
                </View>
              );
            },
          }}
        />
        <BottomTab.Screen
          name="CalenderScreen"
          component={CalenderScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={styles.iconContainer}>
                  {focused ? (
                    <Image
                      source={require('../assets/BottomTabIcon/final/calendar.png')}
                    />
                  ) : (
                    <Image
                      source={require('../assets/BottomTabIcon/initial/calendar.png')}
                    />
                  )}
                  <Text style={styles.iconText}>Calendar</Text>
                </View>
              );
            },
          }}
        />
        <BottomTab.Screen
          name="NewScreen"
          component={NewScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={styles.addScreenIcon}>
                  {focused ? (
                    <Image
                      source={require('../assets/BottomTabIcon/blackPlus.png')}
                    />
                  ) : (
                    <Image
                      source={require('../assets/BottomTabIcon/whitePlus.png')}
                    />
                  )}
                </View>
              );
            },
          }}
        />
        <BottomTab.Screen
          name="ProductsList"
          component={ProductList}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={styles.iconContainer}>
                  {focused ? (
                    <Image
                      source={require('../assets/BottomTabIcon/final/clock.png')}
                    />
                  ) : (
                    <Image
                      source={require('../assets/BottomTabIcon/initial/clock.png')}
                    />
                  )}
                  <Text style={styles.iconText}>Focuse</Text>
                </View>
              );
            },
          }}
        />
        <BottomTab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View style={styles.iconContainer}>
                  {focused ? (
                    <Image
                      source={require('../assets/BottomTabIcon/final/user-2.png')}
                    />
                  ) : (
                    <Image
                      source={require('../assets/BottomTabIcon/initial/user.png')}
                    />
                  )}
                  <Text style={styles.iconText}>Profile</Text>
                </View>
              );
            },
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default BottomTabScreen;

const styles = StyleSheet.create({
  iconContainer: {alignItems: 'center', justifyContent: 'center'},
  addScreenIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#96ee14',
    width: Platform.OS === 'ios' ? 50 : 70,
    height: Platform.OS === 'ios' ? 50 : 70,
    top: Platform.OS === 'ios' ? -20 : -40,
    borderRadius: Platform.OS === 'ios' ? 25 : 35,
  },
  iconText: {
    color: Colors.primary10,
    paddingVertical: 5,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
