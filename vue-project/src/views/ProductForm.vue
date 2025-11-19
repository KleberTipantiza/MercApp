<template>
    <div class="form-container">
        <h1>{{ isEdit ? 'Editar producto' : 'Nuevo producto' }}</h1>

        <form @submit.prevent="saveProduct">
            <div>
                <label>Nombre:</label>
                <input v-model="product.name" required />
            </div>

            <div>
                <label>Descripción:</label>
                <input v-model="product.description" required />
            </div>

            <div>
                <label>Precio:</label>
                <input type="number" v-model.number="product.price" min="1" required />
            </div>

            <div>
                <label>Categoría:</label>
                <select v-model.number="product.categoryId" required>
                    <option value="">Seleccione una categoría</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                    </option>
                </select>
            </div>

            <div>
                <label>Stock:</label>
                <input type="number" v-model.number="product.stock" min="1" required />
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
    description: '',
    price: 0,
    categoryId: null,
    stock: 0,
    imageUrl: ''
})

const categories = ref([])
const error =ref(null)
const id = route.params.id
const isEdit = ref(id !== undefined)

// Cargar producto y categorías si es edición
onMounted(async () => {
    const res = await fetch('http://localhost:3000/api/categories')
    categories.value = await res.json()

    if (isEdit.value) {
        const resProd = await fetch(`http://localhost:3000/api/products/${id}`)
        product.value = await resProd.json()
    }
})

// Guardar producto
const saveProduct = async () => {
    try {
        const method = isEdit.value ? 'PUT' : 'POST'
        const url = isEdit.value
            ? `http://localhost:3000/api/products/${id}`
            : 'http://localhost:3000/api/products'

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product.value)
        })

        if (!res.ok) throw new Error(`Error ${res.status}`)

        router.push('/')
    } catch (err) {
        error.value = err.message
    }
}

</script>