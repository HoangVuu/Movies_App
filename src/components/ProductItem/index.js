import React, {Component} from 'react';
import {Text, View, Image, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

export class ProductItem extends Component {
  addToCart = () => {
    //gửi yêu cầu lên store để chỉnh dữ dữ liệu Cart
    this.props.dispatch({
      //type là bắt buộc
      type: 'ADD_TO_CART',
      //payload là optional
      payload: this.props.product,
    });
  };

  render() {
    return (
      <View style={styles.productContainer}>
        <Image source={{uri: this.props.product.img}} style={styles.image} />
        <Text> {this.props.product.name.toUpperCase()} </Text>
        <Text>Giá: {this.props.product.price} </Text>
        <Button title="Add to cart" onPress={this.addToCart} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  productContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    paddingVertical: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 6,
  },
  image: {
    width: 170,
    height: 100,
  },
});

export default connect()(ProductItem);
