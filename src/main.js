import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import "./common/style/base";

Vue.use(VueRouter); // 注册路由
Vue.use(VueResource); // 注册交互

const app = Vue.extend(App);
const router = new VueRouter({
	linkActiveClass:'active'
});
router.map({
	'/goods' : {
		component:goods
	},
	'/ratings' : {
		component:ratings
	},
	'/seller' : {
		component:seller
	}
})
router.go('/goods');
router.start(app,'#app');
