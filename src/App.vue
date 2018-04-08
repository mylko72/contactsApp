<template>
  <div id="container">
      <div class="page-header">
         <h1 class="text-center">연락처 관리 애플리케이션</h1>
         <p>(Dynamic Component + EventBus + Axios) </p>
      </div>
      <component :is="currentView" :contact="contact"></component>
      <contactList :contactlist="contactlist"></contactList>
      <paginate ref="pagebuttons"
        :page-count="totalpage"
        :page-range="7"
        :margin-pages="3"
        :click-handler="pageChanged"
        :prev-text="'이전'"
        :next-text="'다음'"
        :container-class="'pagination'"
        :page-class="'page-item'">
      </paginate>
  </div>
</template>

<script>
import Vue from 'vue';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import UpdateContact from './components/UpdateContact';
import UpdatePhoto from './components/UpdatePhoto';
import CONF from './Config.js';
import eventBus from './EventBus.js';
import Paginate from 'vuejs-paginate';

export default {
  name: 'App',
  components : { ContactList, AddContact, UpdateContact, UpdatePhoto, Paginate },
  data: function() {
      return {
          currentView : null,
          //mode : 'add',
          contact : { no:0, name:'', tel:'', address:'', photo:'' },
          contactlist : {
              pageno:1, pagesize: CONF.PAGESIZE, totalcount:0, contacts:[]
          }
      }
  },
  computed : {
      // 총페이지 : 전체 연락처 건수를 페이지 사이즈로 나누어 계산.
      totalpage : function() {
          return Math.floor((this.contactlist.totalcount - 1) / this.contactlist.pagesize) + 1;
      }
  },
  mounted : function() {
      this.fetchContacts();
      // 모든 입력폼에서 취소 버튼을 클릭했을 때 발생하는 이벤트.
      eventBus.$on("cancel", () => {
          this.currentView = null;
      });
      // 연락처가 추가되는 이벤트. 연락처가 추가되면 입력폼은 사라져야 하므로 currentView를 null로 설정.
      eventBus.$on("addSubmit", (contact) => {
          this.currentView = null;
          this.addContact(contact);
      });
      // 연락처가 수정되는 이벤트. 연락처가 수정되면 입력폼은 사라져야 하므로 currentView를 null로 설정.
      eventBus.$on("updateSubmit", (contact) => {
          this.currentView = null;
          this.updateContact(contact);
      });
      // 연락처 추가 폼이 나타날 수 있도록 currentView를 변경함.
      eventBus.$on("addContactForm", () => {
          this.currentView = 'addContact';
      });
      // 수정폼에 기존 연락처 데이터가 나타날 수 있도록 no 인자를 이용해 fetchContactOne 메서드를 호출.
      // 연락처 수정 폼이 나타날 수 있도록 currentView를를 변경함.
      eventBus.$on("editContactForm", (no) => {
          this.fetchContactOne(no)
          this.currentView = 'updateContact';
      });
      // 연락처 한건 삭제.
      eventBus.$on("deleteContact", (no) => {
          this.deleteContact(no);
      });
      // 사진 변경을 위한 폼이 나타날 수 있도록 currentView를 변경함.
      eventBus.$on("editPhoto", (no) => {
          this.fetchContactOne(no)
          this.currentView = 'updatePhoto';
      });
      // 사진 파일이 존재하면 updatePhoto 메서드 호출.
      eventBus.$on("updatePhoto", (no, file) => {
          if (typeof file !=='undefined') {
              this.updatePhoto(no, file);
          }
          this.currentView = null;
      });
  },
  methods : {
      // 보여줄 페이지를 변경함. Paginate 컴포넌트에서 이 함수를 바인딩.
      pageChanged : function(page) {
          this.contactlist.pageno = page;
          this.fetchContacts();
      },
      // 전체 연락처 데이터를 페이징하여 조회함.
      fetchContacts : function() {
          this.$axios.get(CONF.FETCH, {
              params : {
                  pageno:this.contactlist.pageno,
                  pagesize:this.contactlist.pagesize
              }
          })
          .then((response) => {
              this.contactlist = response.data;
          })
          .catch((ex)=> {
              console.log('fetchContacts failed', ex);
              this.contactlist.contacts = [];
          })
      },
      // 연락처 한건을 추가함.
      addContact : function(contact) {
          this.$axios.post(CONF.ADD,  contact)
          .then((response) => {
              this.contactlist.pageno = 1;
              this.fetchContacts();
          })
          .catch((ex)=> {
              console.log('addContact failed : ', ex);
          })
      },
      // 연락처 한건을 수정함.
      updateContact : function(contact) {
          this.$axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
          .then((response) => {
              this.fetchContacts();
          })
          .catch((ex) => {
              console.log('updateContact failed : ', ex);
          })
      },
      // 특정 연락처 한 건을 조회함.
      fetchContactOne : function(no) {
          this.$axios.get(CONF.FETCH_ONE.replace("${no}", no))
          .then((response) => {
              this.contact = response.data;
          })
          .catch((ex)=> {
              console.log('fetchContactOne failed', ex);
          })
      },
      // 연락처 한건을 삭제함.
      deleteContact : function(no) {
          this.$axios.delete(CONF.DELETE.replace("${no}", no))
          .then((response) => {
              this.fetchContacts();
          })
          .catch((ex) => {
              console.log('delete failed', ex);
          })
      },
      // 사진 파일을 변경함.
      updatePhoto : function(no, file) {
          var data = new FormData();
          data.append('photo', file);
          this.$axios.post(CONF.UPDATE_PHOTO.replace("${no}", no), data)
          .then((response) => {
              this.fetchContacts();
          })
          .catch((ex) => {
              console.log('updatePhoto failed', ex);
          });
      }
  },
  watch : {
      // 새로운 연락처를 추가하면 추가한 연락처를 확인할 수 있도록 첫번째 페이지로 이동
      ['contactlist.pageno'] : function() {
          this.$refs.pagebuttons.selected = this.contactlist.pageno-1;
      }
  },
}
</script>

<style scoped>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
