import Vue from 'vue'
import App from './App'

import router from '@/route/index'

import VueJsonp from 'vue-jsonp';
import VueScroller from 'vue-scroller';

Vue.use(VueJsonp);
Vue.use(VueScroller);

new Vue({
	el:'#app',
	router:router,
	template:'<App/>',
	components:{App}
})