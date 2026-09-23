<script setup>
import { ref } from "vue";

const priceWrong = ref("12");
const priceRight = ref(12);
const count = ref(2);
const code = ref("");
const remark = ref("");
const remarkTyping = ref("");

const shipping = 5;

function onRemarkInput(event) {
  remarkTyping.value = event.target.value;
}

function subtotal() {
  return priceRight.value * count.value;
}
</script>

<template>
  <div class="practice">
    <div class="layout">
      <div class="layout__item">
        <input v-model="priceWrong" class="native-input" />
        <ul class="readout">
          <li>值：{{ JSON.stringify(priceWrong) }}</li>
          <li>类型：{{ typeof priceWrong }}</li>
          <li class="readout__bad">加 5 元运费：{{ priceWrong + shipping }}</li>
        </ul>
      </div>

      <div class="layout__item">
        <input v-model.number="priceRight" class="native-input" />
        <ul class="readout">
          <li>值：{{ JSON.stringify(priceRight) }}</li>
          <li>类型：{{ typeof priceRight }}</li>
          <li class="readout__good">加 5 元运费：{{ priceRight + shipping }}</li>
        </ul>
      </div>
    </div>

    <div class="layout">
      <div class="layout__item">
        <input
          v-model.trim="code"
          class="native-input"
          placeholder="前后各敲几个空格再输入内容"
        />
        <ul class="readout">
          <li>值：{{ JSON.stringify(code) }}</li>
        </ul>
      </div>

      <div class="layout__item">
        <input
          v-model.lazy="remark"
          class="native-input"
          placeholder="输入后不要点别处，直接看下面的对比"
          @input="onRemarkInput"
        />
        <ul class="readout">
          <li>正在输入：{{ JSON.stringify(remarkTyping) }}</li>
          <li
            :class="remark === remarkTyping ? 'readout__good' : 'readout__warn'"
          >
            已同步：{{ JSON.stringify(remark) }}
          </li>
        </ul>
      </div>
    </div>

    <div class="practice__log">
      数量 {{ count }} 件 × 单价 {{ priceRight }} 元 = 小计 {{ subtotal() }} 元
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
  margin-bottom: 14px;
}

.layout__item {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 12px 14px;
  background: #fff;
}

.native-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  color: #303133;
  outline: none;
}

.native-input:focus {
  border-color: #409eff;
}

.readout {
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  line-height: 1.9;
  color: #606266;
  font-family: Menlo, Consolas, monospace;
}

.readout__bad {
  color: #f56c6c;
}

.readout__good {
  color: #67c23a;
}

.readout__warn {
  color: #e6a23c;
}

.practice__log {
  padding: 10px 14px;
  border-radius: 8px;
  background: #f5f7fa;
  font-size: 13px;
  color: #303133;
  font-family: Menlo, Consolas, monospace;
}
</style>
