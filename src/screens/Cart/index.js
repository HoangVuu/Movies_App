import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import CartItem from '../../components/CartItem';
import {connect} from 'react-redux';

export class CartScreen extends Component {
  // componentDidMount(){
  //   //code ở đây

  // }
  render() {
    return (
      <View>
        <FlatList
          data={this.props.cartList}
          keyExtractor={(item) => item.product.id}
          renderItem={(cart) => <CartItem item={cart.item} />}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartList: state.cart,
  };
};

export default connect(mapStateToProps)(CartScreen);
