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
                const url = '/api/Income/GetAll?date=' + new Date().toISOString().slice(0,19)
                axios.get(url, {})
                    .then(response => {
                        context.commit('setIncomes', response.data.payload)
                    })
                    .catch(error => {
                        console.log(error)
                    })
        },
    },
    getters : {
        getIncomes(state) {
            return state.incomes
        }
    },
}