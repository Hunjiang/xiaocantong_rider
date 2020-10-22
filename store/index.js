import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		// 自定义tabbar数据
		vuex_tabbar: [{
				iconPath: "/static/images/list.png",
				selectedIconPath: "/static/images/list_selected.png",
				text: '订单',
				pagePath: '/pages/list/index'
			},
			{
				iconPath: "/static/images/index.png",
				selectedIconPath: "/static/images/index_selected.png",
				text: '抢单池',
				midButton: true,
				pagePath: '/pages/index/index'
			},
			{
				iconPath: "/static/images/wallet.png",
				selectedIconPath: "/static/images/wallet_selected.png",
				text: '钱包',
				pagePath: '/pages/wallet/index'
			}
		]
	},
    mutations: {},
    actions: {}
})
export default store