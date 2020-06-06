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
            return new Promise((resolve, reject) => {
                const url = '/api/Expenses/GetAll?date=' + new Date().toISOString().slice(0,19)
                axios.get(url, {})
                    .then(response => {
                        context.commit('setExpenses', response.data.payload)
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
        getExpenses(state) {
            return state.expenses
        }
    },
}