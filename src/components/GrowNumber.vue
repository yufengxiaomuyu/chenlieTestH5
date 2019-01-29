<template>
	<span class="growth-num">{{curNumber}}</span>
</template>

<script>
	export default {
		name: 'GrowNumber',
		props: ['startNumber','endNumber','time'],
		data () {
			return {
				curNumber: 0,
			}
		},
		watch: {
			endNumber: function (from, to) {
				this.NumberGrow(this.startNumber,this.endNumber,this.time)
			}
		},
		methods: {
			NumberGrow (startNumber,endNumber,time) {
				// console.log(this.endNumber)
				// console.log(endNumber)
				let growthNumber = endNumber - startNumber
				let curNumber = startNumber
				let oldNumber = startNumber
	      let step = (growthNumber * 16) / (time * 1000) //step为每1ms增加的数值
	      let start = 0//计数器
	      let interval//定时器

	      // console.log(step)
	      var that = this;
	      interval = setInterval(function () {
	      	curNumber = curNumber + step;
	      	if (curNumber >= endNumber) {
	      		clearInterval(interval);
	      	}
	      	let newNumber = Math.floor(curNumber);
	      	if (newNumber === oldNumber) {
	      		return;
	      	};
	      	oldNumber = newNumber;
	      	that.curNumber = oldNumber;
	      }, 16);
	    }
	  }
	  // created() {
	  	// var that = this
	  	// //监听父组件传值的变化
	  	// var intervalId = setInterval(function() {
	  	// 	if (that.endNumber === 0) {
	  	// 		// console.log('this.endNumber:0')
	  	// 		return
	  	// 	} else {
	  	// 		// console.log('this.endNumber:15')
	  	// 		that.NumberGrow(that.startNumber,that.endNumber,that.time)
	  	// 		clearInterval(intervalId)
	  	// 	}
	  	// },90)
	  // }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
