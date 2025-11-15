<template>
    <div class="product-card">
        <img :src="product.imageUrl" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Precio: ${{ product.price }}</p>
        <button @click="$emit('added-to-cart', product)">Añadir al carrito</button>
    </div>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.product-card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 0.5rem;
}
</style>