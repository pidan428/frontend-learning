<script setup>
import { reactive, computed, ref } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery',
    'Java 21 - Basic Guide',
    'Java 21 - Advanced Guide'
  ]
})

const numbers = ref([1,2,3,4,5,6,7])

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'YES' : 'NO'
})

const vueBooksCount = computed(() => {
  // 统计书名包含 'Vue' 的书籍数量
  return author.books.filter(book => book.includes('Vue')).length
})

// 计算属性，统计 numbers 数组中奇数的个数
const oddCount = computed(() => {
  return numbers.value.filter(n => n % 2 !== 0).length
})

</script>


<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
  <p>关于 Vue 的书籍有: {{ vueBooksCount }} 本</p>
  <hr/>
  <p>数组中奇数有: {{ oddCount }} 个</p>
</template>

