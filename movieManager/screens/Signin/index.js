import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage, // giống với local storage, chỉ lưu được string, chuỗi json
} from 'react-native';
import Logo from '../../assets/images/tix.png';
import Bg from '../../assets/images/background.jpg';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import Axios from 'axios';

const SigninScreen = (props) => {
  const [account, setAccount] = useState({
    taikhoan: '',
    matkhau: '',
  });

  const handleChange = (key) => (val) => {
    setAccount({...account, [key]: val});
  };

  const handleSubmit = () => {
    //const dispath = useDispatch();
    console.log(account);
    Axios({
      url: 'http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
      method: 'POST',
      data: account,
    })
      .then((res) => {
        AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
        AsyncStorage.setItem('accessToken', res.data.accessToken);
        // props.navigation.navigate('home'); vì dùng navigate nó sẽ chồng các stack lên nhau, có thể back lại, nhưng login thành công thì không cần back lại
        props.navigation.replace('home'); // dùng replace để reset lại và hủy bỏ các stack hiện tại và chuyển đến stack mới
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ImageBackground source={Bg} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
          <View style={styles.form}>
            <TextInput
              style={styles.formControl}
              placeholder="Tài khoản"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              onChangeText={handleChange('taikhoan')}
            />

            <TextInput
              style={styles.formControl}
              placeholder="Mật khẩu"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyLabel="Submit"
              secureTextEntry
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={handleChange('matkhau')}
            />
            <Button
              title="ĐĂNG NHẬP"
              buttonStyle={styles.btn}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 200,
  },

  formControl: {
    paddingLeft: 20,
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    fontSize: 20,
    marginBottom: '4%',
    borderRadius: 5,
  },

  btn: {
    height: 50,
  },
});

export default SigninScreen;
