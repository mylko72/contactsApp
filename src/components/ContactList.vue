<template>
    <div>
    <p class="addnew">
        <button class="btn btn-primary" @click="addContact()">
            새로운 연락처 추가하기</button>
    </p>
    <div id="example">
    <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>이름</th><th>전화번호</th><th>주소</th>
                <th>사진</th><th>편집/삭제</th>
            </tr>
        </thead>
        <tbody id="contacts" >
            <tr v-for="contact in contactlist.contacts">
                <td>{{contact.name}}</td>
                <td>{{contact.tel}}</td>
                <td>{{contact.address}}</td>
                <td><img class="thumbnail" :src="contact.photo"
                    @click="editPhoto(contact.no)" /></td>
                <td>
                    <button class="btn btn-primary"
                        @click="editContact(contact.no)">편집</button>
                    <button class="btn btn-primary"
                        @click="deleteContact(contact.no)">삭제</button>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
</template>

<script>
import Constant from '../constant';
import { mapState } from 'vuex';

export default {
    name : 'contactList',
    // props를 통해서 데이터를 전달받는 것이 아니라 Vuex의 상태 데이터를 계산형 속성으로 바인딩한다.
    computed : mapState([ 'contactlist' ]),
    // 컴포넌트 UI에서 이벤트가 발생할 때 저장소의 액션을 호출
    methods : {
        // '새 연락처 추가' 버튼을 클릭했을 때 입력폼을 나타내기 위해 저장소의 액션 호출
        addContact : function() {
          this.$store.dispatch(Constant.ADD_CONTACT_FORM);
        },
        // 편집 버튼을 누른 연락처의 no 필드값을 인자로 전달하여 수정 폼을 나타내기 위해 저장소의 액션 호출
        editContact : function(no) {
          this.$store.dispatch(Constant.EDIT_CONTACT_FORM, {no:no});
        },
        // 삭제 버튼 클릭시 no 필드값을 인자로 삭제를 실행하기 위해 저장소의 액션 호출
        deleteContact : function(no) {
          if (confirm("정말로 삭제하시겠습니까?") == true) {
            this.$store.dispatch(Constant.DELETE_CONTACT, {no:no});
          }
        },
        // 사진을 클릭했을 때 no 필드값을 전달하여 사진 변경 폼을 나타내기 위해 저장소의 액션 호출
        editPhoto : function(no) {
          this.$store.dispatch(Constant.EDIT_PHOTO_FORM, {no:no});
        }
    }
}
</script>

<style scoped>
.addnew { margin:10px auto; max-width: 820px;  min-width: 820px;
    padding:40px 0px 0px 0px; text-align: left; }
#example { margin:10px auto; max-width: 820px; min-width: 820px;
    padding:0px; position:relative; font: 13px "verdana"; }
#example .long{ width: 100%; }
#example .short{ width: 50%; }
#example input, textarea, select{ box-sizing: border-box;
    border:1px solid #BEBEBE; padding: 7px; margin:0px;
    outline: none;  }
#list  { width: 800px; font: 13px "verdana";  }
#list thead tr { color:yellow; background-color: purple; }
#list th:nth-child(5n+1), #list td:nth-child(5n+1) { width:200px; }
#list th:nth-child(5n+2), #list td:nth-child(5n+2) { width:150px; }
#list th:nth-child(5n+3), #list td:nth-child(5n+3) { width:250px; }
#list th:nth-child(5n+4), #list td:nth-child(5n+4) { width:60px; }
#list th:nth-child(5n), #list td:nth-child(5n) { width:150px; }
#list th { padding:10px 5px 10px 5px; }
#list tr { border-bottom: solid 1px black; }
#list td, #list th {  text-align:center; vertical-align:middle; }
img.thumbnail { width:48px; height: 48px; margin-top: auto;
    margin-bottom: auto; display: block; cursor:pointer; }
</style>
