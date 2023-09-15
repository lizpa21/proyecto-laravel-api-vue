import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/landing/Inicio.vue'
import Blog from '../views/landing/Blog.vue'
import Login from '../views/auth/Login.vue'
import Registro from '../views/auth/Register.vue'
import Perfil from '../views/admin/Profile.vue'
import Usuario from '../views/admin/Usuario.vue'
import Categoria from '../views/admin/productos/Categoria.vue'
import Producto from '../views/admin/productos/Producto.vue'
import AppLayout from '@/layout/AppLayout.vue'
import Landing from '@/views/landing/Landing.vue'

const routes = [
    {
        path: '/',
        component: Landing,
        children: [

            {
                path: '/',
                name: 'inicio',
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
                component: Registro,
                name: 'Registro',
                meta: {requireAuth: true}
            },
        ]
    },
    {
        path: '/admin',
        component: AppLayout,
        children: [
            {
                path: '/admin/perfil',
                component: Perfil,
                name: 'Perfil',
                meta: {requireAuth: true}
            },
            {
                path: '/admin/usuario',
                component: Usuario,
                name: 'Usuario',
                meta: {requireAuth: true}
            },
            {
                path: '/admin/categoria',
                component: Categoria,
                name: 'Categoria',
                meta: {requireAuth: true}
            },
            {
                path: '/admin/producto',
                component: Producto,
                name: 'Producto',
                meta: {requireAuth: true}
            }
        ]
    }
    

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("access_token");
    if(to.meta.requireAuth){
        if(!token){
            return next({name: 'Login'})
        }
        return next()
    }

    if(to.meta.redirectIfAuth && token){
        return next({name: 'Perfil'})
    }
    return next()
})

export default router;