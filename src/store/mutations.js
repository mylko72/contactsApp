import Constant from '../constant'

// 상태를 변경하는 작업 등록
export default {
  // 연락처 조회를 위한 상태 변경
  // 두번째 인자인 payload를 통해 변경하려는 상태 정보를 전달받아 상태를 변경
  [Constant.FETCH_CONTACTS] : (state, payload) => {
      state.contactlist = payload.contactlist;
  },
  [Constant.FETCH_CONTACT_ONE] : (state, payload) => {
      state.contact = payload.contact;
  },
  [Constant.INITIALIZE_CONTACT_ONE] : (state) => {
      state.contact = { no:'', name:'', tel:'', address:'', photo:'' };
  },
  [Constant.CHANGE_ISLOADING] : (state, payload) => {
      state.isloading = payload.isloading;
  }
}
