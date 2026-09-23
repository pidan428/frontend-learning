<script setup>
import { ref } from "vue";

const role = ref("guest");
const todoCount = ref(3);
</script>

<template>
  <div class="practice">
    <el-radio-group v-model="role" class="practice__toolbar">
      <el-radio-button value="guest">未登录</el-radio-button>
      <el-radio-button value="member">会员</el-radio-button>
      <el-radio-button value="admin">管理员</el-radio-button>
    </el-radio-group>

    <div v-if="role === 'guest'" class="tip tip--gray">
      <span class="tip__title">还没有登录</span>
      <span>登录后可以查看课程资料、提交实训作业。</span>
    </div>

    <div v-else-if="role === 'member'" class="tip tip--blue">
      <span class="tip__title">欢迎回来，李明</span>
      <span>你有 {{ todoCount }} 个待办任务，最近一次登录在昨天。</span>
    </div>

    <div v-else class="tip tip--gold">
      <span class="tip__title">管理员权限</span>
      <span>可以审批作业、导出成绩表、管理班级成员。</span>
    </div>
  </div>
</template>

<style scoped>
.practice__toolbar {
  margin-bottom: 16px;
}

.tip {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 14px;
  max-width: 640px;
  border-left: 4px solid transparent;
}

.tip__title {
  font-weight: 600;
}

.tip--gray {
  color: #606266;
  background: #f4f4f5;
  border-left-color: #909399;
}

.tip--blue {
  color: #1f6feb;
  background: #ecf5ff;
  border-left-color: #409eff;
}

.tip--gold {
  color: #a06a12;
  background: #fdf6ec;
  border-left-color: #e6a23c;
}
</style>
