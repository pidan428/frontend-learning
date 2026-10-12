<script setup>
import { ref } from 'vue'

const user = ref({
  name: '张子谦',
  avatar: 'https://workbuddy-space-static.codebuddy.work/image/TxvS0ryyZtUgS9J1hZySkm.png',
  role: 'organizer',
  onDuty: true,
  skills: ['活动策划', '海报设计', '现场协调']
})


const roleInfo  = {
  organizer: '活动组织者',
  auditor: '审核员',
  student: '学生'
}

// 主题色放状态里，至少三个候选
const themes = [
  { name: '青绿', accent: '#5ca67b' },
  { name: '海洋蓝', accent: '#378add' },
  { name: '活力橙', accent: '#e2832b' }
]
const themeIndex = ref(0)
</script>

<template>
  <div class="card" :style="{ '--accent': themes[themeIndex].accent }">
    <img class="avatar" :src="user.avatar" alt="头像" />
    <h2>{{ user.name }}</h2>

    <!-- 对象形式的类名绑定：三种角色三种配色 -->
    <span
      class="role"
      :class="{
        'role--organizer': user.role === 'organizer',
        'role--auditor': user.role === 'auditor',
        'role--student': user.role === 'student'
      }"
    >
      {{ roleInfo[user.role] }}
    </span>

    <!-- 在岗/请假：文字和颜色都跟状态走 -->
    <span class="status" :class="user.onDuty ? 'on' : 'off'">
      {{ user.onDuty ? '在岗' : '请假中' }}
    </span>

    <div class="actions">
      <button
        v-for="(t, i) in themes"
        :key="t.name"
        :class="{ active: i === themeIndex }"
        @click="themeIndex = i"
      >
        {{ t.name }}
      </button>
      <button @click="user.onDuty = !user.onDuty">
        {{ user.onDuty ? '去请假' : '返岗' }}
      </button>
    </div>

    <h3>技能</h3>
    <ul class="skills">
      <li v-for="skill in user.skills" :key="skill">{{ skill }}</li>
    </ul>
  </div>
</template>

<style>
.card {
  --accent: #5ca67b; /* 默认值，会被 :style 覆盖 */
  width: 360px;
  padding: 28px;
  border-radius: 20px;
  background: #ffffff;
  border-top: 6px solid var(--accent);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  font-family: system-ui, "Microsoft YaHei", sans-serif;
  text-align: center;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 3px solid var(--accent);
}

h2 { font-size: 20px; font-weight: 600; margin: 12px 0 8px; }

.role, .status {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 12px;
  margin: 0 3px;
}

.role--organizer { background: #eaf3de; color: #3b6d11; }
.role--auditor   { background: #e6f1fb; color: #185fa5; }
.role--student   { background: #faeeda; color: #854f0b; }

.status.on  { background: #eaf3de; color: #3b6d11; }
.status.off { background: #fcebeb; color: #a32d2d; }

.actions { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin: 18px 0; }

.actions button {
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
}

.actions button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #ffffff;
}

h3 { font-size: 14px; font-weight: 500; color: #888780; margin: 4px 0 10px; text-align: left; }

.skills { list-style: none; padding: 0; margin: 0; display: flex; gap: 8px; flex-wrap: wrap; }

.skills li {
  padding: 5px 14px;
  font-size: 13px;
  border: 1px solid var(--accent);
  border-radius: 999px;
  color: var(--accent);
}
</style>

