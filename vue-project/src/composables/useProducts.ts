import { ref } from 'vue'
import { useApi } from './useApi'

export function useProducts() {
    const products = ref([])
    const { data, loading, error, fetchData } = useApi('http://localhost:3000/api/products')

    const loadProducts = async () => {
        await fetchData()
        if (data.value) {
            products.value = data.value
        }
    }
    
    return { products, loading, error, loadProducts}
}