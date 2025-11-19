<template>
    <div>
        <h1>Catálogo de productos</h1>

        <!-- Buscador por nombre y filtro por categoría -->
        <div class="filters">
            <input v-model="search" placeholder="Buscar producto" />
            <select v-model="selectedCategory">
                <option value="">Todas las categorías</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
                </option>
            </select>
            <!-- Botón para crear nuevo producto -->
            <button @click="$router.push('/product/new')">Nuevo producto</button>
        </div>

        <!-- Estado de carga y error -->
        <p v-if="loading">Cargando productos...</p>
        <p v-if="error">Error: {{ error }}</p>

        <!-- Listado de productos -->
        <div v-if="filteredProducts.length" class="product-grid">
            <ProductCard
                v-for="prod in filteredProducts"
                :key="prod.id"
                :product="prod"
                @added-to-cart="addToCart"
            />
        </div>
        <p v-else>No hay productos que coincidan</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'
import { useCartStore } from '@/stores/cart'

// Estado de productos y categorías
const { products, loading, error, loadProducts } = useProducts()
const categories = ref([])
const search = ref('')
const selectedCategory = ref('')
const cart = useCartStore()

// Cargar datos al montar
onMounted(async () => {
    await loadProducts()
    const resCategories = await fetch('http://localhost:3000/api/categories')
    categories.value = await resCategories.json()
})

// Computed para filtrar
const filteredProducts = computed(() => {
    return products.value.filter(p => {
        const matchesSearch =
            p.name.toLowerCase().includes(search.value.toLowerCase()) ||
            p.description.toLowerCase().includes(search.value.toLowerCase())

        const matchesCategory =
            !selectedCategory.value || p.categoryId === selectedCategory.value

        return matchesSearch && matchesCategory
    })
})

// Evento para añadir al carrito
const addToCart = (product) => {
    cart.addItem(product)
}
</script>

