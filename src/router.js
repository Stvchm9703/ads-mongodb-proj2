import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
        }, {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // } ,{
        //     path: '/departments',
        //     name: 'department_list',
        //     component: () => import(/* webpackChunkName: "department_list" */ './views/department/list.vue')
        // }, {
        //     path: '/department/:dpt_id',
        //     name: 'department',
        //     component: () => import(/* webpackChunkName: "department" */ './views/department/info.vue')
        }, {
            path:'/departments/create',
            name: 'department_create',
            component: () => import(/* webpackChunkName: "department" */ '@/views/department/create.vue')
        }
    ]
});
