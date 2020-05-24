import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {createAction} from '../../redux/actions';
import {DECREASE_QUANTITY, REMOVE_CART_ITEM} from '../../redux/actions/type';

export class CartItem extends Component {
  decreaseQuantity = () => {
    //Bước 1: dispatch action lên store với type DECREASE_QUANTITY
    //gửi kèm id để biết muốn giảm quantity của sp nào

    this.props.dispatch(
      createAction(DECREASE_QUANTITY, this.props.item.product.id),
    );

    // b2: lên trên cartReducer (vì reducer này quản lý dữ liệu card),
    // xây thêm một case, nếu action.type là
    // DECREASE_QUANTITY thì xử lý như thế nào (e.x: giảm quantity đi 1)
  };

  removeCartItem = () => {
    //Bước 1: dispatch action lên store với type REMOVE_CART_ITEM
    //gửi kèm id để biết muốn xoá  sp nào

    const payload = {
      id: this.props.item.product.id,
      cb: this.showMessage,
    };

    this.props.dispatch(createAction(REMOVE_CART_ITEM, payload));

    //b2: lên trên cartReducer, xây thêm một case, nếu action.type là
    //REMOVE_CART_ITEM thì xử lý như thế nào (e.x: tìm và xoá sp đó ra khỏi cart)
    //b3: gắn hàm này vào onPress của nút confirm của alert để chạy
  };

  showMessage = () => {
    Alert.alert('Successfully', 'Remove successfully!', [
      {text: 'OK', onPress: () => {}},
    ]);
  };

  showAlert = () => {
    Alert.alert('Confirmation', 'Do u want to remove product?', [
      {text: 'Cancel', onPress: () => {}},
      {text: 'Confirm', onPress: this.removeCartItem},
    ]);
  };

  increaseQuantity = () => {
    this.props.dispatch(
      createAction('INCREASE_QUANTITY', this.props.item.product.id),
    );
  };

  handleDecreaseQuantity = () => {
    if (this.props.item.quantity > 0) {
      this.decreaseQuantity();
    } else {
      this.showAlert();
    }
  };

  render() {
    const {item} = this.props;
    return (
      <View style={styles.cartItemContainer}>
        <Image style={styles.image} source={{uri: item.product.img}} />
        <View>
          <Text style={styles.title}> {item.product.name} </Text>
          <View style={styles.quantityBtns}>
            <Button
              type="outline"
              title="-"
              containerStyle={{width: 40}}
              onPress={this.handleDecreaseQuantity}
            />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Button
              containerStyle={{width: 40}}
              type="outline"
              title="+"
              onPress={this.increaseQuantity}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 80,
  },
  quantityBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 17,
    marginHorizontal: 10,
  },
});

export default connect()(CartItem);
