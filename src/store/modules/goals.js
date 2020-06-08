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
                axios.get('/api/Goal/GetAll')
                    .then(response => {
                        context.commit('setGoals', response.data.payload)
                    })
                    .catch(error => {
                        console.log(error)
                    })
        },
    },
    getters : {
        getGoals(state) {
            return state.goals
        }
    },
}