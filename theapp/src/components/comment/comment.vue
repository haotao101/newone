<template>
  <!--商品页面-->
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)">
          <!--$event 是触发事件的第一个参数值-->
          <span class="textTwo border-1px">
              <span class="thisImg" v-if="index==1"><img src="@/components/comment/special_3@2x.png" width="12px" height="12px"/></span>
              <span class="thisImg" v-if="index==2"><img src="@/components/comment/discount_3@2x.png" width="12px" height="12px"/></span>
            {{item.name}}
              <!--<ThePictureTwo v-show="item.type>0" :score="item.type">-->

              <!--</ThePictureTwo>-->
            <!--<span v-show="item.type>0" class="iconThree" :class="classMap[item.type]"></span>-->
            <!--/*图片*/-->
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,dadindex) in goods" class="food-list food-list-hook">
          <h1 class="titleTwo">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event,dadindex,index,food.name,food.price)" v-for="(food,index) in item.foods"
                class="food-item border-1px">
              <div class="iconThree">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="nameTwo" style="font-size: 14px">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" :index="index" :dadindex="dadindex"
                   :name="food.name" :price="food.price" :theLen="selectFoods"></cartcontrol>
                  <!--传下标，次数，商品名称，商品价格-->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--<TheTail :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></TheTail>-->
    <foodclass :food="selectedFood" :dadindex="dadindex" :index="index" :name="name" :price="price" ref="food"></foodclass>
    <!--商品详情页-->
  </div>
</template>

<script type="text/ecmascript-6">
  import ThePictureTwo from "../thePictureTwo/thePictureTwo";
  import BScroll from 'better-scroll';
  import TheTail from "../thetail/theTail";
  import cartcontrol from "../cartcontrol/cartcontrol";
  import foodclass from "../foodClass/foodclass";
  const ERR_OK = 0;
  export default {
    name: "comment",
    components: {foodclass, cartcontrol, TheTail, ThePictureTwo},
    props:{
      seller:{
        type:Object
        // 接收seller
      }
    },
    data() {
      return {
        goods:{},
        //下面通过发送ajax请求后把数据传过来。
        listHeight:[],
        //数组对应高亮区
        scrollY:0,
        selectedFood:{},
        dadindex:0,
        index:0,
        //进行关联
        name:'',
        price:0
      };
    },
    computed:{
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        let list = Array.from(this.goods);
        list.forEach((good) => {
          good.foods.forEach((food) => {
              foods.push(food);
          });
        });
        return foods.length;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        //数据存在这个路径中(在webpack.dev.conf中定义,通过data.json中的数据定义)
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(()=>{//调用接口回调
            this._initScroll();//表初始化(可以正确计算ul高度)
            this._calculateHeight();
          });
        }
      });
    },
    methods:{
      selectMenu(index, event) {/*下标，click事件传递*/
        if (!event._constructed) {/*为了让pc端只执行一次,逻辑语句*/
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];/*滚动到哪里*/
        this.foodsScroll.scrollToElement(el, 300);/*滚动时间*/
      },
      _initScroll(){
        this.menuScroll=new BScroll(this.$refs.menuWrapper,{
          click:true
          /*表示支持点击*/
        });
        this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
          click:true,
          probeType: 3
          // /*监听滚动位置*/
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          // 实时获取属性
        });
      },
      _calculateHeight(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectFood(food,event,thedadindex,theindex,thename,theprice){
        this.dadindex=thedadindex;
        this.index=theindex;
        this.name=thename;
        this.price=theprice;
        if(!event._constructed){/*逻辑语句*/
          return;
        }
        this.selectedFood=food;
        this.$refs.food.show();//获取到子组件的方法
      }
    }
  }
</script>

<style>
  .goods{
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    /*//距离底部位置*/
    width: 100%;
    overflow: hidden;
  }
  .menu-wrapper{
    flex:0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
  }
  .foods-wrapper{
    flex:1
  }
  .menu-item{
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
    /*table可以进行居中*/
  }
  .textTwo{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
  }
  .titleTwo{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size:12px;
    color:rgb(147,153,159);
    background-color:#f3f5f7;
  }
  .food-item{
    display: flex;
    margin: 18px;
    padding-bottom:18px;
  }
  .iconThree{
    flex:0 0 57px;
    margin-right: 10px;
  }
  .food-item .content{
    flex: 1;
  }
  .nameTwo{
    margin:2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    color:rgb(7,17,27);
  }

  .desc{
    line-height :12px;
    font-size:9px;
    color:rgb(147,153,159);
    margin-bottom:8px
  }
  .extra{
    line-height :10px;
    font-size:9px;
    color:rgb(147,153,159);
  }

  .extra .count{
    margin-right :12px;
  }

  .thisImg{
    position: relative;
    top: 2px;
  }
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*左边固定，右边不固定*/
  @import "../../common/stylus/mixin.styl"
  .textTwo
    border-1px(rgba(7,17,27,0.1))
  //border-none()

  .menu-item
    &.current
      position:relative
      z-index: 10
      margin-top: -1px
      background: #fff
      font-weight: 700
      .textTwo
        border-none()

  .food-item
    border-1px(rgba(7,17,27,0.1))
    &:last-child
      border-none()
      margin-bottom: 0
    .price
      font-weight :700
      line-height: 24px
      .now
        margin-right :8px
        font-size:14px
        color:rgb(240,20,20)
      .old
        text-decoration:line-through
        font-size :10px
        color:rgb(147,153,159);
    .cartcontrol-wrapper
      position: absolute
      right:0
      bottom:12px
</style>
