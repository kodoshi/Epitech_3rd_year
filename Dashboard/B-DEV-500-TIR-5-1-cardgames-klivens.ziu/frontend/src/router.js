import Vue from "vue";
import Router from "vue-router";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import UserPage from "./components/UserPage/UserPage";
import AboutComplete from "./components/AboutComplete/AboutComplete";
import OauthGetter from "./components/OauthGetter/OauthGetter";

Vue.use(Router);

export const router = new Router({
    mode: "history",
    linkActiveClass: 'is-active',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/register",
            name: "register",
            component: RegisterPage
        },
        {
            path: "/login",
            name: "login",
            component: LoginPage
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard
        },
        {
            path: "/account",
            name: "account",
            component: UserPage
        },
        {
            path: "/about.json",
            name: "about",
            component: About
        },
        {
            path: "/about-complete.json",
            name: "about-complete",
            component: AboutComplete
        },
        {
            path: "/oauth/:service",
            name: "oauth",
            component: OauthGetter
        },
        {
            path: "*",
            redirect: "/dashboard",
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('username');

    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next();
});