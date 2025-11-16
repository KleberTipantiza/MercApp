<template>
    <diiv>'
        <h1>{{ isEdit ? 'Editar producto' : 'Editar producto' : 'Nuevo producto' }}</h1>

        <form @submit.prevent="saveProduct">
            <div>
                <label>Nombre:</label>
                <input v-model="product.name" required />
            </div>

            <div>
                <label>Precio:</label>
                <input type="number" v-model.number="product.price" min="1" required />
            </div>

            <div>
                <label>Categoría:</label>
                <select v-model="product.categoryId" required>
                    <option value="">Seleccione una categoría</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                    </option>
                </select>
            </div>

            <div>
                <label>Stock:</label>
                <input type="number" v-model.number="product.stock" min="0" required />
            </div>

            <div>
                <label>Imagen (URL):</label>
                <input type="url" v-model="product.imageUrl" required />
            </div>
            
            <button type="submit">{{ isEdit ? 'Actualizar' : 'Crear' }}</button>
        </form>

        <p v-if="error" style="color: red">Error: {{ error }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const product = ref({
    name: '',
    price: 0,
    categoryId: '',
    stock: 0,
    imageUrl: ''
})

const categories = ref([])
const error =ref(null)
const isEdit = route.path.includes('/edit')

// Cargar categorias
onMounted(async () => {
    const res = await fetch('http://localhost:3000/api/categories')
    categories.value = await res.json()

    if (isEdit) {
        const resProd = await fetch(`http://localhost:3000/api/products/${route.params.id}`)
        product.value = await resProd.json()
    }
})

// Guardar producto
const saveProduct = async () => {
    try {
        const method = isEdit ? 'PUT' : 'POST'
        const url = isEdit
            ? `http://localhost:3000/api/products/${route.params.id}`
            : 'http://localhost:3000/api/products'

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product.value)
        })

        if (!res.ok) throw new Error(`Error ${res.status}`)

        router.push('/') // volver a la lista de productos
    } catch (err) {
        error.value = err.message
    }
}
</script>