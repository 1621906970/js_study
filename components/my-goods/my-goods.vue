<template>
	<view class="goods-item">
		<!-- 左侧图片盒 -->
		<view class="goods-left">
			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
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
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" color="black" background="#bfa" @change = "numChangeHandler"></uni-number-box>
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
		methods:{
			//radio组件的点击事件处理
			radioClickHandler(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
					
				})
			},
			numChangeHandler(val){
				//监听到numberbox组件数量变化
				// console.log(val)
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:val - 0
				})
			}
			
		},
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false//默认不展示radio勾选组件
			},
			showNum:{
				type:Boolean,
				default:false
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
	width: 750rpx;
	box-sizing: border-box;
	.goods-left{
		margin-right: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
			
		}
	}
	
	.goods-right{
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
			
		}
		
		.goods-info-box{
			display: flex;
			justify-content: center;
			align-items: center;
			.goods-price{
				color: #C00000;
				font-size: 16px;
				
			}
		}
	}
}
</style>