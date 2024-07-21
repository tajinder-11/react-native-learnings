import React from 'react';
import List from '../component/List';
import Button from '../component/ui/Button';
import {Text, StyleSheet, View} from 'react-native';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 1,
    };
  }

  increaseLimit = () => {
    this.setState(prevState => ({
      limit: prevState.limit + 1,
    }));
  };

  render() {
    console.log('Current Limit', this.state.limit);
    return (
      <>
        <View style={styles.elementContainer}>
          <Text style={styles.text}> Current Limit : {this.state.limit}</Text>
          <View style={styles.buttonView}>
            <Button style={styles.button} onPress={this.increaseLimit}>
              Increase Limit
            </Button>
          </View>
        </View>
        <List limit={this.state.limit} />
      </>
    );
  }
}

export default ProductList;

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
