import { createRouter, createWebHistory }from 'vue-router'
import Inicio from '../views/landing/Inicio.vue'
import Blog from '../views/landing/Blog.vue'
import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Register.vue'
import Perfil from '../views/admin/Profile.vue'



const routes = [
    {
        path: '/',
        component: Inicio
    },
    {
        path: '/blog',
        component: Blog
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/registro',
        component: Registro
    },
    {
        path: '/perfil',
        component: Perfil
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;