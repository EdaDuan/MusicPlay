<template>
  <div class="home">
    <img :src="require('../../assets/images/bg.gif')" alt="" />
    <div class="home_title">儿童故事MP3</div>
    <div class="word">
      <p>{{ this.formatTime(currentTime) }}</p>
      <p>
        {{
          currentIndex === -1
            ? "当前暂无播放音乐"
            : musicList[this.cur].music_name
        }}
      </p>
    </div>
    <div class="bar">
      <div class="barList">
        <PlayItem
          :className="isCcollecte() ? 'icon-ic_collected' : 'icon-ic_canner'"
          :text="isCcollecte() ? '已收藏' : '收藏'"
          :itemAction="collected"
        />
        <PlayItem
          className="icon-ic_listShow"
          text="列表展示"
          :itemAction="showList"
        />
        <PlayItem
          :className="isPlay ? 'icon-ic_play' : 'icon-ic_stop'"
          text=""
          :itemAction="PlayOrPause"
        />
        <PlayItem
          className="icon-ic_next"
          text="换一首"
          :itemAction="nextAudio"
        />
        <PlayItem
          :className="this.modelList[currentModel].statusClass"
          :text="this.modelList[currentModel].statusText"
          :itemAction="modelChange"
        />
      </div>
    </div>
    <MusicList
      :collected="collected"
      :play="play"
      :showList="showList"
      :currentIndex="currentIndex"
      :musicList="musicList"
      :isShow="isShow"
    ></MusicList>
    <audio
      :src="playSrc"
      muted
      ref="player"
      @ended="musicEnd()"
      @error="musicError()"
      @timeupdate="selfcurrentTime"
      preload="auto"
    ></audio>
  </div>
</template>
<script>
import Vue from "vue";
import PlayItem from "../../components/playItem/PlayItem.vue";
import MusicList from "../../components/musicList/MusicList.vue";
import TOAST from "../../components/modalDialog/index";
Vue.prototype.$TOAST = TOAST;
export default {
  data() {
    return {
      curIndex: -1,
      currentTime: 0,
      isPlay: false, //播放状态
      isShow: false, //音乐播放列表的展示
      currentModel: 0,
      //模式 0 顺序  1 随机 2单曲 3列表
      currentIndex: -1, //当前播放歌曲下标
      modelList: [
        { statusClass: "icon-ic_orderPlay", statusText: "顺序播放" },
        { statusClass: "icon-ic_randomPlay", statusText: "随机播放" },
        { statusClass: "icon-ic_singleLoop", statusText: "单曲循环" },
        { statusClass: "icon-ic_listLoop", statusText: "列表循环" },
      ],
      musicList: [
        //音樂列表
        {
          music_num: 10,
          music_name: "薛之谦/郭聪明 - 耗尽",
          music_src:
            "http://ws.stream.qqmusic.qq.com/C400000BZ9Fg16MAU2.m4a?guid=4938132180&vkey=C7DE5756A975CFCD718ECA2BA3C814C55AE96A32448C802CE0DA3AF4B2CE5E769683CBAEF178BB04476D01BD976F71C80714B981420FDC40&uin=0&fromtag=66",
          music_time: "04:19",
          music_like: false,
        },
        {
          music_num: 20,
          music_name: "薛之谦 - 刚刚好",
          music_src:
            "http://ws.stream.qqmusic.qq.com/C400000PcSos12VDrz.m4a?guid=4938132180&vkey=192AD14D60871CEBE67DEB8BF086B70D4436B4E7117390E18AED1E563E30020CF2BAA12AE487B884DF1099FA2B6B2C67644166CCD2FC51B5&uin=0&fromtag=66",
          music_time: "04:10",
          music_like: false,
        },
        {
          music_num: 30,
          music_name: "薛之谦 - 绅士",
          music_src:
            "http://ws.stream.qqmusic.qq.com/C40000157pJT2Fd1h2.m4a?guid=4938132180&vkey=B83F36B9D075E338D87F568ADB56B8741E6ABEFE1A032C72558AB9DEAB1F48259C777BEA0AC596A2E4F52B8FE7D03B80278153A7905F5162&uin=0&fromtag=66",
          music_time: "04:50",
          music_like: false,
        },
        {
          music_num: 40,
          music_name: "薛之谦 - 演员",
          music_src:
            "http://ws.stream.qqmusic.qq.com/C400000ZFByR1KvV8k.m4a?guid=4938132180&vkey=98B4039535246DF7105BD9B9423FE39FB8F9AFF362AF46BF4AD0544160361DE7D28A0B604AB715F2E682C7CB2FC52059A2FABE7A8C367A37&uin=0&fromtag=66",
          music_time: "04:21",
          music_like: false,
        },
        {
          music_num: 50,
          music_name: "薛之谦 - 意外",
          music_src:
            "http://ws.stream.qqmusic.qq.com/C400001F8BTd1TZYWZ.m4a?guid=4938132180&vkey=B4FCD452732FA122C89F40F2275EAB311F2CA3C5EBD8983A017246676FC29661E6C45BFFCED24BA666BA9912F5EB76AA302B7E2B13D65AC4&uin=0&fromtag=66",
          music_time: "04:47",
          music_like: false,
        },
        {
          music_num: 60,
          music_name: "薛之谦 - 天外来物",
          music_src:
            "http://ws.stream.qqmusic.qq.com/C4000013WPvt4fQH2b.m4a?guid=4938132180&vkey=9D38F7359A59F658F9AC5F39518D00247D0394B31007969C720EB72579DDCF4495EDC33B147DCC5CC02FCF5353EF3F89C069FD8FA9D3D1C4&uin=0&fromtag=66",
          music_time: "04:17",
          music_like: false,
        },
      ],
    };
  },
  components: {
    PlayItem,
    MusicList,
  },
  mounted() {
    // 对音乐进行排序
    this.musicSort(this.musicList);
    // 取值时：把获取到的Json字符串转换回对象
    this.currentIndex = localStorage.getItem("currentIndex")
      ? parseInt(localStorage.getItem("currentIndex"))
      : this.currentIndex;
    this.musicList = localStorage.getItem("musicList")
      ? JSON.parse(localStorage.getItem("musicList"))
      : this.musicList;
    this.currentTime = sessionStorage.getItem("currentTime")
      ? parseInt(sessionStorage.getItem("currentTime"))
      : this.currentTime;
    this.currentModel = localStorage.getItem("currentModel")
      ? parseInt(localStorage.getItem("currentModel"))
      : this.currentModel;
  },
  updated() {
    this.curIndex = this.cur;
    if (!window.localStorage) {
      alert("浏览器不支持localstorage");
    } else {
      let storage = window.localStorage;
      storage.setItem("currentIndex", parseInt(this.currentIndex));
      storage.setItem("musicList", JSON.stringify(this.musicList));
      storage.setItem("currentModel", parseInt(this.currentModel));
    }
    window.sessionStorage.setItem("currentTime", parseInt(this.currentTime));
  },
  computed: {
    cur() {
      return this.musicList.findIndex(
        (el) => el.music_num == this.currentIndex
      );
    },
    playSrc() {
      return this.currentIndex !== -1
        ? this.musicList[this.cur].music_src
        : null;
    },
  },
  methods: {
    musicSort(musicList) {
      musicList.sort((a, b) => {
        return a.music_num - b.music_num;
      });
    },
    // 底部导航按钮得显示与隐藏
    isCcollecte() {
      return this.currentIndex === -1
        ? false
        : this.musicList[this.cur].music_like;
    },
    // 控制音乐列表的显示/隐藏
    showList() {
      return (this.isShow = this.isShow ? false : true);
    },
    // 获取当前播放的时间，实时更新
    selfcurrentTime(e) {
      this.currentTime = parseInt(e.target.currentTime);
      sessionStorage.setItem("currentTime", this.currentTime);
    },
    // 格式化时间
    formatTime(time) {
      let sec = time;
      let min = 0;
      if (sec > 59) {
        min = parseInt(sec / 60);
        sec = parseInt(sec % 60);
      }
      if (min > 59) {
        min = parseInt(min % 60);
      }
      sec < 10 ? (sec = "0" + sec) : sec;
      min < 10 ? (min = "0" + min) : min;
      return min + ":" + sec;
    },
    // 收藏 如果时列表上的修改会传当前num过来，更改音乐列表里面num对应music_like数据
    // 底部bar里面修改的是当前curentIndex中的
    collected(num) {
      let index, status;
      // index 保存当前收藏的值，不能直接修改currentIndex
      // 底部收藏与列表收藏
      typeof num == "number" ? (index = num) : (index = this.currentIndex);
      status = this.musicList.findIndex((el) => el.music_num == index);
      index === -1
        ? TOAST("当前暂无播放音乐")
        : this.musicList[status].music_like
        ? (this.musicList[status].music_like = false)
        : (this.musicList[status].music_like = true);
    },
    play(num) {
      if (typeof num == "number") {
        this.currentIndex = num;
        this.currentTime = 0;
      }
      this.$nextTick(() => {
        this.$refs.player.currentTime = parseFloat(this.currentTime);
        this.isPlay = true;
        this.$refs.player.play();
      });
    },
    pause() {
      this.$nextTick(() => {
        this.$refs.player.pause();
      });
    },
    // 播放或者暂停
    PlayOrPause() {
      if (this.currentIndex === -1) {
        TOAST("当前暂无播放音乐");
      } else {
        this.isPlay = this.isPlay ? false : true;
        this.isPlay === true ? this.play() : this.pause();
      }
    },
    //模式改变
    modelChange() {
      sessionStorage.setItem("currentModel", parseInt(this.currentModel));
      this.currentModel = ++this.currentModel % 4;
    },
    playOrder() {
      this.curIndex = this.cur;
      if (this.curIndex < this.musicList.length - 1) {
        this.curIndex = this.curIndex + 1;
        this.currentIndex = this.musicList[this.curIndex].music_num;
        this.play();
      } else {
        this.isPlay = false;
        this.pause();
        this.$refs.player.currentTime = 0;
        this.$TOAST("顺序播放完毕");
      }
    },
    // 随机播放
    playRandom() {
      let temp = this.curIndex; //变量在随机模式的用
      //用一个变量保存上一曲的下标，确保下一次不会跟上一次重复的下标。
      this.curIndex = Math.floor(Math.random() * this.musicList.length); //3
      this.currentIndex = this.musicList[this.curIndex].music_num;
      if (temp === this.curIndex) {
        ++this.curIndex === this.musicList.length
          ? (this.currentIndex = this.musicList[0].music_num)
          : this.currentIndex;
      }
      this.play();
    },
    // 单曲循环
    playLoop() {
      this.$refs.player.loop = true; //音频重载之后再重新播放
      this.play();
    },
    // 列表循环
    playList() {
      this.curIndex = ++this.curIndex % this.musicList.length;
      this.currentIndex = this.musicList[this.curIndex].music_num;
      this.play();
    },
    nextAudio(endIndex) {
      //思路：控制下标就行了，地址由计算属性来更新
      if (this.currentIndex === -1) {
        TOAST("当前暂无播放音乐");
      } else {
        this.currentTime = 0;
        switch (this.currentModel) {
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
        window.localStorage.setItem(
          "currentIndex",
          parseInt(this.currentIndex)
        );
      }
    },
    // 结束之后调用的方法
    musicEnd() {
      // 定义一个状态endIndex 单曲循环时是播放完毕还是切换下一首
      let endIndex = 1;
      this.nextAudio(endIndex); //调用下一曲就行了
    },
    musicError() {
      TOAST("音频文件出错");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/px2rem.scss";
.home {
  position: relative;
  width: 100%;
  height: 100%;
}
.home img {
  /* 清楚3像素 */
  vertical-align: middle;
  width: 100%;
  height: 100vh;
}
.home_title {
  position: absolute;
  top: px2rem(53);
  width: 100%;
  text-align: center;
  font-size: px2rem(40);
  font-weight: bolder;
  color: #fff;
}
.word {
  position: absolute;
  width: 80%;
  top: px2rem(228);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  overflow: hidden;
  font-size: px2rem(40);
  color: #fff;
  font-weight: bolder;
}
.word p:first-child {
  font-size: px2rem(60);
}
.word p:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: px2rem(286);
  max-height: 22%;
  background: url("../../assets/images/nav-bg.png") no-repeat;
  background-size: 100% 100%;
}
.barList {
  width: 100%;
  height: 100%;
  display: table;
  text-align: center;
  vertical-align: middle;
}
</style>
