import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import comment from '@/components/comment/comment'
import commodity from '@/components/commodity/commodity'
import merchant from '@/components/merchant/merchant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/comment'
      //重定向
    },
    {
      path:'/comment',
      name:'comment',
      component:comment
    }
    ,{
      path:'/commodity',
      name:'commodity',
      component:commodity
    },{
      path:'/merchant',
      name:'merchant',
      component:merchant
    }
  ]
})
