import Vue from 'vue'
import Router from 'vue-router'
import Score from '../components/Score'
import History from '../components/History'
import GrowNumber from '../components/GrowNumber'
import Share from '../components/Share'
// import ProgressRing from '../components/ProgressRing'

Vue.use(Router)

export default new Router({
  base: '/tour/',
  routes: [
    // {
    //   path: '/',
    //   name: 'GrowNumber',
    //   component: GrowNumber
    // },
    {
      path: '/:userId',
      name: 'Score',
      component: Score
    },
    {
      path: '/history/:postId',
      name: 'History',
      component: History
    },
    {
      path: '/share/:userId',
      name: 'Share',
      component: Share
    },
  ]
})
