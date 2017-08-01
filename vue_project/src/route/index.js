import Vue from 'vue'
import VueRoute from 'vue-router'

Vue.use(VueRoute)

import Home from '@/components/home'


let router = new VueRoute({
	routes:[
		{
			path:'/',component:Home
		}
	]
})

export default router