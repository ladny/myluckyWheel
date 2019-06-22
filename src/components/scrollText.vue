<template>
  <vue-seamless-scroll :data="listData" :class-option="classOption" class="seamless-warp">
    <ul class="item">
      <li v-for="item in listData">
        <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>

<script>
    export default {
        name: "scroll-text",
      data () {
        return {
          listData: [{
            'title': '无缝滚动第一行无缝滚动第一行',
            'date': '2017-12-16'
          }, {
            'title': '无缝滚动第二行无缝滚动第二行',
            'date': '2017-12-16'
          }, {
            'title': '无缝滚动第三行无缝滚动第三行',
            'date': '2017-12-16'
          }, {
            'title': '无缝滚动第四行无缝滚动第四行',
            'date': '2017-12-16'
          }, {
            'title': '无缝滚动第五行无缝滚动第五行',
            'date': '2017-12-16'
          }, {
            'title': '无缝滚动第六行无缝滚动第六行',
            'date': '2017-12-16'
          }, {
            'title': '无缝滚动第七行无缝滚动第七行',
            'date': '2017-12-16'
          }, {
            'title': '无缝滚动第八行无缝滚动第八行',
            'date': '2017-12-16'
          }, {
            'title': '无缝滚动第九行无缝滚动第九行',
            'date': '2017-12-16'
          }]
        }
      },
      computed: {
        classOption () {
          return {
            direction: 1,
            limitMoveNum: 5,
            hoverStop: false,
            singleHeight: 26,
            waitTime: 2000
          }
        }
      }

    }
</script>

<style scoped>
  .seamless-warp {
   margin:0 5%;
   width: 90%;
    height: 3rem;
    font-size: 0.34rem;
    color:#ffffff;
    overflow: hidden;
  }
  .item li{
    margin-bottom:0.3rem
  }

</style>
