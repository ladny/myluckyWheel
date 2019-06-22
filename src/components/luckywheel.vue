<template>
<div class="luckyWrapper">
    <div class="lucky-wheel">
        <div class="lucky-title"></div>
        <div class="wheel-main">
            <div class="wheel-poniter-box" @click="rotate_handle()">
                <div class="wheel-pointer" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
            </div>
            <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
                <div class="prize-list">
                    <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                        <div class="prize-pic">
                            <img :src="item.icon" />
                        </div>
                        <div class="prize-count" v-if="item.count">
                            {{item.count}}
                        </div>
                        <div class="prize-type">
                            {{item.name}}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="luck-main">

        <div class="main-bg">
          <div class="main-text">
            今日免费抽奖次数： {{ lottery_ticket}}
          </div>
        </div>

        <div class="tip">
            <div class="tip-title">活动规则</div>
            <div class="tip-content">
                <p> 1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废</p>
                <p> 2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
                <p> 3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
            </div>
        </div>
      <scroll-text></scroll-text>


    </div>
    <div class="toast" v-show="toast_control">
      <div class="toast-container">
        <img :src="toast_pictrue" class="toast-picture">
        <div class="close" @click="closeLayer"></div>
        <div class="toast-title">
          {{toast_title}}
        </div>
        <div class="toast-btn">
          <div class="toast-cancel" @click="closeLayer">关闭</div>
        </div>
      </div>
    </div>
    <div class="toast-mask" v-show="toast_control"></div>
</div>
</template>

<script>
import  ScrollText from './scrollText'
export default {
    name: "luckywheel",
    components:{
      ScrollText
    },
    data() {
        return {
          lottery_ticket: 0, //抽奖次数
          toast_control:false,//抽奖结果弹框控制
          hasPrize: false, //是否中奖
          start_rotating_degree: 0, //初始旋转角度
          rotate_angle: 0, //将要旋转的角度
          start_rotating_degree_pointer: 0, //指针初始旋转角度
          rotate_angle_pointer: 0, //指针将要旋转的度数
          rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
          rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
          click_flag: true, //是否可以旋转抽奖
          i: 2, //测试使用
          prize_list: [
            {
              icon: require("../assets/img/give_up.png"),
              count: 0,
              name: "未中奖",
              isPrize: 0 //是否为奖品 1是 0否
            },
            {
                    icon: require("../assets/img/bean_500.png"),
                    count: 1,
                    name: "神豆",
                    isPrize: 1 //是否为奖品 1是 0否
                },
                {
                    icon: require("../assets/img/bean_five.png"),
                    count: 2,
                    name: "神豆",
                    isPrize: 1 //是否为奖品 1是 0否
                },
                {
                    icon: require("../assets/img/bean_one.png"),
                    count: 3,
                    name: "神豆",
                    isPrize: 1 //是否为奖品 1是 0否
                },
                {
                    icon: require("../assets/img/point_five.png"),
                    count: 4,
                    name: "神豆",
                    isPrize: 1 //是否为奖品 1是 0否
                },
                {
                    icon: require("../assets/img/point_ten.png"),
                    count: 5,
                    name: "神豆",
                    isPrize: 1 //是否为奖品 1是 0否
                },
                {
                    icon: require("../assets/img/point_five.png"),
                    count: 6,
                    name: "神豆",
                    isPrize: 1 //是否为奖品 1是 0否
                },
                {
                    icon: require("../assets/img/point_ten.png"),
                    count: 7,
                    name: "神豆",
                    isPrize: 1 //是否为奖品 1是 0否
                }

            ]
        };
    },
    computed:{
      toast_title() {
      console.log(this.i)
        return this.hasPrize
          ? "恭喜您，获得" +this.prize_list[this.i].count + ' ' + this.prize_list[this.i].name
          : "未中奖";
      },
      toast_pictrue() {
        return this.hasPrize
          ? require("../assets/img/congratulation.png")
          : require("../assets/img/sorry.png");
      }
    },
    methods:{
      rotate_handle() {
        console.log("开始转了")
        this.rotating(this.i);
        // this.i = this.i + 2;
      },
      rotating(index) {
        if (!this.click_flag) return;
        var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var during_time = 5; // 默认为1s
        var random = Math.floor(Math.random() * 7);
        var result_index = index; // 最终要旋转到哪一块，对应prize_list的下标
        var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
        var rand_circle = 6; // 附加多转几圈，2-3
        this.click_flag = false; // 旋转结束前，不允许再次触发
        if(type==0) {
          // 转动盘子
          var rotate_angle =
            this.start_rotating_degree +
            rand_circle * 360 +
            result_angle[result_index] -
            this.start_rotating_degree % 360;
            this.start_rotating_degree = rotate_angle;
            this.rotate_angle = "rotate(" + rotate_angle + "deg)";
          // // //转动指针
          // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
          // this.start_rotating_degree_pointer =360*rand_circle;
            var that = this;
            // 旋转结束后，允许再次触发
            setTimeout(function() {
              that.click_flag = true;
              that.game_over(this.i);
            }, during_time * 1000 + 1500); // 延时，保证转盘转完
          } else {
            //
          }
      },
      game_over() {
        this.toast_control = true;
        this.hasPrize = this.prize_list[this.i].isPrize
      },
      closeLayer() {
        this.toast_control = false;
      }

    }
};
</script>

<style scoped>
.luckyWrapper {
    width: 100%;
}

.lucky-wheel {
    width: 100%;
    height: 11rem;
    background: rgb(252, 207, 133) url("../assets/img/color_pillar.png") no-repeat center bottom;
    background-size: 100% 100%;
    padding-top: 0.6rem;
}

.lucky-title {
    width: 100%;
    height: 2.3rem;
    background: url("../assets/img/lucky_title.png") no-repeat center bottom;
    background-size: 100% 100%;
}

.wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.wheel-poniter-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    z-index: 2;
    width: 1.7rem;
    height: 1.7rem;
}

.wheel-pointer {
    width: 1.7rem;
    height: 1.7rem;
    background: url("../assets/img/draw_btn.png") no-repeat center top;
    background-size: 100% 100%;
    transform-origin: center 60%;
}

.wheel-bg {
    width: 5.9rem;
    height: 5.9rem;
    background: url("../assets/img/draw_wheel.png") no-repeat center center;
    background-size: 100% 100%;
    color: #ffffff;
}

.prize-list {
    width: 100%;
    height: 100%;
    position: relative;
}

.prize-list .prize-item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 1.3rem;
    height: 2.5rem;
    text-align: center;
}

.prize-list .prize-item:first-child {
    top: 0;
    left: 3rem;
    transform: rotate(20deg);
}

.prize-list .prize-item:nth-child(2) {
    top: 1rem;
    left: 4rem;
    transform: rotate(67deg);
}

.prize-list .prize-item:nth-child(3) {
    top: 2.3rem;
    left: 4rem;
    transform: rotate(-250deg);
}

.prize-list .prize-item:nth-child(4) {
    top: 3.3rem;
    left: 3rem;
    transform: rotate(-210deg);
}

.prize-list .prize-item:nth-child(5) {
    top: 3.3rem;
    left: 1.6rem;
    transform: rotate(-160deg);
}

.prize-list .prize-item:nth-child(6) {
    top: 2.3rem;
    left: 0.6rem;
    transform: rotate(-111deg);
}

.prize-list .prize-item:nth-child(7) {
    top: 1rem;
    left: 0.7rem;
    transform: rotate(-69deg);
}

.prize-list .prize-item:nth-child(8) {
    top: 0.2rem;
    left: 1.7rem;
    transform: rotate(-20deg);
}

.prize-pic img {
    width: 1.3rem;
    height: 0.8rem;
    margin-top: 0.5rem;
}

.prize-count {
    font-size: 0.28rem;
    line-height: 0.4rem;
}

.prize-type {
    font-size: 0.24rem;
}
.luck-main{
  position: relative;
  width: 100%;
  background: #f36d56;
  padding-bottom: 1rem;
}
.main-bg{
  width: 100%;
  height: 2.1rem;
  position: relative;
  top:-2.1rem;
  left:0;
  background: url("../assets/img/luck_bg.png") no-repeat center top;
  background-size: 100% 100%;
}
.main-text{
  color: #ffeb39;
  font-size: 0.38rem;
  text-align: center;
  position: absolute;
  width: 100%;
  top:70%;
  left:50%;
  transform: translate(-50%, 0);
}
.tip{
  position: relative;
  margin:0.5rem auto 0;
  top:-2.1rem;
  width: 6rem;
  border: 1px solid #fbc27f;
}
.tip-title{
  position: absolute;
  top:-0.3rem;
  left:50%;
  transform: translate(-50%,0);
  font-size: 0.38rem;
  color: #fccc6e;
  background: #F36D56;
  padding:0.1rem 0.3rem;
}
.tip-content{
  font-size: 0.3rem;
  color: #fff8c5;
  padding: 0.5rem 0.3rem;
}
.tip-content p{
  line-height: 0.5rem;
}

/*弹层*/
.toast-mask{
  position: fixed;
  top:0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  width: 100%;
  height: 100%;
}
.toast{
  position: fixed;
  top:50%;
  left: 50%;
  width: 5rem;
  transform:translate(-50%,-50%);
  z-index: 11;
  border-radius: 0.3rem;
  padding: 0.1rem;
  background-color: rgb(252, 244, 224);
}
.toast-container{
  position: relative;
  width: 100%;
  height: 100%;
  border:1px dotted #fccc6e;
  font-size: 18px
}
.toast-picture{
  position: absolute;
  top:-1.5rem;
  left:-0.3rem;
  width:6rem;
  height:2rem;
}
.toast-title {
  padding: 0.8rem 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 2rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  color: #fff;
}
.close {
  position: absolute;
  top: -0.5rem;
  right: -0.3rem;
  width: 0.7rem;
  height: 0.7rem;
  background: url("../assets/img/close_store.png") no-repeat center top;
  background-size: 100%;
}
</style>
