import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {StyleSheet, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';

function List({limit}) {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=${limit}`)
      .then(res => res.json())
      .then(json => setProducts(json));
  }, [limit]);

  return (
    <ScrollView>
      {Products.map(product => (
        <View key={product.id}>
          <View style={styles.itemContainer}>
            <Pressable style={({pressed}) => [pressed && StyleSheet.pressed]}>
              <Image
                resizeMode="contain"
                source={{uri: product.image}}
                style={styles.image}
              />
              <Text style={styles.itemText}>{product.id}</Text>
              <Text style={styles.itemText}>{product.title}</Text>
              <Text style={styles.itemText}>{product.price}</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default List;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 12,
    padding: 4,
    color: 'black',
    borderBottomWidth: 2,
  },
  itemContainer: {
    backgroundColor: '#44aed7',
    padding: 8,
    margin: 12,
    borderRadius: 8,
    elevation: 8,
  },
  itemText: {
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 37.5,
    marginBottom: 8,
  },
  pressed: {
    opacity: 0.25,
  },
});
