import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading con import()
const Home = () => import('@/views/Home.vue')
const ProductDetail = () => import('@/views/ProductDetail.vue')
const ProductForm = () => import('@/views/ProductForm.vue')
const About = () => import('@/views/About.vue')
const Cart = () => import('@/views/Cart.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/new', name: 'NewProduct', component: ProductForm },
  { path: '/product/:id/edit', name: 'EditProduct', component: ProductForm },

  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/about', name: 'About', component: About },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
