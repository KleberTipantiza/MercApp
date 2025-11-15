<template>
    <div>
        <h1>Catálogo de productos</h1>

        <!-- Buscador -->
        <input v-model="search" placeholder="Buscar producto"/>

        <!-- Filtro por categoría -->
        <select v-model="selectedCategory">
            <option value="">Todas las categorías</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
            </option>
        </select>

        <!-- Estado de carga y error -->
        <p v-if="loading">Cargando productos...</p>
        <p v-if="error">Error: {{ error }}</p>

        <!-- Listado de productos -->
        <div v-if="filteredProducts.length">
            <ProductCard
                v-for="prod in filteredProducts"
                :key="prod.id"
                :product="prod"
                @added-to-cart="addToCart"
            />
            </div>
        </div>
        <p v-else>No hay productos que coincidan</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'

// Estado de productos y categorías
const { products, loading, error, loadProducts } = useProducts()
const categories = ref([])
const search = ref('')
const selectedCategory = ref('')

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
    console.log('Producto añadido:', product)
}
</script>

