<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <i class="icon icon-warnning"></i>
      <p class="modal-text">{{ text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "text",
      duration: 3000,
      show: true,
    };
  },
};
</script>
<style>
.modal-bg {
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 4rem;
  padding: 0.5rem 0;
  color: #eee;
  text-align: center;
  background: rgb(0, 0, 0, 0.3);
  background: #333333;
  border-radius: 8%;
}
.modal-container i {
  display: inline-block;
}
.modal-text {
  line-height: 2rem;
  font-size: 1rem;
}
</style>
