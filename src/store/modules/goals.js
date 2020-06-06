import axios from 'axios'

export default {
    state: {
        goals: []
    },
    mutations: {
        setGoals(state, goals) {
            state.goals = goals
        }
    },
    actions: {
        fetchGoals(context) {
            return new Promise((resolve, reject) => {
                axios.get('/api/Goal/GetAll')
                    .then(response => {
                        context.commit('setGoals', response.data.payload)
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
        getGoals(state) {
            return state.goals
        }
    },
}