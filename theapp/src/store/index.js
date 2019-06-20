import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store=new Vuex.Store({
  state:{
    theList:[], //商品位置，次数
    cart_item:0,//购物车里商品的总数量
    sum:0,
    money:0,//总价
    fold: true,//购物车选单
    theLen:0,//数组长度
    theShow:true//显示
  },
  mutations:{
    increment(state,value){
      var dadIn=value.dadindex;
      var ziIn=value.index;
      for(var j=0;j<state.theList.length;j++){
        if(state.theList[j].dadindex==dadIn&&state.theList[j].index==ziIn){
          state.theList[j].count++;
          state.cart_item++;
          state.sum=state.theList[j].count*state.theList[j].price;//单个总价
          state.theList[j].sumPrice=state.sum;//给对象添加新属性
        }
      }
      var theArr=[];
      for(var i=0;i<state.theList.length;i++){
        if(state.theList[i].sumPrice){
          theArr.push(state.theList[i].sumPrice);
        }
      }
      state.money=eval(theArr.join("+"));//价格
      if(theArr==''){
        state.money=0
      }
    },
    subtract(state,value){
      var dadIn=value.dadindex;
      var ziIn=value.index;
      for(var j=0;j<state.theList.length;j++){
        if(state.theList[j].dadindex==dadIn&&state.theList[j].index==ziIn){
          if(state.theList[j].count>0){
            state.theList[j].count--;
            state.cart_item--;
            //价格更新
            state.sum=state.theList[j].count*state.theList[j].price;//单个总价
            state.theList[j].sumPrice=state.sum;//给对象添加新属性
          }
        }
      }
      //总价更新
      var theArr=[];
      for(var i=0;i<state.theList.length;i++){
        if(state.theList[i].sumPrice) {
          theArr.push(state.theList[i].sumPrice);
        }
      }
      state.money=eval(theArr.join("+"));//价格
      if(theArr==''){
        state.money=0
      }
    },
    theEmpit(state){
      //清空购物车
      for(var i=0;i<state.theList.length;i++){
        state.theList[i].count=0;
        state.theList[i].sumPrice=0;
      }
      // state.theList.splice(0,state.theList.length);
      state.money=0;
    },
    aboutList(state,value){
      if(state.theShow==true) {
        state.theLen = value.theLen;
        if (state.theList.length < state.theLen && value.name != undefined) {
          state.theList.push(value);
        }
        if(state.theList.length==state.theLen){
          state.theShow=false;
        }
      }
    }
  }
});

export default store;
