import { ref } from 'vue'

export function useApi(url: string, options: RequestInit = {}) {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    let controller: AbortController | null = null

    const fetchData = async () => {
        loading.value = true
        error.value = null
        controller = new AbortController()

        try {
            const res = await fetch(url, { ...options, signal: controller.signal })
            if (!res.ok) throw new Error(`Error ${res.status}`)
            data.value = await res.json()
        } catch (err: any) {
            error.value = err.message
            // Reintento simple después de un error
            try {
                const res = await fetch(url, { ...options, signal: controller.signal })
                if (!res.ok) throw new Error(`Error ${res.status}`)
                data.value = await res.json()
            } catch (retryErr: any) {
                error.value = retryErr.message
            }
        } finally {
            loading.value = false
        }
    }

    const cancel = () => {
        if (controller) controller.abort()
    }

    return { data, loading, error, fetchData, cancel}
}