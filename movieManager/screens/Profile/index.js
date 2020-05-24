import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';

export class ProfileScreen extends Component {
  goToSignIn = () => {
    this.props.navigation.navigate('signin');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Icon name="user-circle" size={80} />
          <Text> Profile </Text>
          <Button
            title="Log in"
            buttonStyle={styles.btn}
            onPress={this.goToSignIn}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
