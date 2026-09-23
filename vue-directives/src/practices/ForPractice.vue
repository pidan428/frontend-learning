<script setup>
import { ref } from "vue";

const cart = ref([
  { id: 101, name: "机械键盘", price: 299, count: 1 },
  { id: 102, name: "无线鼠标", price: 89, count: 2 },
  { id: 103, name: "显示器支架", price: 169, count: 1 },
]);

const tags = ["机房 A301", "每周五 14:00", "自备笔记本电脑"];

const spec = { 品牌: "某某", 保修: "两年", 产地: "南京" };

const rating = 4;

function increase(item) {
  item.count++;
}

function decrease(item) {
  if (item.count > 1) {
    item.count--;
  }
}

function removeItem(index) {
  cart.value.splice(index, 1);
}

function sum() {
  let total = 0;
  for (let i = 0; i < cart.value.length; i++) {
    total = total + cart.value[i].price * cart.value[i].count;
  }
  return total;
}
</script>

<template>
  <div class="practice">
    <table v-if="cart.length > 0" class="cart">
      <thead>
        <tr>
          <th>商品</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.id">
          <td>{{ item.name }}</td>
          <td>¥{{ item.price }}</td>
          <td>
            <div class="cart__count">
              <el-button size="small" @click="decrease(item)">-</el-button>
              <span>{{ item.count }}</span>
              <el-button size="small" @click="increase(item)">+</el-button>
            </div>
          </td>
          <td class="cart__sub">¥{{ item.price * item.count }}</td>
          <td>
            <el-button
              size="small"
              type="danger"
              plain
              @click="removeItem(index)"
              >删除</el-button
            >
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">合计</td>
          <td colspan="2" class="cart__total">¥{{ sum() }}</td>
        </tr>
      </tfoot>
    </table>

    <el-empty v-else description="购物车已经清空了" />

    <div class="grid">
      <div class="grid__item">
        <el-tag v-for="tag in tags" :key="tag" class="grid__tag">
          {{ tag }}
        </el-tag>
      </div>

      <div class="grid__item">
        <ul class="spec">
          <li v-for="(value, key, index) in spec" :key="key">
            {{ index }}. {{ key }}：{{ value }}
          </li>
        </ul>
      </div>

      <div class="grid__item">
        <div class="stars">
          <span
            v-for="n in 5"
            :key="n"
            :class="['star', n <= rating ? 'star--on' : '']"
            >★</span
          >
          <span class="stars__text">{{ rating }}.0 分</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  width: 100%;
  max-width: 700px;
  border-collapse: collapse;
  font-size: 14px;
  margin-bottom: 20px;
}

.cart th,
.cart td {
  padding: 10px 12px;
  border: 1px solid #e4e7ed;
  text-align: left;
}

.cart th {
  background: #fafafa;
  color: #303133;
  font-weight: 600;
}

.cart td {
  color: #606266;
}

.cart__count {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart__sub {
  color: #f56c6c;
}

.cart__total {
  color: #f56c6c;
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.grid__item {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 12px 14px;
  background: #fff;
}

.grid__tag {
  margin: 0 6px 6px 0;
}

.spec {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #606266;
  line-height: 1.9;
}

.stars {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  font-size: 20px;
  color: #dcdfe6;
}

.star--on {
  color: #e6a23c;
}

.stars__text {
  margin-left: 8px;
  font-size: 13px;
  color: #909399;
}
</style>
