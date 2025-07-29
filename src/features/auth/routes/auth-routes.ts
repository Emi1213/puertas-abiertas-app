export const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../presentation/views/login-view.vue'),
    }
]