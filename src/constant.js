// 상태를 변경하는 작업(변이)과 액션을 등록
export default {
  FETCH_CONTACTS : "fetchContacts",       //연락처 조회
  ADD_CONTACT : "addContact",             //연락처 추가
  UPDATE_CONTACT : "updateContact",       //연락처 수정
  UPDATE_PHOTO : "updatePhoto",           //사진 수정
  DELETE_CONTACT : "deleteContact",       //연락처 삭제
  FETCH_CONTACT_ONE : "fetchContactOne",
  INITIALIZE_CONTACT_ONE : "initializeContactOne"
}
