import axios from '@/axios'

const state = {
    data: {
        meta: {
            current_page: 1
        }
    },
    params: {
        url: 'users?page=',
        body: {},
        method: 'get'
    },
}

const mutations = {
    SET_USERS: (state, data) => state.data = data,
    SET_CURRENT_PAGE: (state, data) => state.data.meta['current_page'] = data,
};

const getters = {
    getUsers: state => state.data.data,
    getCurrentPage: state => state.data.meta.current_page
};

const actions = {
    async uploadUsers({ commit }, params) {
        try {
            let response = await axios[params.method](params.url + params.pageNumber, params.body)
            commit("SET_USERS", response.data);
            state.params = Object.assign({}, params);
            commit('SET_CURRENT_PAGE', response.data.meta.current_page);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async userAction({dispatch},params){
            try {
                let response = await axios[params.method](params.url + params.pageNumber, params.body)
                return Promise.resolve(response)
            } catch (error) {
                return Promise.reject(error)
            }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

