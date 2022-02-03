import axios from '@/axios'

const state = () => ({
    rules: {

    },
    user: {

    }
})

const mutations = {
    SET_TOKEN: (state,access_token) => {
        localStorage.setItem('access_token',access_token)
    },
    SET_USER_DATA: (state,user) => {
        state.user = user,
        state.rules = user.rules 
    }
}

const getters = {
    getUser: state => state.user,
    getRules: state => state.rules,
}

const actions = {
    async login({commit}, {username,password}){
        const auth_url = process.env.VUE_APP_AUTH_URL
        try {
            const response = await axios.post(auth_url,{
                username,
                password,
                client_secret: process.env.VUE_APP_CLIENT_SECTER
            })
            commit('SET_TOKEN', response.data.access_token)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async fetchUserData({commit}){
        try {
            const authUser = await axios.get('users/getAuthUser')  
            commit('SET_USER_DATA',authUser.data)          
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default {
    namespaced: true,
    actions,
    state,
    getters,
    mutations
}