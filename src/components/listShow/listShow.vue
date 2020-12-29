<template>
  <div class="showList" v-show="isShow">
    <div class="hiddenList">
      <div class="allList">共{{ musicList.length }}首</div>
      <i class="hiddenbtn listIcon icon-pickUp" @click="Hidden()"></i>
    </div>
    <!-- 展示列表 -->
    <div class="listShow">
      <div
        class="musicCon"
        v-for="(item, index) in musicList"
        :key="item.music_num"
      >
        <div
          class="musicCon_msgsta"
          :class="{ 'playCurt listIcon icon-playCurt': changeSelectStyle === index }"
        >
          {{ item.music_num + 1 }}
        </div>
        <div class="musicCon_msgname" @click="handPlay(item.music_num)">
          <span
            :class="{ changeStyle: changeSelectStyle === index }"
          >
            {{ item.music_name }}
          </span>
          <div class="musicCon_time">
            <i class="listIcon icon-time"></i>
            <span>
              {{ item.music_time }}
            </span>
          </div>
        </div>
        <div class="musicCon_coll" @click="Collect(item.music_num)">
          <i :class="item.music_like? 'icon-li_collected':'icon-li_collect'" class="listIcon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../../bus/bus";
export default {
  data() {
    return {
      isShow: false,
      allSong: "1",
      changeSelectStyle: "",
    };
  },
  props: ["musicList", "currentIndex"],
  created() {
    bus.$on("Show", () => {
      this.isShow = true;
    });
  },
  mounted() {
    console.log(this.currentIndex);
  },
  updated() {
    this.changeSelectStyle = this.currentIndex;
  },
  methods: {
    Hidden() {
      this.isShow = false;
    },
    handPlay(num) {
      this.changeSelectStyle = num;
      this.$emit("play", num);
    },
    Collect(num) {
      this.$emit("collected", num);
    },
  },
};
</script>
<style scoped>
.changeStyle {
  color: #ff8400;
}
.playCurt {
  font-size: 0;
}
.showList {
  position: fixed;
  width: 100%;
  height: 23.5rem;
  bottom: 0;
  z-index: 10;
}
.hiddenList {
  position: fixed;
  width: 90%;
  height: 2.575rem;
  line-height: 2.575rem;
  padding: 0 1rem;
  background: #f8f8f8;
  -webkit-border-radius: 1rem 1rem 0 0;
  -moz-border-radius: 1rem 1rem 0 0;
}
.allList {
  float: left;
  font-size: 0.8rem;
  color: #333333;
}
.hiddenbtn {
  margin-top: 1rem;
  float: right;
}
.listShow {
  position: relative;
  height: 90%;
  width: 100%;
  top: 2.5rem;
  background: #fff;
  overflow-y: scroll;
}
.musicCon {
  height: 3.7rem;
  padding: 0 1rem;
  overflow: hidden;
  color: #acacac;
  font-size: 0.8rem;
  border-bottom: 0.01rem solid #f1f1f1;
}
.musicCon_msgsta {
  float: left;
  width: 0.8rem;
  height: 0.8rem;
  margin-top: 1.6rem;
  margin-right: 0.8rem;
  line-height: 0.8rem;
}
.musicCon_msgname {
  float: left;
  width: 12rem;
  height: 2.3rem;
  line-height: 1.2rem;
  margin-top: 0.8rem;
  color: #333333;
}
.musicCon_msgname span:first-child {
  display: inline-block;
  width: 12rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.musicCon_time {
  height: 1rem;
  line-height: 1rem;
  color: #acacac;
}
.musicCon_time i {
  padding-bottom: 0.1rem;
  padding-right: 0.1rem;
}
.musicCon_coll {
  float: right;
  width: 1.05rem;
  line-height: 3.7rem;
}
</style>
