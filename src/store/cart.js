export default {
    namespaced: true,
    state: {
        carts: []
    },
    mutations: {
        insert: (state, payload) => {
            state.carts.push({
                id: payload.id,
                name: payload.name,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: 1
            })
        },
        update: (state, payload) => {
            let idx = state.carts.indexOf(payload);
            state.carts.splice(idx,1,{
                id: payload.id,
                name: payload.name,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: payload.quantity
            });
            if (payload.quantity<=0) {
                state.carts.splice(idx,1)
            }
        },
        set: (state, payload) => {
            state.carts = payload
        }
    },
    actions: {
        add: ({state, commit}, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id)
            if (!cartItem) {
                commit('insert', payload)
            } else {
                cartItem.quantity++
                commit('update', cartItem)
            }
        },
        remove: ({state, commit}, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id)
            if (!cartItem) {
                commit('insert', payload)
            } else {
                cartItem.quantity--
                commit('update', cartItem)
            }
        },
        set: ({commit}, payload) => {
            commit('set', payload)
        }
    },
    getters: {
        carts : state => state.carts,
        count : (state) => {
            return state.carts.length
        },
        totalQuantity : (state) => {
            return state.quantity
        },
        totalPrice : (state) => {
            let sum = 0;
            state.carts.forEach(state => {
                sum += (state.price * state.quantity)
            });
            return sum;
        }
    }
}