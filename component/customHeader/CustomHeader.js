import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

function CustomHeader({
  title,
  navigation,
  showLeftIcon,
  showTitle,
  showRightIcon,
}) {
  function leftIconHandler() {
    navigation.goBack();
    console.log('CLEANING UP');
  }
  function titleHandler() {
    console.log('titleHandler');
  }
  function rightIconHandler() {
    navigation.navigate('ProfileScreen');
  }

  let leftIcon = true;
  let headerTitle = true;
  let rightIcon = true;
  leftIcon = showLeftIcon ? false : true;
  headerTitle = showTitle ? false : true;
  rightIcon = showRightIcon ? false : true;
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftHeaderButton}>
        {!leftIcon && (
          <TouchableOpacity onPress={leftIconHandler}>
            <Image
              style={styles.leftButton}
              source={require('../../assets/Icons/LeftIcon.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerTitle}>
        {!headerTitle && (
          <TouchableOpacity onPress={titleHandler}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.rightHeaderButton}>
        {!rightIcon && (
          <TouchableOpacity onPress={rightIconHandler}>
            <Image
              style={styles.rightButton}
              source={require('../../assets/Icons/RightIcon.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: 54,
    backgroundColor: Colors.white1,
    flexDirection: 'row',
  },
  leftHeaderButton: {
    width: '20%',
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  leftButton: {
    width: 42,
    height: 42,
  },
  headerTitle: {
    width: '60%',
    paddingVertical: 12,
  },
  title: {
    color: '#2b4faa',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
  },

  rightHeaderButton: {
    width: '20%',
    paddingVertical: 7,
    paddingLeft: 30,
  },
  rightButton: {
    width: 42,
    height: 42,
  },
});
