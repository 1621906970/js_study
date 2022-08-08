<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		
		<!-- 合计区域 -->
		<view class="amount-box">
			合计: <text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">
			结算（{{checkedCount}}）
		</view>
	
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				//倒计时默认秒数
				seconds:3,
				
				timer:null
			};
		},
		computed:{
			...mapGetters('m_user',['addstr']),
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapState('m_user',['token']),
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				// console.log();
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				// 进行结算判断 结算按钮
				if(!this.checkedCount) return uni.$showMsg('请选择结算的商品O(∩_∩)O')
				if(!this.addstr) return uni.$showMsg('请选择收货地址O(∩_∩)O')
				if(this.token) return this.delayNavigate()
			},
			// 展示倒计时提示消息
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后再结算！'+n+ '秒之后自动跳转到登录页',
					mask:true,
					duration:1500
				})
			},
			// 延时导航到my登陆姐买你
			delayNavigate(){
				this.seconds = 3
				this.showTips(this.seconds)
				
			   this.timer =setInterval(() => {
					this.seconds--
					if(this.seconds <= 0){
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/My/My'
						})
					}
					
					this.showTips(this.seconds)
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container{
		padding-left: 5px;
		font-size: 14px;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.radio{
			display: flex;
			align-items: center;
		}
		
		.amount-box{
			.amount{
				color: #C00000;
				font-weight: bold;
			}
			
		}
		
		.btn-settle{
			background-color: red;
			height: 50px;
			color:white;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>