Page({
  data: {
    countdownNum: 10,// 倒计时显示数字
    begin: - (1 / 2 * Math.PI),// canvas画圆的起点
    pai2: 2 * Math.PI,// 代表整圆，也就是画完一圈的终点
    initNum: 10, //倒计时数
    spaceNum: 1000, //文字倒计时间隔
    space: 10, //环倒计时间隔
  },
  onShow(){
    this.countdown();
  },
  //canvas画圆环
  drawRang(overTime){
    // 页面渲染完成
    var cxt_arc = wx.createCanvasContext('canvasCount');
    //开始外部白色圆
    cxt_arc.setLineWidth(28);//设置圆环的宽度
    cxt_arc.setStrokeStyle('#ffffff');//设置圆环的颜色
    cxt_arc.setFillStyle('#382BC3');//设置填充的颜色
    cxt_arc.setLineCap('round');//设置圆环端点的形状
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(37, 39, 22, this.data.begin, this.data.pai2, false);//设置一个原点(37, 39)，半径为22的圆的路径到当前路径
    cxt_arc.stroke();//对当前路径进行描边
    cxt_arc.fill();//对当前路径进行填充
    cxt_arc.setFillStyle('#fff');//改变填充的颜色
    cxt_arc.setFontSize(25);//设置字体大小
    cxt_arc.setTextAlign("center");//设置字体居中显示
    cxt_arc.fillText(this.data.countdownNum, 37, 48);//在坐标(37,48)处输入文字10
    //白色圆上的绿色圆
    var end = this.data.begin + (this.data.pai2 / 10) * overTime;
    if (overTime == 0) {
      end = this.data.pai2 * + this.data.begin
    }
    cxt_arc.setLineWidth(6);//设置圆环的宽度
    cxt_arc.setStrokeStyle('#03DCF2');//设置圆环的颜色
    cxt_arc.setLineCap('round')//设置圆环端点的形状
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(37, 39, 29, this.data.begin, end, true);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.draw();
  },
  // 倒计时
  countdown(){
    this.rangRun = 0;
    clearInterval(this.cuntDownCir);
    this.cuntDownCir = setInterval(()=>{
      var n = this.data.initNum - Math.floor(this.rangRun / this.data.spaceNum);
      var overTime = this.rangRun / this.data.spaceNum;
      this.setData({
        countdownNum: n
      });
      this.drawRang(overTime);
      this.rangRun = this.rangRun + this.data.space;
      if (overTime >= 10) {
        clearInterval(this.cuntDownCir);
      }
    }, this.data.space);
  },
})
