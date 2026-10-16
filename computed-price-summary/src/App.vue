<script setup>
import { reactive, computed } from 'vue'
const author = reactive({
  name: 'John Doe',
  books: [
    { title: 'Vue 2 - Advanced Guide', price: 99 },
    { title: 'Vue 3 - Basic Guide', price: 68 },
    { title: 'Vue 4 - The Mystery', price: 128 },
    { title: 'Java 21 - Basic Guide', price: 75 },
    { title: 'Java 21 - Advanced Guide', price: 110 }
  ]
})
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'YES' : 'NO'
})
const hasBooks = computed(() => {
  return author.books.length > 0
})
const vueBookList = computed(() => {
  return author.books.filter(book => book.title.includes('Vue'))
})
const vueBookTotalPrice = computed(() => {
  return vueBookList.value.reduce((sum, book) => sum + book.price, 0)
})
const expensiveVueBooks = computed(() => {
  return vueBookList.value.filter(book => book.price >= 100)
})
const bookSummary = computed(() => {
  return `作者 ${author.name} 一共有 ${author.books.length} 本书，其中 Vue 相关书籍共 ${vueBookList.value.length} 本，Vue 书籍总价 ${vueBookTotalPrice.value} 元`
})
</script>

<template>
  <p>Has published books: {{ publishedBooksMessage }}</p>

  <p>作者 {{ author.name }} 的 Vue 系列书籍，共 {{ vueBookList.length }} 本：</p>
  <ol>
    <li v-for="book in vueBookList" :key="book.title">
      《{{ book.title }}》 定价 ¥{{ book.price }}
    </li>
  </ol>

  <p>Vue 书籍合计金额：¥{{ vueBookTotalPrice }}</p>

  <p>其中定价 ≥ 100 元的 {{ expensiveVueBooks.length }} 本：</p>
  <ol>
    <li v-for="book in expensiveVueBooks" :key="book.title">
      《{{ book.title }}》 定价 ¥{{ book.price }}
    </li>
  </ol>

  <p>{{ bookSummary }}</p>
</template>
