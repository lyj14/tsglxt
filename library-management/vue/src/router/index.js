import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Cookies from "js-cookie";

Vue.use(VueRouter)

const routes = [
    //====== 登录 ======
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue')
    },
    //====== 主页 ======
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/home',
        children: [//子路由
        {
            //====== 首页 ======
            path: 'home',
            name: 'Home',
            component: () => import('@/views/home/HomeView.vue')
        },
                    //====== 读者 ======
                    {
                        //作为children，path中'/userList'与path:'/'中/会拼接，即变为//userList，故删去子路由的/
                        path: 'userList',
                        name: 'UserList',
                        component: () => import('@/views/user/User.vue')
                    },
                    {
                        path: 'addUser',
                        name: 'AddUser',
                        component: () => import('@/views/user/AddUser.vue')
                    },
                    {
                        path: 'editUser',
                        name: 'EditUser',
                        component: () => import('@/views/user/EditUser.vue')
                    },
                    //===== 图书管理员 =====
                    {
                        path: 'addAdmin',
                        name: 'AddAdmin',
                        component: () => import('@/views/admin/AddAdmin.vue')
                    },
                    {
                        path: 'editAdmin',
                        name: 'EditAdmin',
                        component: () => import('@/views/admin/EditAdmin.vue')
                    },
                    {
                        path: 'adminList',
                        name: 'AdminList',
                        component: () => import('@/views/admin/Admin.vue')
                    },
                    //  ====  Category  ====
                    { path: 'categoryList', name: 'CategoryList', component: () => import('@/views/category/List.vue') },
                    { path: 'addCategory', name: 'AddCategory', component: () => import('@/views/category/Add.vue') },
                    { path: 'editCategory', name: 'EditCategory', component: () => import('@/views/category/Edit.vue') },
                    //  ====  Book  ====
                    { path: 'bookList', name: 'BookList', component: () => import('@/views/book/List.vue') },
                    { path: 'addBook', name: 'AddBook', component: () => import('@/views/book/Add.vue') },
                    { path: 'editBook', name: 'EditBook', component: () => import('@/views/book/Edit.vue') },
                    //  ====  Borrow  ====
                    { path: 'borrowList', name: 'BorrowList', component: () => import('@/views/borrow/List.vue') },
                    { path: 'addBorrow', name: 'AddBorrow', component: () => import('@/views/borrow/Add.vue') },
                    { path: 'editBorrow', name: 'EditBorrow', component: () => import('@/views/borrow/Edit.vue') },
                     //  ====  Return  ====
                    { path: 'returList', name: 'returList', component: () => import('@/views/retur/List.vue') },
        ]
    },
    {
        path: "*",
        component: () => import('@/views/404.vue')
    }
]

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.path === '/login') next()
    const admin = Cookies.get("admin")
    //强制转换路径为/login
    if(!admin && to.path !== '/login') return next("/login")
    //若路径为/home且Cookies有数据，则直接放行
    next()
})

export default router
