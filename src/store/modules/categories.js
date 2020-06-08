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
                if(type.typeId === 0)
                {
                    axios.get('/api/Category/GetAll?type=0')
                        .then(response => {
                            context.commit('setCategories', response.data.payload)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                else
                {
                    axios.get('/api/Category/GetAll?type=1')
                        .then(response => {
                            context.commit('setCategories', response.data.payload)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
        },
    },
    getters : {
        getCategories(state) {
            return state.categories
        }
    },
}