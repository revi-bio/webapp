import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// example of how a store works in Pinia
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
