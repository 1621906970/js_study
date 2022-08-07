<template>
	<view class="goods-item">
		<!-- 左侧图片盒 -->
		<view class="goods-left">
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		
		<!-- 右侧文字盒 -->
		<view class="goods-right">
			<view class="goods-name">
				{{goods.goods_name}}
			</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{goods.goods_price | tofixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				defaultPic:'https://img1.baidu.com/it/u=1841333429,3927409117&fm=253&fmt=auto&app=138&f=JPEG?w=610&h=500'
			};
		},
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-left{
		margin-right: 6px;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
			
		}
	}
	
	.goods-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
			
		}
		
		.goods-info-box{
			
			.goods-price{
				color: #C00000;
				font-size: 16px;
				
			}
		}
	}
}
</style>