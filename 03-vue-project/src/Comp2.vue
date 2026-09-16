<script setup>
import { ref } from 'vue'

const activity = ref({
  title: '2026 春季校园歌手大赛',
  status: 'signing',
  covers: [
    'https://workbuddy-space-static.codebuddy.work/image/XTtox4L5ED23e6miaQcVGa.png',
    'https://workbuddy-space-static.codebuddy.work/image/5t4tVVeDENJhIZT4sSC0T8.png'
  ]
})

const i = ref(0)
const turn = (step) => {
  const n = activity.value.covers.length
  i.value = (i.value + step + n) % n
}
</script>

<template>
  <div class="card">
    <img :src="activity.covers[i]" alt="封面" class="cover" />
    <h3>{{ activity.title }}</h3>

    <p :class="{ signing: activity.status === 'signing' }">
      {{ activity.status === 'closed' ? '已下架' : '报名中' }}
    </p>

    <button @click="turn(-1)">上一张</button>
    <button @click="turn(1)">下一张</button>
    <button :disabled="activity.status === 'closed'" @click="activity.status = 'closed'">
      下架
    </button>
  </div>
</template>

<style>
.card { width: 320px; }
.cover { width: 100%; aspect-ratio: 3 / 4; object-fit: cover; display: block; border-radius: 12px; }
.signing { color: #3b6d11; }
</style>

