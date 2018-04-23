import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';
import ES6Promise from 'es6-promise';

ES6Promise.polyfill();
Vue.use(Vuex);

// 상태, 변이, 액션을 이용하여 저장소 객체 생성
const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store;
