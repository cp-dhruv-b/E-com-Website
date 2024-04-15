import { createRouter, createWebHistory } from "vue-router";
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegistrationForm.vue';
import ProductList from '../components/ProductList.vue';
import Home from '../views/Home.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Favorites from '../views/Favorites.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginForm
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterForm
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/product/:id',
        name: 'ProductDetails',
        component: ProductDetails
    },
    {
        path: '/products',
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;