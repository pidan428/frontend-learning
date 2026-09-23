<script setup>
import { ref } from "vue";

import BindPractice from "./practices/BindPractice.vue";
import OnPractice from "./practices/OnPractice.vue";
import HtmlTextPractice from "./practices/HtmlTextPractice.vue";
import OncePractice from "./practices/OncePractice.vue";
import IfPractice from "./practices/IfPractice.vue";
import ShowPractice from "./practices/ShowPractice.vue";
import ForPractice from "./practices/ForPractice.vue";
import ModelPractice from "./practices/ModelPractice.vue";
import ModelModifierPractice from "./practices/ModelModifierPractice.vue";
import DirectivePractice from "./practices/DirectivePractice.vue";
import MemoPractice from "./practices/MemoPractice.vue";
import CloakPractice from "./practices/CloakPractice.vue";
import PrePractice from "./practices/PrePractice.vue";

const tabs = [
  { name: "bind", label: "v-bind", comp: BindPractice },
  { name: "on", label: "v-on", comp: OnPractice },
  { name: "htmltext", label: "v-html / v-text", comp: HtmlTextPractice },
  { name: "once", label: "v-once", comp: OncePractice },
  { name: "if", label: "v-if", comp: IfPractice },
  { name: "show", label: "v-show", comp: ShowPractice },
  { name: "for", label: "v-for", comp: ForPractice },
  { name: "model", label: "v-model", comp: ModelPractice },
  { name: "modelmod", label: "v-model 修饰符", comp: ModelModifierPractice },
  { name: "directive", label: "自定义指令", comp: DirectivePractice },
  { name: "memo", label: "v-memo", comp: MemoPractice },
  { name: "cloak", label: "v-cloak", comp: CloakPractice },
  { name: "pre", label: "v-pre", comp: PrePractice },
];

const activeTab = ref("bind");
</script>

<template>
  <div class="page">
    <el-tabs v-model="activeTab" type="border-card" class="page__tabs">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <component :is="tab.comp" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 24px 60px;
}

.page__tabs {
  background: #fff;
}
</style>
