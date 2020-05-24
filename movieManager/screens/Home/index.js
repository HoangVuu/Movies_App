import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {fetchMovies} from '../../redux/actions';
import MovieItem from '../../components/movieItem';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class HomeScreen extends Component {
  gotoCreate = () => {
    this.props.navigation.navigate('createMovie');
  };

  render() {
    return (
      <SafeAreaView>
        {console.log('this.props.movieList', this.props.movieList)}
        <View style={{paddingHorizontal: 10, paddingBottom: 20}}>
          <View buttonStyle={styles.addBtnContainer}>
            <Button
              onPress={this.gotoCreate}
              style={styles.addBtn}
              icon={() => <Icon name="add" size={25} color="red" />}
            />
          </View>
          <FlatList
            numColumns="1"
            data={this.props.movieList}
            keyExtractor={(item) => item.maPhim}
            renderItem={(item) => <MovieItem movies={item.item} />}
          />
        </View>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    //promise
    this.props.dispatch(fetchMovies());
  }
}

const styles = StyleSheet.create({
  addBtnContainer: {
    marginBottom: 15,
  },

  addBtn: {
    fontWeight: '600',
  },
});

const mapStateToProps = (state) => {
  console.log('state.movies', state.movies);
  return {
    movieList: state.movies,
  };
};

export default connect(mapStateToProps)(HomeScreen);
