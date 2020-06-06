import axios from 'axios'

export default {
    state: {
        categories: null
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories
        }
    },
    actions: {
        fetchCategories(context, type) {
            return new Promise((resolve, reject) => {
                if(type.typeId === 0)
                {
                    axios.get('/api/Category/GetAll?type=0')
                        .then(response => {
                            context.commit('setCategories', response.data.payload)
                            resolve(response)
                        })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
                else
                {
                    axios.get('/api/Category/GetAll?type=1')
                        .then(response => {
                            context.commit('setCategories', response.data.payload)
                            resolve(response)
                        })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
        },
    },
    getters : {
        getCategories(state) {
            return state.categories
        }
    },
}