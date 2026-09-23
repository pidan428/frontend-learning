<script setup>
import { ref } from "vue";

const keyword = ref("");
const phone = ref("");

const students = ref([
  { id: 1, name: "李明", className: "软件 2301" },
  { id: 2, name: "王小雨", className: "软件 2301" },
  { id: 3, name: "陈超", className: "软件 2302" },
  { id: 4, name: "张梦琪", className: "软件 2302" },
  { id: 5, name: "李思远", className: "网络 2301" },
  { id: 6, name: "赵倩", className: "网络 2301" },
]);

function findInput(el) {
  return el.tagName === "INPUT" ? el : el.querySelector("input");
}

const vFocus = {
  mounted(el) {
    const input = findInput(el);
    if (input) {
      input.focus();
    }
  },
};

const vDigits = {
  mounted(el) {
    const input = findInput(el);
    if (!input) {
      return;
    }
    input.addEventListener("input", function () {
      const filtered = input.value.replace(/\D/g, "");
      if (filtered !== input.value) {
        input.value = filtered;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  },
};

function paint(el, keyword) {
  if (keyword === "") {
    el.style.backgroundColor = "";
    return;
  }
  el.style.backgroundColor =
    el.textContent.indexOf(keyword) !== -1 ? "#fdf6ec" : "";
}

const vHighlight = {
  mounted(el, binding) {
    paint(el, binding.value);
  },
  updated(el, binding) {
    paint(el, binding.value);
  },
};
</script>

<template>
  <div class="practice">
    <div class="practice__row">
      <el-input
        v-focus
        v-model="keyword"
        placeholder="这个输入框会自动获得焦点"
        style="max-width: 320px"
      />
      <el-input
        v-digits
        v-model="phone"
        placeholder="试着输入字母和汉字"
        style="max-width: 320px"
      />
      <span class="practice__hint"
        >收到的值：{{ JSON.stringify(phone) }}</span
      >
    </div>

    <el-input
      v-model="keyword"
      placeholder="输入姓名里的一两个字，比如 李"
      style="max-width: 320px"
    />

    <ul class="list">
      <li
        v-for="item in students"
        :key="item.id"
        v-highlight="keyword"
        class="list__item"
      >
        <span class="list__name">{{ item.name }}</span>
        <span class="list__class">{{ item.className }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.practice__row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.practice__hint {
  font-size: 13px;
  color: #909399;
}

.list {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
  max-width: 420px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
}

.list__item {
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  font-size: 14px;
  border-bottom: 1px solid #f2f3f5;
  transition: background-color 0.2s;
}

.list__item:last-child {
  border-bottom: none;
}

.list__name {
  color: #303133;
}

.list__class {
  color: #909399;
  font-size: 13px;
}
</style>
