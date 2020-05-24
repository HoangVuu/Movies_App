import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ProductItem from '../../components/ProductItem';

export class HomeScreen extends Component {
  render() {
    console.log(this.props.productList);
    return (
      <View>
        <FlatList
          numColumns="2"
          data={this.props.productList}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <View style={styles.productItem}>
              <ProductItem product={item.item} />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  productContainer: {
    width: '100%',
  },
  productItem: {
    width: '50%',
  },
});

const mapStateToProps = (state) => {
  return {
    productList: state.product,
  };
};

export default connect(mapStateToProps)(HomeScreen);
