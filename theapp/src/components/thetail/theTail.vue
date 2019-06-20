<template>
  <!--/*购物车组件*/-->
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':this.$store.state.cart_item>0}">
              <!--当totalCount>0时,class添加highlight-->
              <i class="icon-shopping_cart" :class="{'highlight':this.$store.state.cart_item>0}"></i>
              <!--图标字体-->
            </div>
            <div class="num" v-show="this.$store.state.cart_item>0">{{this.$store.state.cart_item}}</div>
          </div>
          <div class="price" :class="{'highlight':this.$store.state.cart_item>0}">
            ￥{{this.$store.state.money}}元
          </div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay"><!--阻止冒泡-->
          <div class="pay" :class="payClass"><!--payClass根据状态变颜色-->
            {{payDesc}}
          </div>
        </div>
      </div>
      <!--购物车详情-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="i in this.$store.state.theList" v-show="i.count>0">
                <span class="name">{{i.name}}</span>
                <div class="price">
                  <span>￥{{i.sumPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :index="i.index" :dadindex="i.dadindex" :name="i.name"
                   :price="i.price"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="toggleList"></div>
      </transition>
    </div>
</template>

<script>
    import cartcontrol from "../cartcontrol/cartcontrol";
    import BScroll from 'better-scroll';
    export default {
        name: "theTail",
      data(){
          return{
            fold: true
          };
      },
      props:{//计算变化
        deliveryPrice:{
          type:Number,
          default:0
        },
        minPrice:{
          type:Number,
          default:0
        }
      },
      methods:{
        toggleList(){
          var mark=-1;
          for(var i=0;i<this.$store.state.theList.length;i++){
            if(this.$store.state.theList[i].count>0){
              mark=1;
            }
          }
          if(mark==-1){
            return;
          }
          this.$store.state.fold=!this.$store.state.fold;
        },
        empty(){
          this.$store.state.cart_item=0;
          this.$store.commit('theEmpit',1);
        },
        pay(){//去结算
          if(this.$store.state.money<this.minPrice){//如果总价小于起送价,直接return
            // this.fold=false;
            return;
          }
          window.alert("支付功能还在开发中。。。");

          // listShow=false;
        }
      },
      components: {cartcontrol},
      // 接收传递过来的值
        computed:{
          payDesc() {
            if (this.$store.state.money === 0) {
              return `￥${this.minPrice}元起送`;
            } else if (this.$store.state.money < this.minPrice) {
              let diff = this.minPrice - this.$store.state.money;
              return `还差￥${diff}元起送`;
            } else {
              return '去结算';
            }
          },
          payClass() {
            if (this.$store.state.money < this.minPrice) {
              return 'not-enough';
            } else {
              return 'enough';
            }
          },
          listShow(){
            var mark=-1;
            for(var i=0;i<this.$store.state.theList.length;i++){
              if(this.$store.state.theList[i].count>0){
                mark=1;
              }
            }
            if(mark==-1){
              this.$store.state.fold=true;
              return false;
            }
            let show=!this.$store.state.fold;
            if(show){
              this.$nextTick(()=>{//调用接口回调
                if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.listContent, {
                    click: true
                    // /*让按钮组件点击数据能传过去*/
                  });
                } else {
                  this.scroll.refresh();
                }
              });
            }
            return show;
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        /*固定宽度*/
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          /*background: #2b333b*/
          &.not-enough/*表示.pay.not-enough*/
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-transition
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      &.fold-transition
        transition: all 0.5s
        transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    &.fade-transition
      transition: all 0.5s
      opacity: 1
      background: rgba(7, 17, 27, 0.6)
    &.fade-enter, &.fade-leave
      opacity: 0
      background: rgba(7, 17, 27, 0)
  .shopcart
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index:-1
      width: 100%
      transform: translate3d(0, -100%, 0)/*移动后位置*/
      opacity: 1/*设置 div 元素的不透明级别：*/
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.9s // 定义平移的过渡效果
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
        opacity: 0
  .list-mask
    position :fixed
    top :0
    left:0
    width:100%
    height: 100%
    z-index :-2
    backdrop-filter:blur(10px)
    background :rgba(7,17,27,0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
      opacity :1
    &.fade-enter, &.fade-leave-to
      opacity :0
      background :rgba(7,17,27,0)
</style>
