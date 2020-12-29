<template>
  <div class="barBoxItem">
    <i @click="handleClick()" :class="['itemIcon', 'icon', className]"></i>
    <p>{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: ["text", "className", "itemAction"],
  methods: {
    handleClick() {
      this.itemAction();
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/px2rem.scss";
.barBoxItem {
  display: table-cell;
  vertical-align: middle;
  width: 20%;
  color: #666666;
  text-align: center;
}
.barBoxItem i {
  display: inline-block;
}
.barBoxItem p {
  margin-top: px2rem(12);
  font-size: px2rem(20);
}
</style>
