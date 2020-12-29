<template>
<!-- 底部导航栏 -->
  <div class="bar">
    <div class="barBox">
      <!-- 单个选项框 -->
      <div class="barBoxItem" v-for="item in barList" :key="item.id">
        <i @click="handleClick(item.id)" v-bind:class="['icon', item.statusClass[item.status]]"></i>
        <p>{{ item.statusText[item.status] }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../../bus/bus";
export default {
  data() {
    return {
    };
  },
  props: ["musicList", "barList", "currentIndex"],
  components: {},
  mounted() {},
  updated() {},
  methods: {
    handleClick(id) {
      switch (id) {
        case 1:
          {
            this.$emit("collected");
          }
          break;
        case 2:
          {
            bus.$emit("Show");
          }
          break;
        case 3:
          this.$emit("playOrPause");
          break;
        case 4:
          this.$emit("nextAudio");
          break;
        case 5:
          {
            this.$emit("modelChange");
          }
          break;
      }
    },
  },
};
</script>
<style>
.bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7.127rem;
  background: url("../../assets/images/nav-bg.png") no-repeat;
  background-size: 100% 100%;
}
.barBox {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
}
.barBoxItem {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  line-height: 1rem;
  float: left;
  width: 20%;
  height: 3.5rem;
  color: #666666;
}
.barBoxItem p {
  padding-top: 0.1rem;
  font-size: 0.5rem;
}
</style>
