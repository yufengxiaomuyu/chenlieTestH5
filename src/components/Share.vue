<template>
  <div class="contianer">
    <!-- <p class="title"><span>某某</span>的测评结果</p> -->
    <div class="score-container">
      <ProgressRing :radius="progressRing.radius" :progress="scoreNum" :upperWidth="progressRing.upperWidth" :upperColor="progressRing.upperColor" :downColor="progressRing.downColor"></ProgressRing>
      <p class="score">
        <span class="score-text">分</span>
        <span class="score-num">
          <GrowNumber :startNumber="startNumber" :endNumber="scoreNum" :time="time"></GrowNumber>
        </span>
      </p>
      <p class="score-title">测评分数</p>
    </div>
    <p class="ranking">击败
      <span class="ranking-num">
        <GrowNumber :startNumber="startNumber" :endNumber="rankingNum" :time="time"></GrowNumber>%
      </span>
      的{{(levelId === 1) ? '初级' : '高级'}}陈列师
    </p>
    <img class="applet-code" :src="appletCode">
    <p>长按识别，测试您的陈列水平</p>
  </div>
</template>

<script>
  import ProgressRing from './ProgressRing'
  import GrowNumber from './GrowNumber'

  export default {
    name: 'Score',
    data () {
      return {
        isLoading: true,
        // rapUrl: 'http://rap2api.taobao.org/app/mock/121162',
        // ceshiurl: '/api',
        ceshiurl: 'https://ceshi.chenliegonghe.cn',
        // localurl: 'http://192.168.10.136:8080',
        url: '/tour/result/selResultUserId.do',
        scoreNum: 0,
        rankingNum: 0,
        userId: this.$route.params.userId,
        levelId: '',
        postId: 0,
        progressRing: {
          radius: 104,
          upperWidth: 12,
          upperColor: '#FBDA43',
          downColor: '#FBEDB8'
        },
        startNumber: 0,
        time: 1,
        appletCode: require('../assets/appletcode.jpg'),
      }
    },
    components: {
      ProgressRing,
      GrowNumber
    },
    methods: {
      getData: function () {
        this.$http.get( this.ceshiurl + this.url, {
          params: {
            userId: this.userId,
          }
        }).then(res => {
          this.isLoading = false
          let data = res.data[0].result
          this.scoreNum = data.score
          this.rankingNum = parseInt(data.rate)
          this.userId = data.userId
          this.levelId = data.levelId
          this.postId = data.id
        }).catch(err => {
          console.log(err)
        })
      },
    },
    created: function () {
      this.getData()
    }
  }
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .contianer {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    font-family: SourceHanSansCN-Regular;
  }
  .title {
    margin-top: 40px;
    margin-bottom: 30px;
  }
  .score-container {
    position: relative;
    margin: 0 auto;
    margin-top: 81px;
    /*box-sizing: border-box;*/
    width: 208px;
    height: 208px;
    /*border: 12px solid #FBDA43;*/
    /*border-radius: 50%;*/
    text-align: center;
  }
  .progress-ring {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .score {
    display: inline-block;
    text-align: center;
    line-height: 1;
    margin-top: 45px;
    overflow: hidden;
  }
  .score .score-num {
    font-size: 4.9em;
    font-family: AdobeHeitiStd-Regular;
    float: right;
  }
  .score .score-num .growth-num {
    font-size: 1em;
  }
  .score .score-text {
    /*display: inline-block;*/
    float: right;
    font-size: 2.3em;
    margin-top: 26px;
  }
  .score-title{
    font-family: SourceHanSansCN-Normal;
    font-size: 1.16em;
  }

  .ranking {
    margin-top: 25px;
    font-family: SourceHanSansCN-Normal;
    font-size: 1.3em;
    color: #737373;
  }
  .ranking .ranking-num {
    font-family: AdobeHeitiStd-Regular;
    color: #000000;
  }
  .ranking .growth-num {
    font-size: 1em;
  }
  .applet-code {
    margin-top: 100px;
    width: 120px;
    height: 120px;
  }
</style>