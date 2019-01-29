<template>
  <div class="history-contianer">
    <ul>
      <li class="question" v-for="(item,index) in items">
        <div class="question-title">
          <p class="question-index">{{index+1}}.</p>
          <p class="question-text">{{item.content}} (参考答案:{{item.answer}})</p>
        </div>
        <div class="question-img" v-if="item.img">
          <img :src="item.img" alt="">
        </div>
        <ul class="options">
          <li class="option" v-for="option in item.optionList">
            <!-- <span class="option-circle" v-if="option.condition === 0"></span> -->
            <img v-if="option.condition === 1" :src="rightUrl" alt="正确图标" class="right-icon" />
            <img v-else-if="option.condition === 2" :src="wrongUrl" alt="错误图标" class="wrong-icon" />
            <span v-else class="option-head">{{optionHead[option.idx]}}</span>
            <span class="option-text">{{option.content}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'History',
    data () {
      return {
        ceshiurl: 'https://ceshi.chenliegonghe.cn',
        // ceshiurl: '/api',
        // localurl: 'http://192.168.10.136:8080',
        url: '/tour/result/selResultDetail.do',
        rightUrl: require('../assets/right.png'),
        wrongUrl: require('../assets/wrong.png'),
        postId: this.$route.params.postId,
        items: [],
        optionHead: ['A','B','C','D','E','F']
      }
    },
    methods: {
      getData: function () {
        this.$http.get(this.ceshiurl + this.url, {
          params: {
            id: this.postId,
          }
        }).then(res => {
          // console.log(res)
          let data = res.data[0]
          // console.log(data)
          this.processdata(data)
        }).catch(err => {
          console.log(err)
        })
      },
      processdata: function(data) {
        //处理每个选项的状态，0未选、1正确、2错误。
        let rightAnswer = JSON.parse(data.result.rightAnswer)
        let questAnswer = JSON.parse(data.result.questAnswer)
        console.log(rightAnswer)
        console.log(questAnswer)
        var newRightAnswer = this.strToArr(rightAnswer)
        var newQuestAnswer = this.strToArr(questAnswer)
        let questions = data.questions
        for (var i in questions) {
          console.log(i)
          let optionList = questions[i].optionList
          console.log(optionList)
          let index = questions[i].id
          console.log(index)
          // console.log(index)
          // console.log(newRightAnswer[index])
          // console.log(newQuestAnswer[index])
          console.log(questions[i].answer)
          questions[i].answer = this.numToLetter(questions[i].answer)
          // var rightIndex = newRightAnswer[index]
          // var questIndex = newQuestAnswer[index]
          // console.log(rightIndex)
          // console.log(questIndex)

          for (var l in optionList) {
            optionList[l].condition = 0
            optionList[l].idx = l
            for (var key in newQuestAnswer[index]) {
              // console.log(newQuestAnswer[index][key])
              if ((newRightAnswer[index].indexOf(newQuestAnswer[index][key]) === -1)) {
                optionList[(newQuestAnswer[index][key]-1)].condition = 2
              } else {
                optionList[(newQuestAnswer[index][key]-1)].condition = 1
              }
            }
          }
          console.log(questions)
          this.items = questions
        }
      },
      strToArr (object1) {
        for (var key in object1) {
          object1[key] = object1[key].split(',')
        }
        return object1
      },
      numToLetter (str) {
        var str1 = str.replace(/1/g,'A')
        var str2 = str1.replace(/2/g,'B')
        var str3 = str2.replace(/3/g,'C')
        var str4 = str3.replace(/4/g,'D')
        var str5 = str4.replace(/5/g,'E')
        return str5
      }
    },
    created: function() {
      this.getData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.history-contianer {
  padding: 0 20px 20px 20px;
  font-size: 1.1875em;
}
.question {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  font-family: SourceHanSansCN-Normal;
  text-align: left;
}
.question-title {
  display: flex;
  /*align-items: flex-start;*/
  /*line-height: 1.5em;*/
}
.question-index {
  margin-right: 4px;
}
.question-text {
  /*flex: 1;*/
}
.question-img {
  width: 300px;
  height: 200px;
  margin-top: 10px;
  padding: 1px;
  border: 1px solid #ffd900;
}
.question-img img {
  width: 300px;
  height: 200px;
}
.option {
  display: flex;
  margin-top: 20px;
}
/*.option-circle {
  display: inline-block;
  margin: 6px 7px 0 4px;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  border: 3px solid #f6d700;
  border-radius: 50%;
}*/
.option-head {
  margin-right: 13px;
}
.right-icon {
  /*display: inline-block;*/
  margin-top: 3px;
  width: 25px;
  height: 17.5px;
}
.wrong-icon {
  /*display: inline-block;*/
  margin-top: 3px;
  margin-right: 1px;
  width: 24px;
  height: 18.5px;
}
.option-text {
  margin-left: 9px;
}
</style>
