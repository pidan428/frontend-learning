<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";

// 一、数据源：学生数组。视图切换只改变怎么显示，不改变这份数据
const students = [
  {
    id: "20230101",
    name: "林一鸣",
    className: "软件 2301",
    direction: "前端开发",
    score: 92,
    status: "active",
  },
  {
    id: "20230102",
    name: "周予安",
    className: "软件 2301",
    direction: "后端开发",
    score: 85,
    status: "active",
  },
  {
    id: "20230103",
    name: "苏晚晴",
    className: "软件 2302",
    direction: "前端开发",
    score: 78,
    status: "intern",
  },
  {
    id: "20230104",
    name: "陈砚舟",
    className: "软件 2302",
    direction: "数据开发",
    score: 64,
    status: "leave",
  },
  {
    id: "20230105",
    name: "顾星野",
    className: "软件 2302",
    direction: "后端开发",
    score: 88,
    status: "active",
  },
  {
    id: "20230106",
    name: "许知微",
    className: "软件 2303",
    direction: "测试开发",
    score: 71,
    status: "intern",
  },
  {
    id: "20230107",
    name: "沈墨白",
    className: "软件 2303",
    direction: "前端开发",
    score: 95,
    status: "active",
  },
  {
    id: "20230108",
    name: "叶清和",
    className: "软件 2303",
    direction: "数据开发",
    score: 59,
    status: "leave",
  },
];

// 二、视图模式：table / card / list / group
const viewMode = ref("table");

// 三、状态字典：数据和文案分开写
const STATUS_MAP = {
  active: { text: "在读", type: "success" },
  intern: { text: "实习中", type: "warning" },
  leave: { text: "休学", type: "info" },
};

// 四、成绩颜色
function scoreColor(score) {
  if (score >= 85) return "#0f9d58";
  if (score >= 70) return "#e6a23c";
  return "#f56c6c";
}

// 五、【新增】详情对话框
const currentStudent = ref(null);
const dialogVisible = ref(false);

function showDetail(student) {
  currentStudent.value = student;
  dialogVisible.value = true;
}

// 六、【新增】只看及格开关
const onlyPass = ref(false);

// 七、【新增】过滤后的数据（依赖 onlyPass）
const filteredStudents = computed(() => {
  if (!onlyPass.value) return students;
  return students.filter((stu) => stu.score >= 60);
});

// 八、【新增】按方向分组（依赖 filteredStudents，必须写在它后面）
const groupedStudents = computed(() => {
  const groups = {};
  filteredStudents.value.forEach((stu) => {
    if (!groups[stu.direction]) {
      groups[stu.direction] = [];
    }
    groups[stu.direction].push(stu);
  });
  return groups;
});
</script>

<template>
  <div class="page">
    <header class="page__head">
      <div>
        <h2 class="page__title">学生名单</h2>
        <p class="page__desc">
          共 {{ filteredStudents.length }} 人 · 切换视图用的是 v-if / v-else-if / v-else
        </p>
      </div>

      <div class="page__actions">
        <el-switch
          v-model="onlyPass"
          active-text="只看及格"
          class="page__switch"
        />

        <el-radio-group v-model="viewMode">
          <el-radio-button value="table">表格</el-radio-button>
          <el-radio-button value="card">卡片</el-radio-button>
          <el-radio-button value="list">名单</el-radio-button>
          <el-radio-button value="group">分组</el-radio-button>
        </el-radio-group>
      </div>
    </header>

    <!-- ===== 条件渲染：四块同一时间只出现一块 ===== -->

    <!-- 第一块：表格模式 -->
    <el-table v-if="viewMode === 'table'" :data="filteredStudents" stripe border>
      <el-table-column prop="id" label="学号" width="110" />
      <el-table-column label="姓名" width="150">
        <template #default="scope">
          <div class="cell-name">
            <el-avatar :size="28" class="avatar">{{
              scope.row.name.charAt(0)
            }}</el-avatar>
            <span class="cell-name__text">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="className" label="班级" width="120" />
      <el-table-column prop="direction" label="方向" />
      <el-table-column prop="score" label="成绩" width="100" sortable>
        <template #default="scope">
          <span class="score" :style="{ color: scoreColor(scope.row.score) }">{{
            scope.row.score
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110">
        <template #default="scope">
          <el-tag :type="STATUS_MAP[scope.row.status].type" effect="light">
            {{ STATUS_MAP[scope.row.status].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template #default="scope">
          <el-button link type="primary" @click="showDetail(scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 第二块：卡片模式 -->
    <el-row v-else-if="viewMode === 'card'" :gutter="16">
      <el-col
        v-for="item in filteredStudents"
        :key="item.id"
        :xs="24"
        :sm="12"
        :md="8"
        class="card-col"
      >
        <el-card shadow="hover" class="stu-card">
          <div class="stu-card__top">
            <el-avatar :size="48" class="avatar">{{
              item.name.charAt(0)
            }}</el-avatar>
            <div>
              <p class="stu-card__name">{{ item.name }}</p>
              <p class="stu-card__id">{{ item.id }} · {{ item.className }}</p>
            </div>
          </div>

          <div class="stu-card__tags">
            <el-tag size="small" effect="plain">{{ item.direction }}</el-tag>
            <el-tag size="small" :type="STATUS_MAP[item.status].type" effect="light">
              {{ STATUS_MAP[item.status].text }}
            </el-tag>
          </div>

          <p class="stu-card__score">成绩 {{ item.score }}</p>
          <el-progress
            :percentage="item.score"
            :color="scoreColor(item.score)"
            :stroke-width="8"
            :show-text="false"
          />

          <template #footer>
            <el-button link type="primary" @click="showDetail(item)"
              >查看详情</el-button
            >
          </template>
        </el-card>
      </el-col>
    </el-row>

    <!-- 第三块：名单模式 -->
    <ul v-else-if="viewMode === 'list'" class="name-list">
      <li v-for="item in filteredStudents" :key="item.id" class="name-list__item">
        <el-avatar :size="32" class="avatar">{{ item.name.charAt(0) }}</el-avatar>
        <span class="name-list__name">{{ item.name }}</span>
        <span class="name-list__meta"
          >{{ item.id }} · {{ item.className }} · {{ item.direction }}</span
        >
        <span class="score" :style="{ color: scoreColor(item.score) }">{{
          item.score
        }}</span>
        <el-tag size="small" :type="STATUS_MAP[item.status].type" effect="light">
          {{ STATUS_MAP[item.status].text }}
        </el-tag>
      </li>
    </ul>

    <!-- 第四块【新增】：按方向分组，v-else 兜底 -->
    <div v-else class="group-view">
      <div v-for="(list, dir) in groupedStudents" :key="dir" class="group-block">
        <h3 class="group-block__title">
          {{ dir }}
          <span class="group-block__count">（{{ list.length }} 人）</span>
        </h3>
        <div class="group-block__body">
          <div v-for="item in list" :key="item.id" class="group-item">
            <el-avatar :size="32" class="avatar">{{
              item.name.charAt(0)
            }}</el-avatar>
            <span class="group-item__name">{{ item.name }}</span>
            <span class="group-item__meta"
              >{{ item.id }} · {{ item.className }}</span
            >
            <span class="score" :style="{ color: scoreColor(item.score) }">{{
              item.score
            }}</span>
            <el-tag size="small" :type="STATUS_MAP[item.status].type" effect="light">
              {{ STATUS_MAP[item.status].text }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 【新增】详情对话框 -->
    <el-dialog v-model="dialogVisible" title="学生详情" width="420px">
      <div v-if="currentStudent" class="detail">
        <el-avatar :size="64" class="avatar">{{
          currentStudent.name.charAt(0)
        }}</el-avatar>
        <h3 class="detail__name">{{ currentStudent.name }}</h3>

        <div class="detail__row">
          <span class="detail__label">学号</span>
          <span>{{ currentStudent.id }}</span>
        </div>
        <div class="detail__row">
          <span class="detail__label">班级</span>
          <span>{{ currentStudent.className }}</span>
        </div>
        <div class="detail__row">
          <span class="detail__label">方向</span>
          <span>{{ currentStudent.direction }}</span>
        </div>
        <div class="detail__row">
          <span class="detail__label">成绩</span>
          <span :style="{ color: scoreColor(currentStudent.score) }">
            {{ currentStudent.score }}
          </span>
        </div>
        <div class="detail__row">
          <span class="detail__label">状态</span>
          <el-tag :type="STATUS_MAP[currentStudent.status].type" effect="light">
            {{ STATUS_MAP[currentStudent.status].text }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.page {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 16px;
}

.page__head {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page__title {
  margin: 0;
  font-size: 22px;
  color: #1f2329;
}

.page__desc {
  margin: 6px 0 0;
  font-size: 13px;
  color: #8a919f;
}

.page__actions {
  display: flex;
  align-items: center;
}

.page__switch {
  margin-right: 12px;
}

.score {
  font-weight: 600;
}

.avatar {
  background: #2f6fed;
  color: #fff;
  flex-shrink: 0;
}

/* ===== 表格美化 ===== */
:deep(.el-table) {
  border-radius: 10px;
  overflow: hidden;
  font-size: 14px;
}

:deep(.el-table th.el-table__cell) {
  background: #f7f9fc !important;
  color: #5c6470;
  font-weight: 600;
}

:deep(.el-table .el-table__row:hover > td.el-table__cell) {
  background: #f0f6ff !important;
}

.cell-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cell-name__text {
  font-weight: 600;
  color: #1f2329;
}

/* ===== 卡片模式 ===== */
.card-col {
  margin-bottom: 16px;
}

.stu-card__top {
  display: flex;
  gap: 12px;
  align-items: center;
}

.stu-card__name {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2329;
}

.stu-card__id {
  margin: 4px 0 0;
  font-size: 12px;
  color: #8a919f;
}

.stu-card__tags {
  display: flex;
  gap: 8px;
  margin: 14px 0;
}

.stu-card__score {
  margin: 0 0 6px;
  font-size: 13px;
  color: #5c6470;
}

/* ===== 名单模式 ===== */
.name-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}

.name-list__item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #f2f3f5;
}

.name-list__item:last-child {
  border-bottom: none;
}

.name-list__item:hover {
  background: #f7f9fc;
}

.name-list__name {
  width: 80px;
  font-weight: 600;
  color: #1f2329;
}

.name-list__meta {
  flex: 1;
  font-size: 13px;
  color: #8a919f;
}

/* ===== 分组模式【新增】 ===== */
.group-block {
  margin-bottom: 18px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}

.group-block__title {
  margin: 0;
  padding: 10px 16px;
  background: #f7f9fc;
  font-size: 15px;
  color: #1f2329;
}

.group-block__count {
  font-size: 13px;
  font-weight: normal;
  color: #8a919f;
}

.group-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid #f2f3f5;
}

.group-item:last-child {
  border-bottom: none;
}

.group-item:hover {
  background: #f7f9fc;
}

.group-item__name {
  width: 70px;
  font-weight: 600;
  color: #1f2329;
}

.group-item__meta {
  flex: 1;
  font-size: 13px;
  color: #8a919f;
}

/* ===== 详情对话框【新增】 ===== */
.detail {
  text-align: center;
}

.detail__name {
  margin: 12px 0 20px;
  font-size: 18px;
  color: #1f2329;
}

.detail__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f2f3f5;
  font-size: 14px;
}

.detail__row:last-child {
  border-bottom: none;
}

.detail__label {
  color: #8a919f;
}
</style>
