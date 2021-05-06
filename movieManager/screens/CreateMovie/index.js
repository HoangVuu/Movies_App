import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {Button} from 'react-native-elements';
import Bg from '../../assets/images/background.jpg';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import * as yup from 'yup';
import {useFormik} from 'formik';
import ErrorText from '../../components/errorText';
import * as _ from 'lodash';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import moment from 'moment';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const CreateMovieScreen = () => {
  const userInfo = useSelector((state) => state?.userInfo?.data);
  const movieSchema = yup.object().shape({
    tenPhim: yup
      .string()
      .required('Thong tin bat buoc nhap')
      .max(50, 'Ten phim khong qua 50 ki tu'),
    biDanh: yup
      .string()
      .required('Thong tin bat buoc nhap')
      .min(5, 'bi danhphai hon 5 ki tu'),
    trailer: yup
      .string()
      .required('Trailer bat buoc nhap')
      .url('Trailer phai la link hop le'),
    moTa: yup.string().required('Mo ta bat buoc nhap'),
  });

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      biDanh: '',
      trailer: '',
      hinhAnh: '',
      moTa: '',
      maNhom: 'GP01',
      ngayKhoiChieu: new Date(),
      danhGia: 0,
    },
    validationSchema: movieSchema,
    validateOnMount: true,
  });

  const pickImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Lấy đường dẫn path ảnh trong điện thoại
        const uploadUri =
          Platform.OS === 'ios'
            ? response.uri.replace('file://', '')
            : 'file://' + response.path;
        const sourceImg = {
          uri: uploadUri,
          name: 'img.jpg',
          type: 'img/jpg',
        };

        // Nếu muốn gửi file lên server thông qua axios thì phải tạo 1 form data
        const data = new FormData();
        data.append('file', sourceImg);
        data.append('upload_preset', 'vule123');

        // Call Axios, data chính là data đã tạo ra từ formData ở trên
        // Axios({
        //   method: 'POST',
        //   url: 'https://api.cloudinary.com/v1_1/vule123/image/upload',
        //   data: data,
        // })
        //   .then((res) => {
        //     formik.setFieldValue('hinhAnh', res.data.url);
        //   })
        //   .catch((err) => console.log('err anh', {...err}));
      }
    });
  };
  const handleSubmit = () => {
    if (!_.isEmpty(formik.errors)) {
      return;
    }

    const body = {...formik.values};

    //format lại định dạng ngày khởi chiếu thành DD-MM-YYYY
    // body.ngayKhoiChieu = `${releaseDate.getDate()}-${
    //   releaseDate.getMonth() + 1
    // }-${releaseDate.getFullYear()}`;
    body.ngayKhoiChieu = moment(body.ngayKhoiChieu).format('DD/MM/YYYY');
    body.hinhAnh =
      'https://lh3.googleusercontent.com/proxy/FaCpogZop2iCrbQu3fU_k1SKDUqdmePYgiY2edNYRYF1dz7ycPGIPO0d7QLZEQPH3TnGlKFjfnc_-tkxNA_XpU77sBAp63ZSurl-lw2NR3f2';

    Axios({
      method: 'POST',
      url: 'http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim',
      data: body,
      headers: {
        Authorization: `Bearer ${userInfo?.accssToken}`,
      },
    })
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', {...err}));
  };

  return (
    <ImageBackground source={Bg} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.form}>
            <TextInput
              onBlur={formik.handleBlur('tenPhim')} // kiểm tra đã click vào hay chưa
              style={styles.formControl}
              placeholder="Tên phim"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              onChangeText={formik.handleChange('tenPhim')}
            />
            <ErrorText
              touched={formik.touched.tenPhim}
              error={formik.errors.tenPhim}
            />

            <TextInput
              onBlur={formik.handleBlur('biDanh')} // kiểm tra đã click vào hay chưa
              style={styles.formControl}
              placeholder="Bí danh"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyLabel="Submit"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={formik.handleChange('biDanh')}
            />
            <ErrorText
              touched={formik.touched.biDanh}
              error={formik.errors.biDanh}
            />

            <TextInput
              onBlur={formik.handleBlur('trailer')} // kiểm tra đã click vào hay chưa
              style={styles.formControl}
              placeholder="Trailer"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyLabel="Submit"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={formik.handleChange('trailer')}
            />
            <ErrorText
              touched={formik.touched.trailer}
              error={formik.errors.trailer}
            />

            <View>
              <Button
                title="Pick image"
                type="solid"
                buttonStyle={styles.imgBtn}
                onPress={pickImage}
              />
            </View>

            <TextInput
              onBlur={formik.handleBlur('moTa')} // kiểm tra đã click vào hay chưa
              style={styles.formControl}
              placeholder="Mô tả"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyLabel="Submit"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={formik.handleChange('moTa')}
            />
            <ErrorText
              touched={formik.touched.moTa}
              error={formik.errors.moTa}
            />

            <DatePicker
              style={{width: '100%', marginBottom: 20}}
              date={new Date(formik.values.ngayKhoiChieu)}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  width: '100%',
                  alignItems: 'flex-start',
                  borderRadius: 5,
                },
                dateText: {
                  color: '#fff',
                  fontSize: 18,
                  marginLeft: 20,
                },
              }}
              onChangeText={formik.handleChange('ngayKhoiChieu')}
            />

            <TextInput
              onBlur={formik.handleBlur('danhGia')} // kiểm tra đã click vào hay chưa
              style={styles.formControl}
              placeholder="Đánh giá"
              placeholderTextColor="#fff"
              keyboardType="number-pad"
              returnKeyLabel="Submit"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={formik.handleChange('danhGia')}
            />
            <ErrorText
              touched={formik.touched.danhGia}
              error={formik.errors.danhGia}
            />

            <Button
              title="THÊM PHIM"
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

  content: {
    width: '90%',
  },

  logo: {
    height: 200,
  },

  imgBtn: {
    marginBottom: '4%',
    height: 50,
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

  errorText: {
    color: 'red',
  },
});

export default CreateMovieScreen;
