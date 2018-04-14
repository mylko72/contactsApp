import axios from 'axios';
import Constant from '../constant';

export default {
  searchContact : (name) => {
    return axios.get(Constant.BASE_URL + name);   // axios를 호출하여 리턴된 Promise 객체를 그대로 리턴
  }
}
