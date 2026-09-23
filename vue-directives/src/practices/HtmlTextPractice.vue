<script setup>
import { ref } from "vue";

const notice = ref(
  "<b>实训动员通知</b>：本周五 14:00 在 A301 教室集合，请携带<b>笔记本电脑</b>与校园卡。",
);

const custom = ref(
  '<img src="https://x.invalid/a.png" alt="我是被 v-html 插入的图片" width="120">',
);
</script>

<template>
  <div class="practice">
    <div class="compare">
      <div class="compare__item">
        <div class="compare__head">双大括号插值</div>
        <div class="compare__body">{{ notice }}</div>
      </div>

      <div class="compare__item">
        <div class="compare__head">v-text</div>
        <div class="compare__body" v-text="notice"></div>
      </div>

      <div class="compare__item">
        <div class="compare__head">v-html</div>
        <div class="compare__body" v-html="notice"></div>
      </div>
    </div>

    <el-input
      v-model="custom"
      type="textarea"
      :rows="2"
      placeholder="在这里输入一段带标签的内容"
    />

    <div class="compare">
      <div class="compare__item">
        <div class="compare__head">v-text 的结果</div>
        <div class="compare__body" v-text="custom"></div>
      </div>

      <div class="compare__item">
        <div class="compare__head">v-html 的结果</div>
        <div class="compare__body" v-html="custom"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
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

.compare__body {
  min-height: 64px;
  padding: 12px;
  font-size: 14px;
  line-height: 1.7;
  color: #303133;
  word-break: break-all;
}
</style>
