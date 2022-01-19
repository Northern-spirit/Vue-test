import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
	added: [],
	all: [
		{
			id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
			name: 'COBOL 101 vintage',
			img: 'http://klaus-hamann.de/images/Computer1/Comput2.jpg',
			description: 'Learn COBOL with this vintage programming book',
			price: 399
		},
		{
			id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
			name: 'Sharp C2719 curved TV',
			img: 'https://i.dell.com/sites/imagecontent/videos/en/PublishingImages/s2719dc-ultrathin-monitor-video-en.jpg',
			description: 'Watch TV like never before with the brand new curved screen technology',
			price: 1995
		},
		{
			id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
			name: 'Remmington X mechanical keyboard',
			img: 'https://static.onlinetrade.ru/img/items/b/redragon_usas_ru_74674__719520_3.jpg',
			description: 'Excellent for gaming and typing, this Remmington X keyboard ' +
				'features tactile, clicky switches for speed and accuracy',
			price: 595
		}
	]
}

const getters = {
	allProducts: state => state.all, // would need action/mutation if data fetched async
	getNumberOfProducts: state => (state.all) ? state.all.length : 0,
	cartProducts: state => {
		return state.added.map(({ id, quantity }) => {
			const product = state.all.find(p => p.id === id)

			return {
				name: product.name,
				price: product.price,
				img: product.img,
				quantity
			}
		})
	}
}

const actions = {
	addToCart({ commit }, product) {
		commit(types.ADD_TO_CART, {
			id: product.id
		})
	},
	removeFromCart({ commit }, product) {
		commit(types.REMOVE_FROM_CART, { id: product.id })
	}
}

const mutations = {

	[types.ADD_TO_CART](state, { id }) {
		const record = state.added.find(p => p.id === id)

		if (!record) {
			state.added.push({
				id,
				quantity: 1
			})
		} else {
			record.quantity++
		}
	},
	[types.REMOVE_FROM_CART](state, { id }) {
		const record = state.added.find(p => p.id === id)
		if (record) {
			state.added = state.added.filter(p => p.id !== record.id)
		}
	}
}

export default new Vuex.Store({
	state,
	strict: debug,
	getters,
	actions,
	mutations
})
