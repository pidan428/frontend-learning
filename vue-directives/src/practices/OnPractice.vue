<script setup>
import { ref } from "vue";

const likes = ref(128);
const collected = ref(false);
const keyword = ref("");
const log = ref("还没有产生事件");

const outerCount = ref(0);
const innerCount = ref(0);

function addLike() {
  likes.value++;
  log.value = "addLike() 被调用，点赞数 +1";
}

function countInline() {
  log.value = "内联语句执行完毕，当前点赞数 " + likes.value;
}

function toggleCollect() {
  collected.value = !collected.value;
  log.value = collected.value ? "已收藏" : "已取消收藏";
}

function handleEnter() {
  log.value =
    keyword.value.trim() === ""
      ? "回车了，但输入框是空的"
      : "回车提交：" + keyword.value;
}

function clearKeyword() {
  keyword.value = "";
  log.value = "按 Esc 清空了输入框";
}

function showEvent(event) {
  log.value =
    "点击的是 " +
    event.target.tagName +
    "，坐标 " +
    event.clientX +
    ", " +
    event.clientY;
}

function outerClick() {
  outerCount.value++;
  log.value = "冒泡到了外层容器";
}

function innerClick() {
  innerCount.value++;
  log.value = "内层被点击，不会继续冒泡";
}

function onceTip() {
  log.value = "这个按钮只会响应一次点击，再点没反应了";
}
</script>

<template>
  <div class="practice">
    <div class="practice__toolbar">
      <el-button type="primary" @click="addLike">点赞 {{ likes }}</el-button>
      <el-button
        @click="
          likes++;
          countInline();
        "
        >内联语句 +1</el-button
      >
      <el-button
        :type="collected ? 'warning' : 'default'"
        @click="toggleCollect"
      >
        {{ collected ? "已收藏" : "收藏" }}
      </el-button>
      <el-button @click.once="onceTip">只能点一次</el-button>
    </div>

    <div class="practice__toolbar">
      <el-input
        v-model="keyword"
        placeholder="输入关键词后按回车"
        style="max-width: 260px"
        clearable
        @keyup.enter="handleEnter"
        @keyup.esc="clearKeyword"
      />
      <el-button @click="showEvent($event)">打印事件对象</el-button>
    </div>

    <form class="practice__form" @submit.prevent="handleEnter">
      <el-button type="success" native-type="submit">提交搜索</el-button>
    </form>

    <div class="event-box" @click="outerClick">
      <span>外层容器被点了 {{ outerCount }} 次</span>
      <div class="event-box__inner" @click.stop="innerClick">
        内层被点了 {{ innerCount }} 次
      </div>
    </div>

    <div class="practice__log">{{ log }}</div>
  </div>
</template>

<style scoped>
.practice__toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.practice__form {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.event-box {
  padding: 16px;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  font-size: 13px;
  color: #606266;
  cursor: pointer;
  max-width: 420px;
}

.event-box__inner {
  margin-top: 12px;
  padding: 12px;
  border-radius: 6px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
}

.practice__log {
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f5f7fa;
  font-size: 13px;
  color: #303133;
  font-family: Menlo, Consolas, monospace;
  max-width: 620px;
}
</style>
