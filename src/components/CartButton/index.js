import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {withNavigation} from '@react-navigation/compat';
import {connect} from 'react-redux';

export class CartButton extends Component {
  goToCart = () => {
    this.props.navigation.navigate('Cart');
  };

  countTotal = () => {
    let result = this.props.cartList.reduce((sum, currentItem) => {
      return sum + currentItem.quantity;
    }, 0);
    return result;
  };

  render() {
    console.log('re render');
    return (
      <TouchableOpacity onPress={this.goToCart} style={styles.container}>
        <Icon name="shoppingcart" size={30} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{this.countTotal()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 20,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#000',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  badgeText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '600',
  },
});

const mapStateToProps = (state) => ({
  cartList: state.cart,
});

export default withNavigation(connect(mapStateToProps)(CartButton));
