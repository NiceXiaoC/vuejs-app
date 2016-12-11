<template>
	<div class="goods">
		<div class="menu-wrapper" v-el:menu-wrapper>
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
						<span :class="classMap[item.type]">{{item.name}}</span>
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" v-el:foods-wrapper>
			<ul>
				<li v-for="item in goods" class="goods-lists foods-hook" >
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img :src="food.icon" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}</span>
									<span>好评{{food.sellCount}}</span>
								</div>
								<div class="price">
									<span>￥{{food.price}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	const ERR_ok = 0;
	import BSscroll from 'better-scroll';
	console.log(BSscroll);
	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: []
			}
		},
		created() {
			this.classMap = ["decrease","discount","guarantee","invoice","special"];
			this.$http.get('/api/goods').then((response)=>{
				response = response.body;
				if(response.errno===ERR_ok){
					this.goods = response.data;
					console.log(this.goods);
					this.$nextTick(()=>{
						this.initScroll();
						this.calcelateHeight();
					})
				}
			})
		},
		methods: {
			initScroll() {
				this.menuScroll = new BSscroll(this.$els.menuWrapper,{
					
				});
				this.foodsScroll = new BSscroll(this.$els.foodsWrapper,{
						
				});
			},
			calcelateHeight() {//
				//var foodList = this.$els.foodsWrapper.getElementsByClassName("foods-hook")
			}
		}
	}
</script>
<style lang="less">
	.goods{
		position: absolute;
		top: 174px;
		bottom:46px;
		display: flex;
		width: 100%;
		overflow: hidden;		
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu-item{
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				padding:0 12px;
				.icon{
						display: inline-block;
						vertical-align: top;
						width:12px;
						height:12px;
						margin-right:2px;
						background-size:12px 12px ;
						background-repeat: no-repeat;
						&.decrease{
							background-image: url("decrease_3@3x.png");
						}
						&.discount{
							background-image: url("discount_3@2x.png");
						}
						&.guarantee{
							background-image: url("guarantee_3@2x.png");
						}
						&.invoice{
							background-image: url("invoice_3@2x.png");
						}
						&.special{
							background-image: url("special_3@2x.png");
						}
					}
					.text{
						font-size: 12px;
						display: table-cell;
						width: 56px;
						vertical-align: middle;
						border-bottom:1px solid rgba(7,17,27,0.2)
					}
				}
			}
		}
		.foods-wrapper{
			flex: 1;
			.title{
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #dddd9e;
				font-size: 12px;
				color:rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item{
				display: flex;
				margin: 18px;
			}
		}
</style>