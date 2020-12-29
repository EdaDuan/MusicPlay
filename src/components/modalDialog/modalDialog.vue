<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <i class="listIcon icon-warnning"></i>
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
      show: true
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
  transform: translate(-50%,-50%);
  width: 50%;
  height: 12vh;
  color: #eee;
  text-align: center;
  background: rgb(0,0,0,0.3);
  background: #333333;
  border-radius: 8%;
}
.modal-container i {
  width: 2rem;
  height: 2rem;
}
.modal-text {
  height: 5vh;
  line-height: 5vh;
  font-size: 1rem;
}
</style>
