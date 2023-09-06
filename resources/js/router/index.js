import { createRouter, createWebHistory }from 'vue-router'
import Inicio from '../views/landing/Inicio.vue'
import Blog from '../views/landing/Blog.vue'
import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Register.vue'
import Perfil from '../views/admin/Profile.vue'
import Usuario from '../views/admin/Usuario.vue'


const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: Inicio
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {redirectIfAuth: true}
    },
    {
        path: '/registro',
        name: 'Registro',
        component: Registro,
        meta: {requireAuth: true}
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil,
        meta: {requireAuth: true}
    },
    {
        path: '/usuario',
        component: Usuario,
        name: 'Usuario',
        meta: {requireAuth: true}

    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
});
//Guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("access_token");
    if(to.meta.requireAuth){
        if(!token){
            return next({name: 'Login'})
        }
        return next()
    }
    if(to.meta.redirectIfAuth && token)
    {
        return next({name: 'Perfil'})
    }
    return next()

})
export default router;