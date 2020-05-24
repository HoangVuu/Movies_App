import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

export class MovieDetailScreen extends Component {
  render() {
    const {movieId} = this.props.route.params;
    console.log('movieId', movieId);
    return (
      <View>
        <Text> Movie detail </Text>
      </View>
    );
  }
}

export default MovieDetailScreen;
