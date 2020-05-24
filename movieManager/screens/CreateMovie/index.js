import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-elements';
import Bg from '../../assets/images/background.jpg';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import {useFormik} from 'formik';
import ImagePicker from 'react-native-image-picker';
import * as yup from 'yup';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const CreateMovieScreen = () => {
  const [avatarSource, setavatarSource] = useState();
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
  });

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      biDanh: '',
      trailer: '',
      hinhAnh: '',
      moTa: '',
      maNhom: 'GP01',
      ngayKhoiChieu: 'null',
      danhGia: 0,
    },
    validationSchema: movieSchema,
    validateOnMount: true,
  });

  const pickImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setavatarSource(source);
      }
    });
  };
  const handleSubmit = () => {
    console.log('formik', formik.values);
    console.log('err', formik.errors);
  };

  return (
    <ImageBackground source={Bg} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.form}>
            <TextInput
              style={styles.formControl}
              placeholder="Tên phim"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              onChangeText={formik.handleChange('tenPhim')}
            />

            <TextInput
              style={styles.formControl}
              placeholder="Bí danh"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyLabel="Submit"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={formik.handleChange('biDanh')}
            />

            <TextInput
              style={styles.formControl}
              placeholder="Trailer"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyLabel="Submit"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={formik.handleChange('trailer')}
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
              style={styles.formControl}
              placeholder="Mô tả"
              placeholderTextColor="#fff"
              keyboardType="default"
              returnKeyLabel="Submit"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={formik.handleChange('moTa')}
            />

            <DatePicker
              style={{width: '100%', marginBottom: 20}}
              date={new Date()}
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
              style={styles.formControl}
              placeholder="Đánh giá"
              placeholderTextColor="#fff"
              keyboardType="number-pad"
              returnKeyLabel="Submit"
              autoCapitalize="none" // tắt tự động viết hoa chữ cái đầu input
              returnKeyType="done"
              onChangeText={formik.handleChange('danhGia')}
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
});

export default CreateMovieScreen;
