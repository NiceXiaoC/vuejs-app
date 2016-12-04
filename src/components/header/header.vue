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
					<span class="icon"></span>
					<span class="text" v-text="seller.supports[0].description"></span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper"></div>
	</div>
</template>
<script>
	export default{
		props:{
			seller:{
				type:Object
			}
		}
	}
</script>
<style>
	.header{
		color:#fff;
		background: #7E8C8D;
	}
	.content-wrapper{
		padding:24px 12px 18px 24px;
		font-size:0;
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
		background-image: url(./brand@2x.png);
		background-repeat: no-repeat;
		background-size:30px 18px;
	}
	.title .name{
		margin-left:6px;font-size: 16px;
		line-height: 18px;font-weight: bold;
	}
	@import url("./../../common/style/mediaStyle.css");
</style>