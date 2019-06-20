<template>
  <div style="height: 100%" id="app">
    <div class="theTheHeads">
      <TheHead></TheHead>
      <div class="apps" style="background-color: white;font-size: 14px;border-bottom:1px solid #eee;
      ">
        <div class="tab" @click="showOnes">
          <a href="#/comment" :class="{'goRed':showOne==1}">商品</a>
        </div>
        <div class="tab" @click="showTwos">
          <!--跳转-->
          <a href="#/commodity" :class="{'goRed':showTwo==1}">评论</a>
        </div>
        <div class="tab" @click="showThrees">
          <a href="#/merchant" :class="{'goRed':showThree==1}">商家</a>
        </div>
      </div>
    </div>
    <router-view :seller="seller"/><!--传递seller-->
    <TheTail :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></TheTail>
    <!--<div style="height: 50px"></div>-->
    <!--<TheTail class="theTails" style="background-color: #141D27;color: white;height: 48px"></TheTail>-->
  </div>
</template>

<script>

import TheHead from "./components/thehead/theHead";
import TheTail from "./components/thetail/theTail";
const ERR_OK = 0;
export default {
  name: 'App',
  components: {TheTail, TheHead},
  data(){
    return {
      seller:{},
      //下面通过发送ajax请求后把数据传过来。
      showOne:0,
      showTwo:0,
      showThree:0
    };
  },
  created(){
    this.$http.get('https://haotao101.github.io/newone/theapp/data.json').then((response) => {
      //数据存在这个路径中(在webpack.dev.conf中定义,通过data.json中的数据定义)
        this.seller = response.data.seller;
    });
  },
  mounted(){//颜色控制
    var theUrl=this.$route.path;
    if(theUrl=="/merchant"){
      this.showOne=0;
      this.showTwo=0;
      this.showThree=1;
    }else if(theUrl=="/commodity"){
      this.showOne=0;
      this.showTwo=1;
      this.showThree=0;
    }else if(theUrl=="/comment"){
      this.showOne=1;
      this.showTwo=0;
      this.showThree=0;
    }
  },
  methods:{
    //颜色控制
    showOnes(){
      this.showOne=1;
      this.showTwo=0;
      this.showThree=0;
    }
    ,
    showTwos(){
      this.showOne=0;
      this.showTwo=1;
      this.showThree=0;
    },
    showThrees(){
      this.showOne=0;
      this.showTwo=0;
      this.showThree=1;
    }
  }
}
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /*text-align: center;*/
      color: #2c3e50;
    }

    .apps{
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
    }

    .tab{
      flex: 1;
      text-align: center;
    }

    a{
      text-decoration: none;
    }

    .tab a{
      display: block;//a元素圈满div
      font-size: 14px;
      color: rgb(77, 85, 93);
    }

    /*.theTails{*/
      /*position: fixed;*/
      /*bottom: 0px;*/
      /*width: 100%;*/
      /*height: 6%;*/
    /*}*/

    /*.theTheHeads{*/
      /*position:fixed;*/
      /*top: 0px;*/
      /*width: 100%;*/
      /*z-index: 100;*/
    /*}*/
    .tab .goRed{
      color: red;
    }
</style>
