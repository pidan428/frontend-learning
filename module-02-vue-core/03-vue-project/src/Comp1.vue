<script setup>
import { ref } from 'vue'

const todos = ref([
  { id: 1, text: '整理活动报名名单', done: false },
  { id: 2, text: '联系场地负责人', done: true },
  { id: 3, text: '准备审核说明材料', done: false }
])

const newText = ref('')

const addTodo = () => {
  if (!newText.value.trim()) return
  todos.value.push({
    id: Date.now(),
    text: newText.value.trim(),
    done: false
  })
  newText.value = ''
}

const removeTodo = (id) => {
  todos.value = todos.value.filter((t) => t.id !== id)
}

const doneCount = () => todos.value.filter((t) => t.done).length
</script>

<template>
  <div class="card">
    <h2>我的待办清单</h2>

    <div class="input-row">
      <input v-model="newText" placeholder="输入新的待办事项" />
      <button @click="addTodo">添加</button>
    </div>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <label>
          <input type="checkbox" v-model="todo.done" />
          <span
            :style="{
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#b4b2a9' : '#333333'
            }"
          >
            {{ todo.text }}
          </span>
        </label>
        <button class="del" @click="removeTodo(todo.id)">删除</button>
      </li>
    </ul>

    <p class="footer">已完成 {{ doneCount() }} / {{ todos.length }}</p>
    <div class="progress">
      <div
        class="bar"
        :style="{ width: (todos.length ? doneCount() / todos.length : 0) * 100 + '%' }"
      ></div>
    </div>
  </div>
</template>

<style>
.card {
  width: 440px;
  padding: 28px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  font-family: system-ui, "Microsoft YaHei", sans-serif;
}

h2 { font-size: 20px; font-weight: 600; margin: 0 0 16px; }

.input-row { display: flex; gap: 10px; margin-bottom: 8px; }

.input-row input {
  flex: 1;
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  outline: none;
}

.input-row input:focus { border-color: #5ca67b; }

button {
  padding: 10px 22px;
  font-size: 14px;
  color: #ffffff;
  background: #5ca67b;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}

ul { list-style: none; padding: 0; margin: 12px 0 0; }

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 4px;
  border-bottom: 1px solid #f0f0ee;
}

li label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
}

li input[type="checkbox"] { accent-color: #5ca67b; }

.del {
  padding: 4px 10px;
  font-size: 13px;
  color: #c96a6a;
  background: none;
}

.footer { font-size: 13px; color: #888780; margin: 20px 0 8px; }

.progress {
  height: 6px;
  border-radius: 999px;
  background: #eef0ec;
  overflow: hidden;
}

.bar {
  height: 100%;
  border-radius: 999px;
  background: #5ca67b;
  transition: width 0.3s;
}
</style>

