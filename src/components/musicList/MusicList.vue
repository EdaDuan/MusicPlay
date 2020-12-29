<template>
  <div class="showList" v-show="isShow">
    <div class="hiddenList">
      <div class="allList">共{{ musicList.length }}首</div>
      <i class="hiddenBtn icon icon-pickUp" @click="hidden()"></i>
    </div>
    <!-- 展示列表 -->
    <div class="listShow">
      <div
        class="musicCon"
        v-for="(item, index) in musicList"
        :key="item.music_num"
      >
        <div
          class="musicStatus"
          :class="{
            'playCurt icon icon-playCurt': changeSelectStyle === item.music_num,
          }"
        >
          {{ index + 1 }}
        </div>
        <div class="musicName" @click="handPlay(item.music_num)">
          <span :class="{ changeStyle: changeSelectStyle === item.music_num }">
            {{ item.music_name }}
          </span>
          <div class="musicTime">
            <i class="icon icon-time"></i>
            <span>
              {{ item.music_time }}
            </span>
          </div>
        </div>
        <div class="musicCollecte" @click="collect(item.music_num)">
          <i
            :class="item.music_like ? 'icon-li_collected' : 'icon-li_collect'"
            class="icon"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changeSelectStyle: "",
    };
  },
  props: [
    "musicList",
    "currentIndex",
    "isShow",
    "collected",
    "play",
    "showList",
  ],
  updated() {
    this.changeSelectStyle = this.currentIndex;
  },
  methods: {
    hidden() {
      this.showList();
    },
    handPlay(num) {
      this.changeSelectStyle = num;
      this.play(num);
    },
    collect(num) {
      this.collected(num);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/px2rem.scss";
.changeStyle {
  color: #ff8400;
}
.playCurt {
  font-size: 0;
}
.showList {
  position: fixed;
  width: 100%;
  height: px2rem(940);
  min-height: 70%;
  bottom: 0;
  z-index: 10;
}
.hiddenList {
  position: fixed;
  width: 100%;
  height: px2rem(103);
  line-height: px2rem(103);
  background: #f8f8f8;
  -webkit-border-radius: px2rem(40) px2rem(40) 0 0;
  -moz-border-radius: px2rem(40) px2rem(40) 0 0;
}
.allList {
  margin-left: px2rem(40);
  float: left;
  font-size: px2rem(32);
  color: #333333;
}
.hiddenBtn {
  margin-right: px2rem(40);
  margin-top: px2rem(40);
  float: right;
}
.listShow {
  position: relative;
  height: 90%;
  width: 100%;
  top: px2rem(100);
  background: #fff;
  overflow-y: scroll;
}
.musicCon {
  height: px2rem(148);
  padding: 0 px2rem(40);
  overflow: hidden;
  color: #acacac;
  font-size: px2rem(32);
  border-bottom: px2rem(0.5) solid #f1f1f1;
}
.musicStatus {
  float: left;
  width: px2rem(32);
  height: px2rem(32);
  margin-top: px2rem(64);
  margin-right: px2rem(32);
  line-height: px2rem(32);
}
.musicName {
  float: left;
  width: px2rem(480);
  height: px2rem(92);
  line-height: px2rem(48);
  margin-top: px2rem(32);
  color: #333333;
}
.musicName span:first-child {
  display: inline-block;
  width: px2rem(480);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.musicTime {
  height: px2rem(32);
  line-height: px2rem(32);
  color: #acacac;
}
.musicTime i {
  display: inline-block;
  padding-right: px2rem(4);
}
.musicCollecte {
  float: right;
  width: px2rem(42);
  line-height: px2rem(148);
}
.musicCollecte i {
  display: inline-block;
}
</style>
