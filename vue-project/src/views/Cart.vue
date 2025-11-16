<template>
    <div>
        <h1>Carrito de compras</h1>
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
            <img :src="item.imageUrl" :alt="item.name" class="cart-image" />
            <div class="cart-details">
                <h3>{{ item.name }}</h3>
                <p>Cantidad:
                    <input type="number" v-model.number="item.quantity" min="1"
                        @change="cart.updateQuantity(item.id, item.quantity)" />
                </p>
                <p>Subtotal: ${{ item.price * item.quantity }}</p>
                <button @click="cart.removeItem(item.id)">Eliminar</button>
            </div>
        </div>
        <h2>Total: ${{ cart.total }}</h2>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
cart.loadCart()
</script>