<script setup>
import { ref } from "vue";

const students = ref([
  { id: 1, name: "李明", className: "软件 2301", score: 92 },
  { id: 2, name: "王小雨", className: "软件 2301", score: 88 },
  { id: 3, name: "陈超", className: "软件 2302", score: 76 },
  { id: 4, name: "张梦琪", className: "软件 2302", score: 95 },
  { id: 5, name: "李思远", className: "网络 2301", score: 81 },
  { id: 6, name: "赵倩", className: "网络 2301", score: 69 },
  { id: 7, name: "孙浩然", className: "网络 2302", score: 84 },
  { id: 8, name: "周欣", className: "网络 2302", score: 90 },
]);

const activeId = ref(1);
const noise = ref(0);
const wrongDeps = ref(false);

function select(id) {
  activeId.value = id;
}

function bumpNoise() {
  noise.value++;
}

function stamp() {
  const d = new Date();
  return (
    String(d.getMinutes()).padStart(2, "0") +
    ":" +
    String(d.getSeconds()).padStart(2, "0") +
    "." +
    String(d.getMilliseconds()).padStart(3, "0")
  );
}
</script>

<template>
  <div class="practice">
    <div class="practice__toolbar">
      <el-button type="primary" @click="bumpNoise">改动一个无关数据</el-button>
      <span class="hint">{{ noise }}</span>
      <el-switch v-model="wrongDeps" active-text="把依赖数组写空" />
    </div>

    <div class="layout">
      <div class="layout__col">
        <ul class="rows">
          <li
            v-for="item in students"
            :key="item.id"
            v-memo="wrongDeps ? [] : [item.id === activeId]"
            :class="['row', item.id === activeId ? 'row--active' : '']"
            @click="select(item.id)"
          >
            <span class="row__name">{{ item.name }}</span>
            <span class="row__cls">{{ item.className }}</span>
            <span class="row__score">{{ item.score }}</span>
            <span class="row__stamp">{{ stamp() }}</span>
          </li>
        </ul>
      </div>

      <div class="layout__col">
        <ul class="rows">
          <li
            v-for="item in students"
            :key="item.id"
            :class="['row', item.id === activeId ? 'row--active' : '']"
            @click="select(item.id)"
          >
            <span class="row__name">{{ item.name }}</span>
            <span class="row__cls">{{ item.className }}</span>
            <span class="row__score">{{ item.score }}</span>
            <span class="row__stamp">{{ stamp() }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice__toolbar {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.hint {
  font-size: 13px;
  color: #909399;
  min-width: 20px;
}

.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.rows {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr 40px 80px;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 13px;
  border-bottom: 1px solid #f2f3f5;
  cursor: pointer;
}

.row:last-child {
  border-bottom: none;
}

.row--active {
  background: #ecf5ff;
  box-shadow: inset 3px 0 0 #409eff;
}

.row__name {
  color: #303133;
}

.row__cls {
  color: #909399;
}

.row__score {
  color: #f56c6c;
  text-align: right;
}

.row__stamp {
  color: #c0c4cc;
  font-family: Menlo, Consolas, monospace;
  font-size: 12px;
  text-align: right;
}
</style>
