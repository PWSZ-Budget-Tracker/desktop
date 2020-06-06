import axios from 'axios'

export default {
    state: {
        incomes: []
    },
    mutations: {
        setIncomes(state, incomes) {
            state.incomes = incomes
        }
    },
    actions: {
        fetchIncomes(context) {
            return new Promise((resolve, reject) => {
                const url = '/api/Income/GetAll?date=' + new Date().toISOString().slice(0,19)
                axios.get(url, {})
                    .then(response => {
                        context.commit('setIncomes', response.data.payload)
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
    },
    getters : {
        getIncomes(state) {
            return state.incomes
        }
    },
}