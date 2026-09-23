<script setup>
import { ref } from "vue";

function now() {
  const d = new Date();
  return (
    String(d.getHours()).padStart(2, "0") +
    ":" +
    String(d.getMinutes()).padStart(2, "0") +
    ":" +
    String(d.getSeconds()).padStart(2, "0")
  );
}

const clock = ref(now());

function refresh() {
  clock.value = now();
}

const footer = {
  company: "南京某某科技有限公司",
  service: "400-000-0000",
  since: "2019",
};
</script>

<template>
  <div class="practice">
    <el-button type="primary" @click="refresh">刷新时间</el-button>

    <div class="once-box">
      <div class="once-box__col">
        <div class="once-box__body">{{ clock }}</div>
      </div>

      <div class="once-box__col">
        <div class="once-box__body" v-once>{{ clock }}</div>
      </div>
    </div>

    <div class="once-box">
      <div class="once-box__col">
        <div class="once-box__body once-box__body--left" v-once>
          <div>{{ footer.company }}</div>
          <div>客服电话 {{ footer.service }}</div>
          <div>成立于 {{ footer.since }} 年</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.once-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  margin: 16px 0;
}

.once-box__col {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.once-box__body {
  min-height: 56px;
  padding: 14px 12px;
  font-size: 18px;
  color: #303133;
  text-align: center;
  font-family: Menlo, Consolas, monospace;
}

.once-box__body--left {
  font-size: 13px;
  line-height: 1.8;
  text-align: left;
  font-family: inherit;
  color: #606266;
}
</style>
