import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login.vue'
import Register from './components/Register.vue'

Vue.use(Router);

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
        {
            path: '/register',
            name: 'registration',
            component: Register
        },
        {
            path: '/hello',
            name: 'helloworld',
            component: HelloWorld
        }
    ];


const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;