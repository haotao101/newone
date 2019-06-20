<template>
  <!--头部信息-->
    <div>
      <div style="height: 134px;background-color: white;overflow:hidden">
        <div :style="{backgroundImage: 'url(' + note + ')',filter: 'blur(9px)'}"
             style="height: 134px;background-color: #141D27;color: white;">
        </div>
        <div class="theRgba" style="height: 134px;background-color: rgba(7,17,27,0.5);
          color: white;">
          <div class="imgDivThree">
            <img :src="seller.avatar" width="64px"/>
            <div class="imgDivFour">
              <span class="aboutTheImg">
                <img src="@/components/thehead/brand@2x.png"
                         width="30px" height="18px"></span>
              <span style="font-size: 16px;font-weight:bold">{{seller.name}}</span>
              <br/>
              <span style="font-size: 12px;font-weight: 200;display: inline-block;margin-top: 8px;">
                {{seller.description}}/{{seller.deliveryTime}}分钟送达
              </span>
              <br/>
              <div style="padding-top: 7px;">
                <span class="aboutTheImg">
                  <img src="@/components/thehead/decrease_1@2x.png" width="12px" height="12px">
                </span>
                <span style="font-size: 10px;font-weight: 200">{{first}}</span>
              </div>
            </div>
            <div class="imgDivFive" style="background-color: rgba(0,0,0,0.2);padding:6px;
            border-radius: 14px;position: absolute;bottom:42px" @click="showDetail">
              <span style="font-size: 10px;font-weight: 200">
                 &nbsp;{{len}}个</span>
              <i class="icon-keyboard_arrow_right" style="font-size: 10px"></i>
            </div>
          </div>
          <div class="imgDivSix" style="background-color: rgba(7,17,27,0.2)" @click="showDetail">
              <!--<span style="background-color: white;color:#394149">公告</span>-->
              <span class="aboutTheImg">
                <img src="@/components/thehead/bulletin@2x.png" width="22px" height="12px">
              </span>
              <span style="font-size: 10px;font-weight: 200">
                {{seller.bulletin}}
              </span>

          </div>
        </div>
      </div>
      <div class="detail" v-show="detailShow">
        <!--sticky footer-->
        <!--清除浮动clearfix-->
        <div class="detail-wrapper clearfix">
            <div class="detail-main" style="color: white;">
                <h1 class="name">{{seller.name}}</h1>
                <div class="star-wrapper">
                  <star :size="48" :score="seller.score"></star><!--传分数给组件-->
                </div>
                <div class="title">
                    <div class="line"></div><!--横线-->
                    <div class="text">优惠信息</div><!--内容-->
                    <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                  <li class="support-item" v-for="(item,index) in seller.supports">
                    <ThePicture :score="seller.supports[index].type"></ThePicture>
                    <!--<span class="icon"-->
                          <!--:class="classMap[seller.supports[index].type]"> </span>-->
                    <span class="text">{{seller.supports[index].description}}</span>
                  </li>
                </ul>
                <div class="title">
                  <div class="line"></div><!--横线-->
                  <div class="text">商家公告</div><!--内容-->
                  <div class="line"></div>
                </div>
                <div class="content">
                  {{seller.bulletin}}
                </div>
            </div>
        </div>
        <div class="detail-close" style="color: white;">
          <i class="icon-close" @click="downDetail"></i>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

  // 表示支持es6语法
  import Star from "../star/star";
  import ThePicture from "../thePicture/thePicture";
  const ERR_OK = 0;
  export default {
    name: "theHead",
    components: {ThePicture, Star},//注册
    data(){
      return {
        seller:{},
        detailShow:false,
        //下面通过发送ajax请求后把数据传过来。
        note: '',
        first:'',
        len:''
      };
    },
    methods:{
      showDetail(){
        this.detailShow=true;
      },
      downDetail(){
        this.detailShow=false;
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/seller').then((response) => {
        //数据存在这个路径中(在webpack.dev.conf中定义,通过data.json中的数据定义)
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
          this.note=response.data.avatar;
          this.first=response.data.supports[0].description;
          this.len=response.data.supports.length;
        }
      });
    }
  }
</script>

<style scoped>
    .imgDivThree{
      padding-top: 24px;
      padding-left: 24px;
    }
    .imgDivFour{
      position:absolute;;
      top: 24px;
      left: 104px;
    }
  .theRgba{
    position: relative;
    top:-134px;
  }
  .imgDivFive{
    position: absolute;
    right: 12px;
    bottom: 46px;
  }
  .imgDivSix{
    padding-left: 12px;
    margin-top: 15px;
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
    line-height: 28px;
  }
  .detail{
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    top: 0;
    left: 0;
  }
  .clearfix{
    display: inline-block;
  }
  .clearfix:after{
    /*//伪类*/
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .detail-wrapper{
    width: 100%;
    min-height: 100%;
  }
  .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
  .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .title{
    width: 80%;
    margin: 28px auto 24px auto;
    display: flex;
    /*flex布局*/
  }
  .line{
    flex: 1;
    position: relative;
    top:-6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .text{
    padding:0 12px;
    font-size:14px;
    font-weight: 700;
  }
  .supports{
    width: 80%;
    margin: 0 auto;
  }
  .support-item{
    padding:0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
    .support-item:last-child{
      margin-bottom:0
    }
  .text{
    line-height: 16px;
    font-size: 12px;
  }
  .content {
    margin-left: 9%;
    margin-right: 9%;
    margin-bottom: 16px;
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
  .aboutTheImg{
    position: relative;
    top:2px;
  }
</style>
