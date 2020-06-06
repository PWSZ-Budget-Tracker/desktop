import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import categories from './modules/categories'
import incomes from './modules/incomes'
import expenses from './modules/expenses'
import goals from './modules/goals'

Vue.use(Vuex)
axios.defaults.baseURL = 'https://pwsz-budget-tracker.azurewebsites.net';

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        notifications: {
            budgetPLN: null,
            budgetUSD: null,
            budgetEUR: null
        }
    },
    mutations: {
            retrieveToken(state, token) {
                state.token = token
            },
            destroyToken(state) {
                state.token = null
            },
            setNotifications(state, notifications) {
                state.notifications = notifications
            }
    },
    actions: {
        getToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/api/Authentication/Login', {
                    email: credentials.email,
                    password: credentials.password,
                })
                    .then(response => {
                        if(response.data.successful)
                        {
                            const token = response.data.payload.accessToken
                            localStorage.setItem('access_token', token)
                            context.commit('retrieveToken', token)
                            resolve(response)
                        }
                        else
                        {
                            alert("Użytkownik nie istnieje lub nieprawidłowe dane")
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        userRegister(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/api/Authentication/Register', {
                    email: credentials.email,
                    password: credentials.password,
                    passwordConfirmation: credentials.passwordConfirmation
                })
                    .then(response => {
                        if(response.data.successful)
                        {
                            alert("Zarejestrowano pomyślnie!")
                            resolve(response)
                        }
                        else
                        {
                            alert("Użytkownik o podanym emailu już istnieje. Zaloguj się")
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroyToken(context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve) => {
                    context.commit('destroyToken')
                    localStorage.removeItem('access_token')
                    resolve()
                })
            }
        },
    },
    getters : {
        loggedIn(state) {
            return state.token !== null
        },
        getNotifications(state) {
            return state.notifications
        }
    },
    modules : {
        categories, incomes, expenses, goals
    }
})