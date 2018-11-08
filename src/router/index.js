import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/view/layout/Layout'),
      meta:{
        requiresAuth: true
      },
      children:[
        {
          path: '/demo',
          name: 'demo',
          component: () => import('@/view/demo/demo'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/view/dashboard/dashboard'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/customer',
          name: 'customer',
          component: () => import('@/view/customer/customer'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/view/contact/contact'),
          children:[{
            path: ':contactId',
            name: 'contactDetail',
            component: () => import('@/view/contact/contactDetail'),
          }],
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('@/view/product/product'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/follow',
          name: 'follow',
          component: () => import('@/view/follow/follow'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('@/view/order/order'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/statistic',
          name: 'statistic',
          component: () => import('@/view/statistic/statistic'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/purchase',
          name: 'purchase',
          component: () => import('@/view/purchase/purchase'),
          children:[{
            path: '/purchase/:id',
            name: 'purchaseDetail',
            component: () => import('@/view/purchase/purchaseDetail')
          }],
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/supplier',
          name: 'supplier',
          component: () => import('@/view/supplier/supplier'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/stock',
          name: 'stock',
          component: () => import('@/view/stock/stock'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/dict',
          name: 'dict',
          component: () => import('@/view/dict/dict'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/menu',
          name: 'sysmenu',
          component: () => import('@/view/menu/sysmenu'),
          meta:{
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/login/login'),
      meta:{
        requiresAuth: false
      }
    },
    {
      path: "*",
      redirect: "/",
      meta:{
        requiresAuth: true
      }
    }
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   children: [
    //     {
    //       // 当 /user/:id/profile 匹配成功，
    //       // UserProfile 会被渲染在 User 的 <router-view> 中
    //       path: 'profile',
    //       component: Header
    //     },
    //     {
    //       // 当 /user/:id/posts 匹配成功
    //       // UserPosts 会被渲染在 User 的 <router-view> 中
    //       path: 'posts',
    //       component: HelloWorld
    //     }
    //   ]
    // }
  ]
})
