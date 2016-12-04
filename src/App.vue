<template>
  <div id="app">
  	<!--header start-->
  	<my-header :seller="seller"></my-header>
  	<!--nav start-->
  	<div class="tab border-1px">
  		<div class="tab-item">
  			<a v-link="{path:'/goods'}">商品</a>
  		</div>
  		<div class="tab-item">
  			<a v-link="{path:'/ratings'}">评论</a>
  		</div>
  		<div class="tab-item">
  			<a v-link="{path:'/seller'}">商家</a>
  		</div>
  	</div>
  	<!--content start-->
  	<router-view></router-view>
   </div>
</template>

<script>
	import header from './components/header/header.vue'
	
	const ERR_ok = 0;
	
	export default{
		data: function() {
			return {
				seller:{}
			}
		},
		created:function(){ //
			this.$http.get('/api/seller').then((response) =>{
				response = response.body;
				if(response.errno===ERR_ok){
					this.seller = response.data;
					console.log(this.seller);
				}
			});
		},
		components: {
			'my-header': header
		}
	}
	
</script>

<style>

.tab{
	display: flex;
	width:100%;
	height:40px;
	line-height: 40px;
	/*border-bottom: 1px solid rgba(7,17,27,0.1);*/
	position: relative;
}
/*一像素边框*/
.tab:after{
	content:"";width:100%;
	position: absolute;bottom:0;left:0;
	display: block;
	border-bottom:1px solid rgba(7,17,27,0.1);
}

.tab .tab-item{
	flex: 1;
	text-align: center;
}
.tab .tab-item a{
	display: block;
	font-size:14px;
	color:rgba(77,85,93,1);
}
.tab .tab-item a.active{
	color:rgb(240,20,20);
}


</style>
