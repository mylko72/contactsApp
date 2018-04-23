import CONF from '../Config.js';
import axios from 'axios';

// axios를 이동한 통신 기능
export default {
    // 연락처 조회
    fetchContacts : function(pageno, pagesize) {
        return axios.get(CONF.FETCH, {
            params : {
                pageno: pageno,
                pagesize: pagesize
            }
        })
    },
    // 연락처 한건 조회
    fetchContactOne : function(no) {
        return axios.get(CONF.FETCH_ONE.replace("${no}", no))
    },
    // 연락처 추가
    addContact : function(contact) {
        return axios.post(CONF.ADD,  contact);
    },
    // 연락처 수정
    updateContact : function(contact) {
        return axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
    },
    // 연락처 삭제
    deleteContact : function(no) {
        return axios.delete(CONF.DELETE.replace("${no}", no))
    },
    // 사진 수정
    updatePhoto : function(no, file) {
        var data = new FormData();
        data.append('photo', file);

        return axios.post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
    }
}
