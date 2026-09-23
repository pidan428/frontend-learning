<script setup>
import { ref } from "vue";

const showTab = ref("info");
const ifTab = ref("info");
</script>

<template>
  <div class="practice">
    <div class="compare">
      <div class="compare__item">
        <div class="compare__head">v-show</div>
        <el-radio-group v-model="showTab" size="small" class="compare__tabs">
          <el-radio-button value="info">基本信息</el-radio-button>
          <el-radio-button value="contact">联系方式</el-radio-button>
        </el-radio-group>

        <div v-show="showTab === 'info'" class="panel">
          <el-input placeholder="输入几个字，然后切到另一页" />
        </div>

        <div v-show="showTab === 'contact'" class="panel">
          <el-input placeholder="输入几个字，然后切回上一页" />
        </div>
      </div>

      <div class="compare__item">
        <div class="compare__head compare__head--warn">v-if</div>
        <el-radio-group v-model="ifTab" size="small" class="compare__tabs">
          <el-radio-button value="info">基本信息</el-radio-button>
          <el-radio-button value="contact">联系方式</el-radio-button>
        </el-radio-group>

        <div v-if="ifTab === 'info'" class="panel">
          <el-input placeholder="输入几个字，然后切到另一页" />
        </div>

        <div v-else class="panel">
          <el-input placeholder="输入几个字，然后切回上一页" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.compare__item {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 14px;
  background: #fff;
}

.compare__head {
  font-size: 13px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 10px;
}

.compare__head--warn {
  color: #e6a23c;
}

.compare__tabs {
  margin-bottom: 12px;
}
</style>
