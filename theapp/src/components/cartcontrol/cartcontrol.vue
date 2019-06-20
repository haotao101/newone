<template>
  <!--添加减少(+-按钮组件)-->
  <div class="cartcontrol">
    <!--减按钮,有时不会显示-->
    <span v-for="i in this.$store.state.theList">
      <transition name="move">
      <div v-show="i.index==index&&i.dadindex==dadindex&&i.count>0" class="cart-decrease"
           @click.stop.prevent="decreaseCart"><!--阻止点击冒泡-->
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    </span>
    <div v-for="i in this.$store.state.theList"
         class="cart-count" v-show="i.index==index&&i.dadindex==dadindex&&i.count>0"><!--父下标和子下标都找到就显示-->
      {{i.count}}
    </div><!--数字,有时不会显示-->
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div><!--加按钮-->
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    name: "cartcontrol",
    props:{
      food:{//值会影响父组件
        type:Object
      },
      index:{
        type:Number
      },
      dadindex:{
        type:Number
      },
      name:{},
      price:{},
      theLen:{}
    },
    data(){
      return{
        theShows:true
      }
    },
    created(){
      if(this.$store.state.theShow==true){
        this.$store.commit('aboutList',{dadindex:this.dadindex,index:this.index,count:0,name:this.name,
          price:this.price,theLen:this.theLen});
      }
    },
    methods:{
      addCart(event){
        if(!event._constructed){//为了让pc点击只触发一次
          return;
        }
        this.$store.commit('increment',{dadindex:this.dadindex,index:this.index});
        //传给vuex过去下标，次数，名字，价格
      },
      decreaseCart(event){
        if(!event._constructed){
          return;
        }
        this.$store.commit('subtract',{dadindex:this.dadindex,index:this.index});
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .cartcontrol
    font-size: 0
    .cart-decrease
      transform: translate3d(0, 0, 0)
      opacity: 1/*设置 div 元素的不透明级别：*/
      .inner
        display: inline-block
        transition: all 0.4s // 定义旋转的过渡效果
        transform: rotate(0)
      /**以上是redsquare元素隐藏时的CSS，下面是cart-decrease展现时的过渡效果**/
      &.move-enter-active, &.move-leave-active
        transition: all 0.5s // 定义平移的过渡效果
      &.move-enter, &.move-leave-to
        transform: translate3d(24px, 0, 0)
        opacity: 0
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
