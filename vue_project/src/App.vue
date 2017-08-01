<template>
	<div id="app">
		<view-box>
			<x-header 
				class="header"
				slot="header"
				:left-options="{showBack:false}"
				title="网易"
			>
				<div slot="left">直播</div>
				<div>网易</div>
				<div slot="right">搜索</div>
			</x-header>
			
			<sc
				:lock-y="true"
			>
				<div class="tab">
					<tab>
						<tab-item selected>推荐</tab-item>
						<tab-item>要闻</tab-item>
						<tab-item>娱乐</tab-item>
						<tab-item>体育</tab-item>
						<tab-item>数码</tab-item>
						<tab-item>互联网</tab-item>
					</tab>
				</div>
			</sc>

			<scroller 
				class="my-scroller"
				:on-refresh="refresh"
				:on-infinite="infinite"
			>
				<swiper
					:list="swiperList"
					v-model="swiperIndex"
					:loop="true"
				></swiper>

				<marquee class="marquee">
					<marquee-item v-for="list in marqueeList">{{list.title}}</marquee-item>
				</marquee>


				<panel
					:list="dataList"
				></panel>
			</scroller>

			

			<tabbar slot="bottom">
				<tabbar-item>
					<img src="./assets/home2.png" slot="icon">
					<span slot="label">首页</span>
				</tabbar-item>
				<tabbar-item>
					<img src="./assets/live1.png" slot="icon">
					<span slot="label">直播</span>
				</tabbar-item>
				<tabbar-item>
					<img src="./assets/recommend1.png" slot="icon">
					<span slot="label">推荐</span>
				</tabbar-item>
				<tabbar-item>
					<img src="./assets/me1.png" slot="icon">
					<span slot="label">我的</span>
				</tabbar-item>
			</tabbar>
		</view-box>
	    <router-view></router-view>
  	</div>
</template>


<script>
	import {ViewBox,XHeader,Tabbar,TabbarItem,Tab,TabItem,Scroller as sc,Swiper,Marquee,MarqueeItem,Panel} from 'vux'

	var refreshKey = ['A','B01','B02','B03','B04','B05','B06','B07','B08','B09','B010'];
	var key = 0;

	function getRefreshKey(){
		var keyValue = refreshKey[key];
		key++;
		if(key == refreshKey){
			key = 0;
		}
		return keyValue;
	}
	export default{
		name:'app',
		components:{
			ViewBox,
			XHeader,
			Tabbar,
			TabbarItem,
			Tab,
			TabItem,
			sc,
			Swiper,
			Marquee,
			MarqueeItem,
			Panel
		},
		created(){
			this.$jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then(data => {



				//首屏轮播图
				this.swiperList = data.focus.filter(item => {
					return item.addata === null;
				}).map(item => {
					return {
						url:item.link,
						img:item.picInfo[0].url,
						title:item.title
					}
				})

				//滚动新闻
				
				this.marqueeList = data.live.filter(item => {
					return item.addata === null;
				}).map(item => {
					return {
						title:item.title
					}
				})

				//新闻列表
				this.dataList = data.list.filter(item => {
					return item.addata === null;
				}).map(item => {
					return {
						src:item.picInfo[0].url,
						title:item.title,
						desc:item.digest,
						url:item.link
					}
				})
			})

		},
		data(){
			// var dataList = [];
			// for (var i = 0; i < 10; i++) {
			// 	dataList.push({
			// 	        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
			// 	        title: '标题一',
			// 	        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
			// 	        url: '/component/cell'
   //    				})
			// }
			return {
				swiperList:[],
				swiperIndex:0,
				marqueeList:[],
				dataList:[]
			}
		},
		methods: {
			refresh(){
				this.$jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html',{
					miss:'00',
					refresh:getRefreshKey()
				}).then(data => {

					// console.log(data)
					this.dataList = data.list.filter(item => {
						return item.addata === null;
							}).map(item => {
								return {
											src:item.picInfo[0].url,
											title:item.title,
											desc:item.digest,
											url:item.link
										}
								})
				})
			},
			infinite(){
				console.log(2)
			}
		}
	}
</script>

<style lang="less">
	
	@import '~vux/src/styles/reset.less';

	html,body{
		margin:0;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}

	#app{
		height: 100%;

		.header{
			position:absolute;
			left:0;
			top:0;
			z-index:9;
			width:100%;
		}

		.tab{
			margin-top:46px;
			width:1200px;
		}

		.my-scroller{
			top:90px;
		}

		.loading-layer{
			padding-bottom:90px;
		}

		.marquee{
			margin:10px;
		}
		.weui-media-box__hd , .weui-media-box__hd img{
			width:102px;
			height:68px;
		}
		.weui-media-box__bd{
			height:68px;
		}
	}
</style>
