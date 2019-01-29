<template>
		<svg class="progress-ring" :width="radius*2" :height="radius*2">
			<circle class="ring-down" :cx="radius" :cy="radius" :r="upperRadius" :stroke-width="downWidth" :stroke="downColor" fill="none"></circle>
			<circle class="ring-upper" :cx="radius" :cy="radius" :r="upperRadius" :stroke-width="upperWidth" :stroke="upperColor" fill="none"
			:stroke-dasharray="circumference + ' ' + circumference" :stroke-dashoffset="strokeDashoffset">
			</circle>
		</svg>
</template>

<script>
	export default {
		name: 'ProgressRing',
		props: ['radius', 'progress', 'upperWidth', 'upperColor', 'downColor'],
		data () {
			const downWidth = this.upperWidth - 4;
			const upperRadius = this.radius - this.upperWidth / 2;
			const circumference = upperRadius * 2 * Math.PI
			// console.log(circumference)
			return {
				downWidth,
				upperRadius,
				circumference,
			}
		},
		computed: {
			strokeDashoffset() {
				return this.circumference - this.progress / 100 * this.circumference;
			}
		}
	}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ring-upper {
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
	stroke-linecap: round;
	transition: stroke-dashoffset 1s linear;
}
</style>
