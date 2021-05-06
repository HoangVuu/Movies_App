import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorText = (props) => {
  if (!props.touched || !props.error) return null;

  return (
    <View>
      <Text style={styles.err}>{props.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  err: {
    color: 'red',
    fontSize: 20,
  },
});
export default ErrorText;
