<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name" v-text="seller.name"></span>
				</div>
				<div class="description">
					<span v-text="seller.description"></span>/<span v-text="seller.deliveryTime"></span>分钟送达
				</div>
				<div v-if='seller.supports' class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text" v-text="seller.supports[0].description"></span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%"/>
		</div>
	
		<div class="detail" v-show="detailShow">
			<div class="detail-wrap clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrap">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					
					<ul v-if="seller.supports" class="supports">
						<li class="support-item" v-for="item in seller.supports">
							<span class="icon" :class="classMap[seller.supports[$index].type]"></span>
							<span class="text">{{seller.supports[$index].description}}</span>
						</li>
					</ul>
					
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>
					
				</div>
			</div>
			<div class="detail-close" @click="hideDetail">
				<i class="icon-close"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import "./../../common/style/mediaStyle";
	import "./../../common/style/icon.css";
	import star from "./../star/star.vue";
	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				detailShow : false
			}
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			hideDetail() {
				this.detailShow = false;
			}
		},
		created() {
			this.classMap = ["decrease","discount","guarantee","invoice","special"]
		},
		components: {
			star
		}
	}
</script>
<style>
	.header{
		color:#fff;
		background: rgba(7,17,25,0.5);
		position: relative;
		overflow: hidden;
	}
	.content-wrapper{
		padding:24px 12px 18px 24px;
		font-size:0;
		position: relative;
	}
	.content-wrapper .avatar,.content-wrapper .content{
		display: inline-block;
		font-size:14px;
	}
	.content-wrapper .content{
		margin-left:16px;
	}
	.title{
		margin:2px 0 8px 0;
	}
	.title .brand{
		width:30px;height:18px;display: inline-block;
		background-image: url(brand@2x.png);
		background-repeat: no-repeat;
		background-size:30px 18px;
	}
	.title .name{
		margin-left:6px;font-size: 16px;
		line-height: 18px;font-weight: bold;
	}
	.avatar img{
		border-radius:3px;
	}
	.supports{font-size:0;}
	.supports .icon{
		display: inline-block;
		vertical-align: top;
		width:12px;
		height:12px;
		margin-right:4px;
		background-size:12px 12px ;
		background-repeat: no-repeat;
	}
	.supports .icon.decrease{
		background-image: url("decrease_1@2x.png");
	}
	.supports .icon.discount{
		background-image: url("discount_1@2x.png");
	}
	.supports .icon.guarantee{
		background-image: url("guarantee_1@2x.png");
	}
	.supports .icon.invoice{
		background-image: url("invoice_1@2x.png");
	}
	.supports .icon.special{
		background-image: url("special_1@2x.png");
	}
	.supports .text{line-height:12px;font-size:12px;}
	.support-count{
		position: absolute;
		right:12px;bottom:18px;padding:0 8px;height:24px;line-height:24px;
		border-radius: 14px;background:rgba(0,0,0,0.2);
		text-align: center;
		font-size:0;
	}
	.support-count .count{
		font-size:10px;
	}
	.support-count .icon-keyboard_arrow_right{
		font-size:12px;
		position: relative;
    	top:2px;
	}
	
	.bulletin-wrapper{
		height: 28px;line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		background: rgba(0,0,0,0.2);
	}
	.bulletin-wrapper .bulletin-title{
		display: inline-block;width: 22px;height: 12px;
		background-image: url(bulletin@2x.png);
		background-size: 22px 12px;
		background-repeat: no-repeat;
		vertical-align: middle;
	}
	.bulletin-wrapper .bulletin-text{
		font-size:10px;
	}
	.bulletin-wrapper .icon-keyboard_arrow_right{
		font-size:12px;
		position: absolute;
    	top:10px;
    	right:10px;
	}
	.background{
		position: absolute;
		top: 0;left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	
	.detail{
		position: fixed;
		top: 0;left: 0;
		z-index: 100;
		width: 100%;height: 100%;
		overflow: hidden;
		background: rgba(7,17,27,0.8);
		backdrop-filter:blur(10px);
	}
	.detail .detail-wrap{
		min-height: 100%;
		width: 100%;
	}
	.detail .detail-main{
		margin-top: 64px;
		padding-bottom: 64px;
	}
	.detail .detail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;
		clear: both;
		font-size: 32px;	
	}
	.detail .detail-main .name{
		line-height: 16px;
		text-align: center;
		font-size: 16px;
		font-weight: 700;
	}
	.detail .star-wrap{
		margin-top:18px;padding:2px 0;text-align: center;
	}
	.detail .title{
		display: flex;
		width: 80%;margin: 30px auto 24px auto;
	}
	.detail .title .line{
		flex: 1;
		top:-8px;
		position: relative;
		border-bottom: 1px solid rgba(255,255,255,0.3);
	}
	.detail .title .text{
		padding: 0 12px;
		font-size: 14px;
		font-weight: 700;
		font-size: 18px;
	}
	.detail .supports{
		width: 80%;margin: 0 auto;
	}
	.detail .supports .support-item{
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	.detail .supports .support-item:last-child{
		margin-bottom: 0;
	}
	.detail .supports .support-item .icon{
		display: inline-block;
		width: 16px; height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
	}
	.detail .supports .support-item .icon.decrease{
		background-image: url(decrease_1@2x.png);
	}
	.detail .supports .support-item .icon.decrease{
		background-image: url(decrease_1@2x.png);
	}
	.detail .supports .support-item .icon.decrease{
		background-image: url(decrease_1@2x.png);
	}
	.detail .supports .support-item .icon.decrease{
		background-image: url(decrease_1@2x.png);
	}
	.detail .supports .support-item .icon.decrease{
		background-image: url("decrease_1@2x.png");
	}
	.detail .supports .support-item .icon.discount{
		background-image: url("discount_1@2x.png");
	}
	.detail .supports .support-item .icon.guarantee{
		background-image: url("guarantee_1@2x.png");
	}
	.detail .supports .support-item .icon.invoice{
		background-image: url("invoice_1@2x.png");
	}
	.detail .supports .support-item .icon.special{
		background-image: url("special_1@2x.png");
	}
	.detail .supports .support-item .text{
		font-size:12px;line-height: 16px;
	}
	.detail .bulletin{
		width: 80%;margin: 0 auto;
	}
	.bulletin .content{
		padding: 0 12px;
		line-height: 24px;
		font-size:12px;
	}
</style>