<template>
    <!--商品详情页-->
  <transition name="move">
      <!--<div ref="theFood">-->
        <div v-show="showFlag" class="food" ref="theFood">
          <div class="food-content">
            <div class="image-header">
              <img :src="food.image"/>
              <div class="back">
                <i class="icon-arrow_lift" @click="fan"></i>
              </div>
            </div>
            <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :index="index" :dadindex="dadindex" :name="food.name"
                             :price="food.price"></cartcontrol>
              </div>
              <div v-for="i in this.$store.state.theList" @click.stop.prevent="addFirst" class="buy"
                   v-show="i.index==index&&i.dadindex==dadindex&&i.count===0">
                加入购物车
              </div>
            </div>
            <split v-show="food.info"></split>
            <div class="info" v-show="food.info">
              <h1 class="title">商品信息</h1>
              <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
              <h1 class="title">商品评价</h1>
              <ratselect @select-type="onSelectType" @only-content="onContent"
                         :select-type="selectType" :only-content="onlyContent"
               :desc="desc" :ratings="food.ratings"></ratselect>
              <!--@是接收子组件传过来的值，相当于v-on-->
              <div class="rating-wrapper">
                <ul v-show="food.ratings && food.ratings.length">
                  <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                    <div class="user">
                      <span class="name">{{rating.username}}</span>
                      <img class="avatar" width="12" height="12" :src="rating.avatar">
                    </div>
                    <div class="time">{{rating.rateTime | formatDate}}</div>
                    <p class="text">
                      <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                    </p>
                  </li>
                </ul>
                <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
              </div>
            </div>
          </div>
        </div>
      <!--</div>-->
  </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import Cartcontrol from "../cartcontrol/cartcontrol";
    import Vue from 'vue';
    import {formatDate} from '@/common/js/date';
    import Split from "../split/split";
    import Ratselect from "../ratselect/ratselect";


    var POSITIVE=0; //正面评价
    var NEGATIVE=1; //负面评价
    var ALL=2;  //所有

    export default {
        name: "foodclass",
      components: {Ratselect, Split, Cartcontrol},
      props:{//接收父组件传过来的值
          food:{
            type:Object
          },
          dadindex:{},
          index:{},
          name:{},
          price:{}
        },
        data(){
          return{
            showFlag: false,
            selectType:ALL,
            onlyContent:true,
            desc:{
              all:'全部',
              positive:'推荐',
              negative:'吐槽'
            },
            showJoin:true
          };
        },
        methods:{
          show(){
            this.showFlag=true;
            this.selectType=ALL;
            this.onlyContent=false;
            this.$nextTick(()=>{//调用接口回调
              if(!this.scroll){
                this.scroll=new BScroll(this.$refs.theFood,{
                  click:true//支持点击
                });
              }else{
                this.scroll.refresh();
              }
            });
          }
          ,
          fan(){
            this.showFlag=false;
          },
          addFirst(event){//加入购物车
            if(!event._constructed){
              return;
            }
            this.$store.commit('increment',{dadindex:this.dadindex,index:this.index,count:0,name:this.name,
              price:this.price});
          },
          onSelectType (type){//type是子组件传过来的值
            this.selectType=type;
            this.$nextTick(()=>{//异步更新better-scroll(只有nextTick触发之后dom才会更新)
              this.scroll.refresh();
            });
          },
          onContent(type){
            this.onlyContent=type;
            this.$nextTick(()=>{//异步更新better-scroll(只有nextTick触发之后dom才会更新)
              this.scroll.refresh();
            });
          },
          needShow(type, text) {//v-show对应的内容
            if (this.onlyContent && !text) {
              return false;
            }
            if (this.selectType === ALL) {
              return true;
            } else {
              return type === this.selectType;
            }
          }
        },
        filters: {
          formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"//这里定义了底部线条样式
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.5s // 定义平移的过渡效果
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .image-header
      position :relative
      width :100%
      height :0
      padding-top :100%/*相对于width,相当于1个宽高都为100%的容器(正方形)*/
      img
        position :absolute
        top:0
        left:0
        width :100%
        height :100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position :absolute
        right:12px
        bottom:12px
      .buy
        position :absolute
        right :18px
        bottom :18px
        z-index:10
        height :24px
        line-height:24px
        padding:0 12px
        box-sizing :border-box
        border-radius :12px
        font-size:10px
        color:#fff
        background :rgb(0,160,220)
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
