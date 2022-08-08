export default{
  namespaced: true,
	
	state:()=>({
		// cart数组 将来会来存储每个商品的信息对象  id name peice count small logo  state
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addToCart(state,goods){
			const findResult  = state.cart.find(x => x.goods_id === goods.goods_id)
			// console.log(findResult);
			if(!findResult){
				// 如果没有这件商品 购物车中
				state.cart.push(goods)//将商品信息对象加入购物车中
			}else{
				// 有的话 让商品中数量+1即可
				findResult.goods_count++
			}
			// console.log(state.cart);
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
				
				this.commit('m_cart/saveToStorage')
			}
		},
		updataGoodsCount(state,goods){
			//更新商品数量
			const findResult  = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsByid(state,goods_id){
			state.cart  = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		// 更新购物车中所有商品的状态
		updateAllGoodsState(state,newState){
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	
  getters: {
	  // 购物车中所有商品总数量
    total(state) {
      // let c = 0
      // state.cart.forEach(goods => c += goods.goods_count)
      // return c
	  return state.cart.reduce((total,item)=> {
		  total += item.goods_count
		  return total
	  },0)
    },
	// 购物车中已勾选商品的总数量
	checkedCount(state){
		 return state.cart.filter(x => x.goods_state).reduce((total,item)=>{return total += item.goods_count},0)
	},
	checkedGoodsAmount(state){
		
		return state.cart.filter(x => x.goods_state).reduce((total,item)=> {
			total += item.goods_count * item.goods_price
			return total
		},0).toFixed(2)
	}
  }
}