<script setup>
import { ref } from 'vue'

const isSignedUp = ref(false)
const count = ref(0)

const handleClick = () => {
  isSignedUp.value = !isSignedUp.value
  count.value++
}
</script>

<template>
  <button @click="handleClick" class="btn">
    {{ isSignedUp ? '退订' : '报名' }}
  </button>

  <p :class="isSignedUp ? 'status--done' : 'status--idle'">
    {{ isSignedUp ? '已报名' : '未报名' }}
  </p>

  <p class="show">
    你已经点击了 {{ count }} 次
  </p>

  <p class="show">hello world</p>
</template>

<style>
.btn {
  padding: 10px 30px;
  background-color: #5CA67B;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
}

/* 所有 p 统一成方块：宽度固定，行高等于高度实现垂直居中 */
p {
  width: 200px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  margin-top: 10px;
}

/* 米黄色：计数框和 hello world */
.show {
  background-color: antiquewhite;
}

/* 状态色 */
.status--done {
  background-color: #67c23a;
  color: #FFFFFF;
}

.status--idle {
  background-color: #c0c4cc;
  color: #FFFFFF;
}
</style>

