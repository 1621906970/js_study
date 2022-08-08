export default{
	//开启命名空间
	namespaced:true,
	
	state:() => ({
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		token:uni.getStorageSync('token') || '',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),
	
	//方法
	mutations:{
		//更新收货地址方法
		updateAddress(state,address){
			state.address = address
			
			this.commit('m_user/saveAddressToStorage')
		},
		
		// 持久化存储address到本地
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		
		// 更新用户信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		updateToken(token){
			token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(){
			
			uni.setStorageSync('token','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
		}
	},
	
	getters:{
		addstr(state){
			if(!state.address.provinceName ) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}