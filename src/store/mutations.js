import Constant from '../constant'

// 상태를 변경하는 작업 등록
export default {
  // 연락처 등록을 위한 상태 변경
  [Constant.ADD_CONTACT_FORM] : (state) => {
      state.contact = { no:'', name:'', tel:'', address:'', photo:'' };
      state.mode = "add";
      state.currentView = "contactForm";
  },
  // 연락처 취소를 위한 상태 변경
  [Constant.CANCEL_FORM] : (state) => {
      state.currentView = null;
  },
  // 연락처 수정을 위한 상태 변경
  // 두번째 인자인 payload를 통해 변경하려는 상태 정보를 전달받아 상태를 변경
  [Constant.EDIT_CONTACT_FORM] : (state, payload) => {
      state.contact = payload.contact;
      state.mode = "update";
      state.currentView = "contactForm";
  },
  // 사진 수정을 위한 상태 변경
  // 두번째 인자인 payload를 통해 변경하려는 상태 정보를 전달받아 상태를 변경
  [Constant.EDIT_PHOTO_FORM] : (state, payload) => {
      state.contact = payload.contact;
      state.currentView = "updatePhoto";
  },
  // 연락처 조회를 위한 상태 변경
  // 두번째 인자인 payload를 통해 변경하려는 상태 정보를 전달받아 상태를 변경
  [Constant.FETCH_CONTACTS] : (state, payload) => {
      state.contactlist = payload.contactlist;
  }
}
