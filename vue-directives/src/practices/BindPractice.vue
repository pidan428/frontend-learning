<script setup>
import { ref } from "vue";

const member = {
  name: "李明",
  homePage: "https://cn.vuejs.org",
  points: 2860,
};

const avatars = [
  "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/4.jpg",
  "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/5.jpg",
  "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/6.jpg",
  "https://infinityx7-oss.oss-cn-hangzhou.aliyuncs.com/avatar/7.jpg",
];
const avatarIndex = ref(0);

const themes = [
  { label: "普通", color: "#909399" },
  { label: "黄金", color: "#e6a23c" },
  { label: "铂金", color: "#409eff" },
];
const themeIndex = ref(0);

const isVip = ref(false);

function nextAvatar() {
  avatarIndex.value = (avatarIndex.value + 1) % avatars.length;
}
</script>

<template>
  <div class="practice">
    <div class="practice__toolbar">
      <el-radio-group v-model="themeIndex" size="small">
        <el-radio-button v-for="(t, i) in themes" :key="t.label" :value="i">
          {{ t.label }}
        </el-radio-button>
      </el-radio-group>
      <el-switch v-model="isVip" active-text="VIP 状态" />
    </div>

    <div
      class="member-card"
      :class="{ 'is-vip': isVip }"
      :style="{ '--main-color': themes[themeIndex].color }"
    >
      <img
        class="member-card__avatar"
        :src="avatars[avatarIndex]"
        :alt="member.name"
      />

      <div class="member-card__info">
        <div class="member-card__name">
          {{ member.name }}
          <span
            :class="[
              'member-card__badge',
              isVip ? 'member-card__badge--on' : '',
            ]"
          >
            {{ isVip ? "VIP 会员" : "普通用户" }}
          </span>
        </div>
        <div class="member-card__meta">
          积分 {{ member.points }} · 皮肤 {{ themes[themeIndex].label }}
        </div>
        <a
          :href="member.homePage"
          target="_blank"
          :title="'打开 ' + member.name + ' 的主页'"
        >
          个人主页
        </a>
      </div>

      <div class="member-card__actions">
        <el-button type="primary" size="small" :disabled="!isVip"
          >升级权益</el-button
        >
        <el-button size="small" @click="nextAvatar">换头像</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice__toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.member-card {
  --main-color: #909399;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border: 2px solid var(--main-color);
  border-radius: 12px;
  background: #fff;
  max-width: 620px;
  transition: border-color 0.2s;
}

.member-card.is-vip {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.member-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--main-color);
}

.member-card__info {
  flex: 1;
  min-width: 0;
}

.member-card__name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.member-card__badge {
  margin-left: 8px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 10px;
  color: #909399;
  background: #f4f4f5;
}

.member-card__badge--on {
  color: #fff;
  background: var(--main-color);
}

.member-card__meta {
  margin: 4px 0 8px;
  font-size: 13px;
  color: #909399;
}

.member-card__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
