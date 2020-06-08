import axios from 'axios'

export default {
    state: {
        expenses: []
    },
    mutations: {
        setExpenses(state, expenses) {
            state.expenses = expenses
        }
    },
    actions: {
        fetchExpenses(context) {
                const url = '/api/Expenses/GetAll?date=' + new Date().toISOString().slice(0,19)
                axios.get(url, {})
                    .then(response => {
                        context.commit('setExpenses', response.data.payload)
                    })
                    .catch(error => {
                        console.log(error)
                    })
        },
    },
    getters : {
        getExpenses(state) {
            return state.expenses
        }
    },
}