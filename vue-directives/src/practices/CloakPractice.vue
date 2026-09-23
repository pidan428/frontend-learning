<script setup>
import { ref } from "vue";

const reloadKey = ref(0);

function reload() {
  reloadKey.value++;
}
</script>

<template>
  <div class="practice">
    <el-button type="primary" @click="reload">重新加载两个窗口</el-button>

    <div class="compare">
      <div class="compare__item">
        <div class="compare__head">加了 v-cloak</div>
        <iframe
          :key="'cloak-' + reloadKey"
          class="frame"
          src="/v-cloak-demo.html?mode=cloak"
          title="带 v-cloak 的演示"
        ></iframe>
      </div>

      <div class="compare__item">
        <div class="compare__head compare__head--warn">不加 v-cloak</div>
        <iframe
          :key="'raw-' + reloadKey"
          class="frame"
          src="/v-cloak-demo.html?mode=raw"
          title="没有 v-cloak 的演示"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin: 16px 0 0;
}

.compare__item {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.compare__head {
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #409eff;
  background: #ecf5ff;
}

.compare__head--warn {
  color: #e6a23c;
  background: #fdf6ec;
}

.frame {
  display: block;
  width: 100%;
  height: 170px;
  border: none;
}
</style>
