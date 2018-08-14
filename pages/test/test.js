var that;
Page({
    data: {
        number: 0,
        number2: 0
    },
    //事件处理函数
    start: function() {
      var random = Math.floor(Math.random() * 100);
      change(this.data.number,random,0) 
    },
    start2: function() {
      var random = Math.floor(Math.random() * 20);
      change(this.data.number2,random,1) 
    },
    onLoad: function () {
      that=this;
    },
})
var change = (which,number,style)=>{
  console.log('====new number====', number)
  var baseNumber = which;//原数字
  var difference = number - baseNumber;//与原数字的差
  var absDifferent=Math.abs(difference);//差取绝对值
  var changeTimes = absDifferent < 6 ? absDifferent : 6 //最多变化6次
  var changeUnit = absDifferent < 6 ? 1 : Math.floor(absDifferent  / 6)  //绝对差除以变化次数
  //依次变化
  for(var i=0;i<changeTimes;i+=1){
    // 使用闭包传入i值，用来判断是不是最后一次变化
    (function(i){
      setTimeout(()=>{
        if(style==0){
          that.setData({
            number: which += changeUnit
          })
          // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
          if (i == changeTimes - 1) {
            that.setData({
              number: baseNumber + difference
            })
          }
        }else if(style==1){
          that.setData({
            number2: which += changeUnit
          })
          // 差值除以变化次数时，并不都是整除的，所以最后一步要精确设置新数字
          if (i == changeTimes - 1) {
            that.setData({
              number2: baseNumber + difference
            })
          }
        }
      }, 30 * (i + 1))
    })(i)
  }
}
