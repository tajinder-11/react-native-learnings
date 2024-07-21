import React, {useEffect} from 'react';
import CustomHeader from '../component/customHeader/CustomHeader';
import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import List from '../component/ProductList/List';
import Button from '../component/ui/Button';

function ProductListInFunctional({navigation}) {
  const [limit, setLimit] = useState(1);

  const increaseLimit = () => {
    setLimit(prevLimit => prevLimit + 1);
  };
  console.log('Current Limit', limit);
  return (
    <>
      <CustomHeader
        title="Profile"
        navigation={navigation}
        showLeftIcon={true}
        showTitle={true}
        showRightIcon={true}
      />
      <View style={styles.elementContainer}>
        <Text style={styles.text}>Current Limit : {limit}</Text>
        <View style={styles.buttonView}>
          <Button style={styles.button} onPress={increaseLimit}>
            Increase Limit
          </Button>
        </View>
      </View>
      <List limit={limit} />
    </>
  );
}

export default ProductListInFunctional;

const styles = StyleSheet.create({
  elementContainer: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonView: {
    marginRight: 10,
  },
});
