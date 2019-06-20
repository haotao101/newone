<template>
    <!--星星组件-->
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"
        track-by="$index">

        </span>
    </div>
</template>

<script>
    var LENGTH=5;
    var CLS_ON='on';
    var CLS_HALF='half';
    var CLS_OFF='off';
    export default {
        name: "star",
        props:{
          size:{
            type:Number
          },
          score:{
            type:Number
          }
        },
        computed:{
          starType(){
            return 'star-'+this.size;
          },
          itemClasses() {
            var result=[];
            var score=Math.floor(this.score*2)/2;//向下取整
            //如果小数,为半星星
            var hasDecimal=score%1!==0;
            var integer=Math.floor(score);
            for(var i=0;i<integer;i++){
              result.push(CLS_ON);//放全星
            }
            if(hasDecimal){
              result.push(CLS_HALF);//半星
            }
            while (result.length<LENGTH){
              result.push(CLS_OFF);
            }
            return result;//返回数组
          }
        }
    }
</script>

<style scoped>
    .star{
      font-size: 0;
    }
    .star-item{
        display: inline-block;
        background-repeat: no-repeat;
    }
    .star-48 .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
    }
    .star-48 .star-item:last-child{
      margin-right: 0;
    }
    .star-48 .star-item.on{
      background-image: url("star48_on@2x.png");
    }
    .star-48 .star-item.half{
      background-image: url("star48_half@2x.png");
    }
    .star-48 .star-item.off{
      background-image: url("star48_off@2x.png");
    }

    .star-36 .star-item{
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
    }
    .star-36 .star-item:last-child{
      margin-right: 0;
    }
    .star-36 .star-item.on{
      background-image: url("star36_on@2x.png");
    }
    .star-36 .star-item.half{
      background-image: url("star36_half@2x.png");
    }
    .star-36 .star-item.off{
      background-image: url("star36_off@2x.png");
    }

    .star-24 .star-item{
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
    }
    .star-24 .star-item:last-child{
      margin-right: 0;
    }
    .star-24 .star-item.on{
      background-image: url("star24_on@2x.png");
    }
    .star-24 .star-item.half{
      background-image: url("star24_half@2x.png");
    }
    .star-24 .star-item.off{
      background-image: url("star24_off@2x.png");
    }
    /*.star-48,.star-36,.star-24,*/
</style>
