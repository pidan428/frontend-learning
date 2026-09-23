<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  intro: "",
  gender: "男",
  interests: ["前端"],
  grade: "2024",
  dorm: false,
  agree: false,
});

const handWritten = ref("");
</script>

<template>
  <div class="practice">
    <div class="layout">
      <el-form label-width="86px" class="layout__form">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>

        <el-form-item label="个人简介">
          <el-input
            v-model="form.intro"
            type="textarea"
            :rows="3"
            placeholder="一句话介绍自己"
          />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio value="男">男</el-radio>
            <el-radio value="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="感兴趣方向">
          <el-checkbox-group v-model="form.interests">
            <el-checkbox value="前端">前端</el-checkbox>
            <el-checkbox value="后端">后端</el-checkbox>
            <el-checkbox value="测试">测试</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="入学年份">
          <el-select v-model="form.grade" style="width: 160px">
            <el-option label="2024 级" value="2024" />
            <el-option label="2025 级" value="2025" />
            <el-option label="2026 级" value="2026" />
          </el-select>
        </el-form-item>

        <el-form-item label="是否住宿">
          <el-switch v-model="form.dorm" />
        </el-form-item>

        <el-form-item label=" ">
          <el-checkbox v-model="form.agree">我已阅读并同意实训须知</el-checkbox>
        </el-form-item>
      </el-form>

      <div class="layout__preview">
        <table class="preview">
          <thead>
            <tr>
              <th>字段</th>
              <th>值</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>{{ JSON.stringify(form.name) }}</td>
              <td>{{ typeof form.name }}</td>
            </tr>
            <tr>
              <td>intro</td>
              <td>{{ JSON.stringify(form.intro) }}</td>
              <td>{{ typeof form.intro }}</td>
            </tr>
            <tr>
              <td>gender</td>
              <td>{{ JSON.stringify(form.gender) }}</td>
              <td>{{ typeof form.gender }}</td>
            </tr>
            <tr>
              <td>interests</td>
              <td>{{ JSON.stringify(form.interests) }}</td>
              <td>
                {{
                  Array.isArray(form.interests)
                    ? "array"
                    : typeof form.interests
                }}
              </td>
            </tr>
            <tr>
              <td>grade</td>
              <td>{{ JSON.stringify(form.grade) }}</td>
              <td>{{ typeof form.grade }}</td>
            </tr>
            <tr>
              <td>dorm</td>
              <td>{{ JSON.stringify(form.dorm) }}</td>
              <td>{{ typeof form.dorm }}</td>
            </tr>
            <tr>
              <td>agree</td>
              <td>{{ JSON.stringify(form.agree) }}</td>
              <td>{{ typeof form.agree }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="sugar">
      <div class="sugar__item">
        <input
          v-model="handWritten"
          class="native-input"
          placeholder="随便输点内容"
        />
      </div>

      <div class="sugar__item">
        <input
          :value="handWritten"
          class="native-input"
          placeholder="随便输点内容"
          @input="handWritten = $event.target.value"
        />
      </div>
    </div>

    <div class="practice__log">当前值：{{ JSON.stringify(handWritten) }}</div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(280px, 1fr);
  gap: 20px;
  align-items: start;
  margin-bottom: 20px;
}

.layout__preview {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.preview {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.preview th,
.preview td {
  padding: 6px 10px;
  border-bottom: 1px solid #f2f3f5;
  text-align: left;
  word-break: break-all;
}

.preview th {
  color: #909399;
  font-weight: 500;
  background: #ecf5ff;
}

.preview td {
  color: #303133;
  font-family: Menlo, Consolas, monospace;
}

.sugar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.sugar__item {
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

.practice__log {
  margin-top: 14px;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f5f7fa;
  font-size: 13px;
  color: #303133;
  font-family: Menlo, Consolas, monospace;
}
</style>
