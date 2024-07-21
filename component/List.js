import React from 'react';
import {
  Text,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      id: '',
    };
  }
  componentDidMount() {
    this.fetchingData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.limit !== this.props.limit) {
      this.fetchingData();
    }
  }
  componentWillUnmount() {
    console.log('CLEANING UP');
  }
  fetchingData = () => {
    fetch(`https://fakestoreapi.com/products?limit=${this.props.limit}`)
      .then(res => res.json())
      .then(json => this.setState({products: json}));
  };
  render() {
    return (
      <ScrollView>
        {this.state.products.map(product => (
          <View key={product.id}>
            <View style={styles.itemContainer}>
              <Pressable
                onPress={() => this.setState({id: product.id})}
                style={({pressed}) => [pressed && styles.pressed]}>
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
