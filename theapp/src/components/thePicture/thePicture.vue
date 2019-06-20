<template>
      <!--图片组件-->
      <span class="icon" :class="classMap[itemClasses]"></span>
</template>

<script>
    const ERR_OK = 0;
    export default {
        name: "thePicture",
        props:{
          score:{
            type:Number
          }
        },
        created() {
          this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        computed:{
          itemClasses() {
            var result=[];
            var score=this.score;
            this.scores=score;
            result.push(score);//存入下标
            return result;//返回数组最后的值，即每次遍历最后的下标
          }
        },
    }
</script>

<style scoped>
  .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  /*根据不同class显示不同图片*/
  .icon.decrease{
    background-image:url("decrease_1@2x.png");
  }
  .icon.discount{
    background-image:url("discount_1@2x.png");
  }
  .icon.guarantee{
    background-image:url("guarantee_1@2x.png");
  }
  .icon.invoice{
    background-image:url("invoice_1@2x.png");
  }
  .icon.special{
    background-image:url("special_1@2x.png");
  }
</style>
