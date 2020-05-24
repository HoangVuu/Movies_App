import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from '@react-navigation/compat';
import Axios from 'axios';
import {useSelector} from 'react-redux';

const MovieItem = (props) => {
  const {movies} = props;
  const userInfo = useSelector((state) => state.userInfo.data);
  const gotoDetail = () => {
    props.navigation.navigate('detail', {
      movieId: props.movies.maPhim,
    });
  };

  const deleteMovie = () => {
    Axios({
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${props.movies.maPhim}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userInfo?.accssToken}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: movies.hinhAnh,
        }}
        style={styles.image}
      />
      <View style={styles.rating}>
        <Text style={styles.ratingScore}> 1.2 </Text>
        <View style={styles.ratingStars}>
          <Icon name="star" color="red" size={15} />
          <Icon name="star" color="red" size={15} />
          <Icon name="star" color="red" size={15} />
          <Icon name="star" color="red" size={15} />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{movies.tenPhim}</Text>
        <View>
          <Button
            buttonStyle={styles.btnDetail}
            title="Chi tiết"
            onPress={gotoDetail}
          />
          <Button
            buttonStyle={styles.btnDelete}
            title="Xóa"
            onPress={deleteMovie}
          />
        </View>
      </View>
      <LinearGradient
        colors={['transparent', '#000000']}
        style={styles.overlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },

  container: {
    position: 'relative',
    borderRadius: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#fff',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 400,
  },

  rating: {
    backgroundColor: 'gray',
    position: 'absolute',
    top: 10,
    right: 15,
    fontSize: 17,
    fontWeight: '500',
    alignItems: 'center',
  },

  ratingScore: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },

  ratingStars: {
    flexDirection: 'row',
  },

  starIcon: {
    color: '#c24',
  },

  info: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    left: 0,
    zIndex: 2,
    paddingHorizontal: 20,
    bottom: 25,
  },

  name: {
    color: '#fff',
    fontSize: 30,
    justifyContent: 'center',
    flexShrink: 1,
  },

  btnDetail: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  btnDelete: {
    backgroundColor: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
  },
});

export default withNavigation(MovieItem);
