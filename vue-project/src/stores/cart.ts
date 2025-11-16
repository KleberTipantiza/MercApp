import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

interface Product {
    id: number
    name: string
    decription: string
    price: number
    image: string
    categoryId: number
    stock: number
}

interface CartItem extends Product {
    quantity: number
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])

    // Agregar producto
    const addItem = (product: Product) => {
        const existing = items.value.find(p => p.id === product.id)
        if (existing) {
            existing.quantity += 1
        } else {
            items.value.push({ ...product, quantity: 1 })
        }
    }

    // Quitar producto
    const removeItem = (productId: number) => {
        items.value = items.value.filter(p => p.id !== productId)
    }

    // Cambiar cantidad
    const updateQuantity = (productId: number, qty: number) => {
        const item = items.value.find(p => p.id === productId)
        if (item) item.quantity = qty
    }

    // Total calculado
    const total = computed(() =>
        items.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
    )

    // Persistencia en localStorage
    watch(items, (newItems) => {
        localStorage.setItem('cart', JSON.stringify(newItems))
    }, { deep: true })

    // Cargar carrito desde localStorage
    const loadCart = () => {
        const saved = localStorage.getItem('cart')
        if (saved) items.value = JSON.parse(saved)
    }

    return { items, addItem, removeItem, updateQuantity, total, loadCart}
})