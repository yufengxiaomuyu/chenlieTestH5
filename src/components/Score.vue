<template>
  <div class="contianer">
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
      的{{levelName[levelId]}}陈列师
    </p>
    <router-link :to="{name: 'History', params: {postId: postId}}">
      <button class="btn-report">您的历史测评报告></button>
    </router-link>
  </div>
</template>

<script>
  import ProgressRing from './ProgressRing'
  import GrowNumber from './GrowNumber'
  import qs from 'qs'
  import wx from 'weixin-js-sdk'

  export default {
    name: 'Score',
    data () {
      return {
        isLoading: true,
        // rapUrl: 'http://rap2api.taobao.org/app/mock/121162',
        ceshiurl: 'https://ceshi.chenliegonghe.cn',
        // ceshiurl: '/api',
        // localurl: 'http://192.168.10.136:8080',
        scoreNum: 0,
        rankingNum: 0,
        userId: this.$route.params.userId,
        levelId: '',
        levelName: '',
        postId: 0,
        progressRing: {
          radius: 104,
          upperWidth: 12,
          upperColor: '#FBDA43',
          downColor: '#FBEDB8'
        },
        startNumber: 0,
        time: 1,
      }
    },
    components: {
      ProgressRing,
      GrowNumber
    },
    methods: {
      getLevelName: function () {
        let url = '/tour/level/list.do'
        this.$http.get( this.ceshiurl + url)
        .then(res => {
          let data = res.data
          let levelName = {}
          console.log(res)
          for (var key in data) {
            let id = data[key].id
            levelName[id] = data[key].name.slice(0,3)
          }
          this.levelName = levelName
          // console.log(levelName)
        }).catch(err => {
          console.log(err)
        })
      },
      getData: function () {
        let url = '/tour/result/selResultUserId.do'
        this.$http.get( this.ceshiurl + url, {
          params: {
            userId: this.userId,
          }
        }).then(res => {
          // console.log(res)
          this.isLoading = false
          let data = res.data[0].result
          // console.log(data)
          this.scoreNum = data.score
          // this.scoreNum = 50
          this.rankingNum = parseInt(data.rate)
          this.userId = data.userId
          this.levelId = data.levelId
          this.postId = data.id
        }).catch(err => {
          console.log(err)
        })
      },
      handleShare: function() {
        console.log('点击了分享');
        let url = '/tour/reward/pushtiyan.do'
        // let params = {
        //   userId: this.userId,
        // }
        this.$http.post( this.ceshiurl + url)
        .then( res => {
          console.log(res)
        })
      },
      share: function() {
        let hre = window.location.href;
        hre = hre.replace(/#\//g,'#/share/')
        // alert(hre);
        let hre2 = window.location.href;
        hre2 = hre2.split('#')[0];
        // alert(hre2);
        let url = '/tour/weixinUtil/getWxConfig.do';
        let shareTitle = '你也来测评啊';
        let shareUrl = hre;
        let shareImg = 'https://thyrsi.com/t6/658/1547712332x2890149512.png';
        let shareDesc = '陈列测评，专业的陈列师测试平台';
        // let params = {code: '00106Afl117sVn0S60il1ONBfl106Afh'}
        let params = {url: hre2}
        this.$http.post( this.ceshiurl + url,
          qs.stringify(params),
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(res => {
          let _this = this
          if (res.data[0] !== false) {
            let data = res.data[0]
            // console.log(data)
            wx.config({
              debug: false, // 开启调试模式,若参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名，见附录1
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
              // console.log('注册验证成功')
              wx.onMenuShareTimeline({
                title: shareTitle, // 分享标题
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImg, // 分享图标
                success: function() {
                  _this.handleShare();
                }
              });
              wx.onMenuShareAppMessage({
                title: shareTitle, // 分享标题
                desc: shareDesc, // 分享描述
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImg, // 分享图标
                success: function() {
                  _this.handleShare();
                }
                // type: "", // 分享类型,music、video或link，不填默认为link
                // dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
              });
            });
            wx.error(function(res){
              console.log('注册验证失败')
              console.log(res)
            });
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
    created() {
      this.getData();
      this.getLevelName();
      this.share();
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
.btn-report {
  display: block;
  margin: 130px auto 0 auto;
  width: 15em;
  height: 42px;
  background-color: #F6D700;
  font-size: 1.1em;
  border: none;
  border-radius: 21px;
  outline: none;
  line-height: 32px;
  letter-spacing: 2px;
}
</style>

