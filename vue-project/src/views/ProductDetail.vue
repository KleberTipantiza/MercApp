<template>
    <div v-if="product">
        <h1>{{ product.name }}</h1>
        <img :src="product.imageUrl" :alt="product.name" />
        <p>{{ product.description }}</p>
        <p>Precio: ${{ product.price }}</p>
        <button @click="addToCart(product)">Añadir al carrito</button>
    </div>
    <p v-else>Cargando producto...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
    const res = await fetch(`http://localhost:3000/api/products/${route.params.id}`)
    product.value = await res.json()
})

const addToCart = (prod) => {
    console.log('Producto añadido desde detalle:', prod)
}
</script>