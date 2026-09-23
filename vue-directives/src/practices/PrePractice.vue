<script setup>
import { ref } from "vue";

const message = ref("这句话来自数据");
const count = ref(0);
</script>

<template>
  <div class="practice">
    <div class="compare">
      <div class="compare__item">
        <div class="compare__body">
          <p>{{ message }}</p>
          <p>
            当前计数 {{ count }}，点这里试试：<span
              class="fake-link"
              @click="count++"
              >点我加一</span
            >
          </p>
        </div>
      </div>

      <div class="compare__item">
        <div class="compare__body compare__body--pre" v-pre>
          <p>{{ message }}</p>
          <p>
            当前计数 {{ count }}，点这里试试：<span class="fake-link"
              >点我加一</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.compare__item {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.compare__body {
  padding: 12px;
  font-size: 14px;
  line-height: 1.9;
  color: #303133;
}

.compare__body--pre {
  color: #909399;
  font-family: Menlo, Consolas, monospace;
  font-size: 13px;
}

.compare__body p {
  margin: 0 0 6px;
}

.fake-link {
  color: #409eff;
  cursor: pointer;
}
</style>
