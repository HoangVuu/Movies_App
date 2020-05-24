import {SET_MOVIES} from '../../redux/actions/type';
import Axios from 'axios';

export const createAction = (type, payload) => ({
  type,
  payload,
});

//async action
export const fetchMovies = () => (dispatch) => {
  Axios({
    url:
      'http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
    method: 'GET',
  })
    .then((res) => {
      console.log('res.data', res.data);
      dispatch(createAction(SET_MOVIES, res.data));
    })
    .catch((err) => {
      console.log(err);
    });
}