<template>
    <!--评价组件-->
    <div class="ratingselect border-1px">
      <div class="rating-type">
        <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">
          {{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">
          {{desc.positive}}<span class="count">{{positives.length}}</span></span>
        <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">
          {{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    var POSITIVE=0; //正面评价
    var NEGATIVE=1; //负面评价
    var ALL=2;  //所有
    export default {
        name: "ratselect",
        props:{
          ratings:{
            type:Array,
            default(){
              return [];
            }
          },
          selectType:{
            type:Number,
            default:ALL
          },
          onlyContent:{
            type:Boolean,
            default:false
          },
          desc:{
            type:Object,
            default(){
              return{
                all:'全部',
                positive:'满意',
                negative:'不满意'
              };//这三个值是可以改变内容的
            }
          }
        },
        data(){
          return{
            con:''
          }
        },
        methods:{
          select(type,event){
            if(!event._constructed){
              return;
            }
            // this.typeSelect=type;//把selectType的值改为点击时传入的值
            // this.selectType=type;
            this.$emit('select-type', type);//子组件告诉父组件，父组件的值能随之改变
          },
          toggleContent(event) {
            if (!event._constructed) {
              return;
            }
            // this.Contentonly = !this.Contentonly;
            // this.onlyContent=!this.onlyContent;
            this.con=!this.onlyContent;
            this.$emit('only-content', this.con);
          }
        },
        computed:{
          positives() {
            return this.ratings.filter((rating) => {
              return rating.rateType === POSITIVE;
            });
          },
          negatives() {
            return this.ratings.filter((rating) => {
              return rating.rateType === NEGATIVE;
            });
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"//这里定义了底部线条样式

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size :0 //为了解决inline-block间隙问题
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        //利用active控制点击改变颜色
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background :rgb(77,85,93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top     //实现对齐
        font-size :12px
</style>
