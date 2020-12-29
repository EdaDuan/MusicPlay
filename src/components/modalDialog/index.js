import Vue from "vue";
import modalDialog from "./modalDialog.vue";
let mDialog = Vue.extend(modalDialog);
const TOAST = (text, duration) => {
  let dialog = new mDialog();
  let vm = dialog.$mount();
  let el = vm.$el;
  console.log(document.getElementsByClassName("modal-bg")[0]);
  if (!document.getElementsByClassName("modal-bg")[0]) {
    document.body.appendChild(el);
    vm.show = true;
    vm.text = text ? text : vm.text;
    vm.duration = duration ? duration : vm.duration;
    let timer = setTimeout(() => {
      clearTimeout(timer);
      document.body.removeChild(el);
      dialog.$destroy();
      vm = null; //设置为null 方便垃圾回收机制回收
    }, vm.duration);
  }
};
export default TOAST;
