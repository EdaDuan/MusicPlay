<template>
  <div class="home">
    <img :src="require('../../assets/images/bg.gif')" alt="" />
    <div class="home_title">儿童故事MP3</div>
    <div class="word">
      <p>{{ time }}</p>
      <p>
        {{
          currentIndex === -1
            ? "当前暂无播放音乐"
            : musicList[currentIndex].music_name
        }}
      </p>
    </div>
    <homeBar
      @playOrPause="PlayOrPause"
      @modelChange="modelChange"
      @nextAudio="nextAudio"
      @collected="collected"
      :currentIndex="currentIndex"
      :barList="barList"
      :musicList="musicList"
    ></homeBar>
    <listShow
      @collected="collected"
      @play="play"
      :currentIndex="currentIndex"
      :musicList="musicList"
    ></listShow>
    <audio
      :src="playSrc"
      muted
      ref="player"
      @ended="musicEnd()"
      @timeupdate="selfcurrentTime"
      preload="auto"
    ></audio>
  </div>
</template>
<script>
import Vue from "vue";
import "../../assets/scss/icon/sprite.scss";
import "../../assets/scss/icon/list_sprite.scss";

import homeBar from "../../components/home_bar/home_bar";
import listShow from "../../components/listShow/listShow";

import TOAST from "../../components/modalDialog/index";
Vue.prototype.$TOAST = TOAST;
export default {
  data() {
    return {
      currentTime: "00:00",
      currentIndex: -1, //当前播放歌曲下标
      //模式 0 顺序  1 随机 2单曲 3列表
      musicList: [
        //音樂列表
        {
          music_num: 0,
          music_name: "薛之谦/郭聪明 - 耗尽",
          music_src:
            "http://isure.stream.qqmusic.qq.com/C400000BZ9Fg16MAU2.m4a?guid=4938132180&vkey=8E987F132790F049C722C55A0B99E0A5B95D994EDCC8D829932FC8008F5C12EC54952430BE222671BCF57F6281032B1EE9815F693D91B175&uin=0&fromtag=66",
          music_time: "04:19",
          music_like: false,
          isplay: "",
        },
        {
          music_num: 1,
          music_name: "薛之谦 - 刚刚好",
          music_src:
            "http://isure.stream.qqmusic.qq.com/C400000PcSos12VDrz.m4a?guid=4938132180&vkey=34AB11C794E58F8D3B0B8116F845FCECD83D7C3684480F6C0BC461C210294FAFA64D1245C1AAA4DBCD645F9FA844A22E623E0D69454E88B4&uin=0&fromtag=66",
          music_time: "04:10",
          music_like: false,
          isplay: "",
        },
        {
          music_num: 2,
          music_name: "薛之谦 - 绅士",
          music_src:
            "http://isure.stream.qqmusic.qq.com/C4000029cBk90JB3e9.m4a?guid=4938132180&vkey=34796F93255413A7B9E6F91AF48E4415A1B660B1B8AB1C5DE124D8A91B875D37C8AA8EEF8941603835FE3E3EA94B3BA4109D68BAB0FED3E0&uin=0&fromtag=66",
          music_time: "04:50",
          music_like: false,
          isplay: "",
        },
        {
          music_num: 3,
          music_name: "薛之谦 - 演员",
          music_src:
            "http://isure.stream.qqmusic.qq.com/C400001F8BTd1TZYWZ.m4a?guid=4938132180&vkey=FE623E2B28E5BCFB194362988CCA63914B63C704EA0937E172A951B29E5240625214C7C1F71465052FCA8DFA723410A01D577D47E78F865A&uin=0&fromtag=66",
          music_time: "04:21",
          music_like: false,
          isplay: "",
        },
        {
          music_num: 4,
          music_name: "薛之谦 - 意外",
          music_src:
            "http://isure.stream.qqmusic.qq.com/C400001F8BTd1TZYWZ.m4a?guid=4938132180&vkey=03AAC5485D67597B77B965F122DD0A389A9BF9F7511E741CB22525052B4C307E4D7C885AD33EDC332CCB301719B20D2DFC83BB0C3AAFC9B5&uin=0&fromtag=66",
          music_time: "04:47",
          music_like: false,
          isplay: "",
        },
        {
          music_num: 5,
          music_name: "薛之谦 - 天外来物",
          music_src:
            "http://isure.stream.qqmusic.qq.com/C4000013WPvt4fQH2b.m4a?guid=4938132180&vkey=74FD38F803911AA0EEB219535C8A9A860619376E45C57529D72B97155BCB0C7342D5A3A90ACE15D70C032EEF833751A67D8E9D3D87478D3E&uin=0&fromtag=66",
          music_time: "04:17",
          music_like: false,
          isplay: "",
        },
      ],
      barList: [
        {
          id: 1,
          status: 0,
          statusClass: ["icon-ic_canner", "icon-ic_collected"],
          statusText: ["收藏", "已收藏"],
        },
        {
          id: 2,
          status: 0,
          statusClass: ["icon-ic_listShow"],
          statusText: ["列表展示"],
        },
        {
          id: 3,
          status: 0,
          statusClass: ["icon-ic_stop", "icon-ic_play"],
          statusText: [""],
        },
        {
          id: 4,
          status: 0,
          statusClass: ["icon-ic_next"],
          statusText: ["换一首"],
        },
        {
          id: 5,
          status: 0,
          statusClass: [
            "icon-ic_orderPlay",
            "icon-ic_randomPlay",
            "icon-ic_singleLoop",
            "icon-ic_listLoop",
          ],
          statusText: ["顺序播放", "随机播放", "单曲循环", "列表循环"],
        },
      ],
    };
  },
  components: {
    homeBar,
    listShow,
  },
  methods: {
    // 获取当前播放的时间，实时更新
    selfcurrentTime(e) {
      this.currentTime = this.formatTime(parseInt(e.target.currentTime));
    },
    // 格式化时间
    formatTime(time) {
      let sec = time;
      let min = 0;
      // let hour = 0;
      if (sec > 59) {
        min = parseInt(sec / 60);
        sec = parseInt(sec % 60);
      }
      if (min > 59) {
        // hour = parseInt(min / 60)
        min = parseInt(min % 60);
      }
      sec < 10 ? (sec = "0" + sec) : sec;
      min < 10 ? (min = "0" + min) : min;
      return min + ":" + sec;
    },
    // 收藏 如果时列表上的修改会传当前num过来，更改音乐列表里面num对应music_like数据
    // 底部bar里面修改的是当前curentIndex中的
    collected(num) {
      let index;
      typeof num == "number" ? (index = num) : (index = this.currentIndex);
      console.log(index);
      this.currentIndex === -1
        ? TOAST("当前暂无播放音乐")
        : this.musicList[index].music_like
        ? ((this.musicList[index].music_like = false),
          (this.barList[0].status = 0))
        : ((this.musicList[index].music_like = true),
          (this.barList[0].status = 1));
    },
    // 点击下一首时根据音乐列表中music_like切换
    collectedNext() {
      this.musicList[this.currentIndex].music_like
        ? (this.barList[0].status = 1)
        : (this.barList[0].status = 0);
    },
    play(num) {
      if (typeof num == "number") {
        this.currentIndex = num;
      }
      this.$nextTick(() => {
        this.$refs.player.play();
      });
      this.barList[2].status = 1;
    },
    pause() {
      this.$nextTick(() => {
        this.$refs.player.pause();
      });
      this.barList[2].status = 0;
    },
    // 播放或者暂停
    PlayOrPause() {
      console.log(this.barList[2].status === 0);
      if (this.currentIndex === -1) {
        TOAST("当前暂无播放音乐");
      } else {
        this.barList[2].status === 1
          ? (this.barList[2].status = 0)
          : (this.barList[2].status = 1); //切换播放或者暂停
        console.log(this.barList[2].status === 1 ? "播放" : "暂停");
        this.barList[2].status === 1 ? this.play() : this.pause();
      }
    },
    //模式改变
    modelChange() {
      this.barList[4].status = ++this.barList[4].status % 4;
      this.barList[4].status === 0
        ? "顺序模式"
        : this.barList[4].status === 1
        ? "随机模式"
        : this.barList[4].status === 2
        ? "单曲循环"
        : "列表循环";
    },
    // 顺序播放
    playOrder() {
      console.log("现在是顺序播放模式");
      this.currentIndex = ++this.currentIndex;
      console.log(this.currentIndex);
      if (this.currentIndex !== this.musicList.length) {
        this.collectedNext(this.currentIndex);
        this.play();
      } else {
        this.currentIndex = this.musicList.length - 1;
        // 重新读取音乐文件
        this.pause();
        this.$refs.player.currentTime = 0;
        this.$TOAST("顺序播放完毕");
      }
    },
    // 随机播放
    playRandom() {
      let temp; //这个变量在随机模式的用
      console.log("现在是随机播放模式");
      temp = this.currentIndex; //用一个变量保存上一曲的下标，确保下一次不会跟上一次重复的下标。
      this.currentIndex = Math.floor(Math.random() * this.musicList.length);
      temp === this.currentIndex ? this.currentIndex++ : this.currentIndex; //如果和上一次的相等，加1
      this.collectedNext(this.currentIndex);
      this.play();
    },
    // 单曲循环
    playLoop() {
      console.log("现在是单曲循环模式");
      this.$refs.player.loop = true; //音频重载之后再重新播放
      this.play();
    },
    // 列表循环
    playList() {
      console.log("现在是列表循环播放模式");
      this.currentIndex = ++this.currentIndex % this.musicList.length;
      this.collectedNext(this.currentIndex);
      this.play();
    },
    nextAudio(endIndex) {
      //思路：控制下标就行了，地址由计算属性来更新
      if (this.currentIndex === -1) {
        TOAST("当前暂无播放音乐");
      } else {
        this.musicList[this.currentIndex].music_src;
        switch (this.barList[4].status) {
          case 0:
            this.playOrder();
            break;
          case 1:
            this.playRandom();
            break;
          case 2:
            endIndex === 1 ? this.playLoop() : this.playOrder();
            break;
          case 3:
            this.playList();
            break;
        }
      }
    },
    // 结束之后调用的方法
    musicEnd() {
      // 定义一个状态endIndex 单曲循环时是播放完毕还是切换下一首
      let endIndex = 1;
      console.log("音乐停止了");
      this.nextAudio(endIndex); //调用下一曲就行了
    },
  },
  computed: {
    playSrc() {
      if (this.currentIndex !== -1) {
        console.log(this.musicList[this.currentIndex].music_src);
        return this.musicList[this.currentIndex].music_src;
      } else {
        return null;
      }
    },
    time() {
      return this.currentTime;
    },
  },
};
</script>
<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: contain;
}
.home img {
  vertical-align: middle;
  width: 100vw;
  height: 100vh;
}
.home_title {
  position: absolute;
  top: 1.325rem;
  width: 100vw;
  text-align: center;
  font-size: 1rem;
  font-weight: bolder;
  color: #fff;
}
.word {
  position: absolute;
  width: 80%;
  top: 5.7rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  overflow: hidden;
  font-size: 1rem;
  color: #fff;
  font-weight: bolder;
}
.word p:first-child {
  font-size: 1.5rem;
}
</style>
