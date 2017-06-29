/**
 * Created by lenovo on 2017/6/26.
 */
;(function($){
    var Carousel = function(poster){
        //保存单个旋转木马对象
        var self = this;
        this.poster = poster;
        this.posterItemMain = poster.find("ul.poster-list");
        this.nextBtn = poster.find("div.poster-next-btn");
        this.prevBtn = poster.find("div.poster-prev-btn");
        this.posterItems = poster.find("li.poster-item");
        this.posterFirst = this.posterItems.first();
        this.posterLast = this.posterItems.last();
        this.rotateFlag = true;
        //设置默认参数
        this.setting = {
            "width":1000,          //幻灯片宽度
            "height":300,          //幻灯片高度
            "posterWidth":700,    //幻灯片第一帧宽度
            "posterHeight":300,   //幻灯片第一帧高度
            "scale":0.9,           //记录显示比例关系
            "speed":500,
            "autoPlay":true,
            "delay":500,
            "verticalAlign":"middle"
        };
        //默认参数扩展
        $.extend(this.setting,this.getSetting());

        this.setSettingValue();
        this.setPosition();

        this.nextBtn.click(function(){
            if(self.rotateFlag){
                self.rotateFlag = false;
                self.carouseRotate("left");
            }
        });
        this.prevBtn.click(function(){
            if(self.rotateFlag) {
                self.rotateFlag = false;
                self.carouseRotate("right");
            }
        });
        //是否开启自动播放
        if(this.setting.autoPlay){
          this.autoPlay();
            this.poster.hover(function(){   //鼠标移入
                window.clearInterval(self.timer);
            },function(){                     //鼠标移出
                self.autoPlay();
            });
        };
    };
    Carousel.prototype={
        autoPlay:function(){
            var self = this;
            this.timer = window.setInterval(function(){
                self.nextBtn.click();
            },this.setting.delay);
        },

        //旋转
        carouseRotate:function(dir){
            var _this_ = this;
            var zIndexArr = [];
            if(dir==="left"){
                this.posterItems.each(function(){
                    var self = $(this);
                    var prev = self.prev().get(0)?self.prev():_this_.posterLast;
                    var width = prev.width(),
                        height = prev.height(),
                        zIndex = prev.css("zIndex"),
                        opacity = prev.css("opacity"),
                        left = prev.css("left"),
                        top = prev.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        width:width,
                        height:height,
                        opacity:opacity,
                        left:left,
                        top:top
                    },_this_.setting.speed,function(){
                        _this_.rotateFlag = true;
                    })
                });
                this.posterItems.each(function(i){
                    $(this).css("zIndex",zIndexArr[i]);
                });
            }else{
                this.posterItems.each(function(){
                    var self = $(this);
                    var next = self.next().get(0)?self.next():_this_.posterFirst;
                    var width = next.width(),
                        height = next.height(),
                        zIndex = next.css("zIndex"),
                        opacity = next.css("opacity"),
                        left = next.css("left"),
                        top = next.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        width:width,
                        height:height,
                        opacity:opacity,
                        left:left,
                        top:top
                    },_this_.setting.speed,function(){
                        _this_.rotateFlag = true;
                    })
                });
                this.posterItems.each(function(i){
                    $(this).css("zIndex",zIndexArr[i]);
                });
            }
        },
        //设置位置关系
        setPosition:function(){
            var self = this;
            var sliceItems = this.posterItems.slice(1);//获取剩余的帧
            var sliceSize = sliceItems.length/ 2;
            var rightSlice = sliceItems.slice(0,sliceSize);
            var leftSlice = sliceItems.slice(sliceSize);
            var level = Math.floor(this.posterItems.length/2);
            var rw = this.setting.posterWidth, rh = this.setting.posterHeight;
            var gap = ((this.setting.width-this.setting.posterWidth)/2)/level;
            var firstLeft = (this.setting.width-this.setting.posterWidth)/2;
            var fixOffsetLeft = firstLeft + rw;

            //右边帧的位置
            rightSlice.each(function(i){
                level--;
                rw = rw * self.setting.scale;
                rh = rh * self.setting.scale;
                var j = i;
                $(this).css({
                    zIndex:level,
                    width:rw,
                    height:rh,
                    opacity:1/(++j),
                    left:fixOffsetLeft+(++i)*gap-rw,
                    top:self.setVerticalAlign(rh)
                });
            });

            var lw = rightSlice.last().width();
            var lh = rightSlice.last().height();
            oloop = Math.floor(this.posterItems.length/2);
            //左边帧的位置
            leftSlice.each(function(i){
                $(this).css({
                    zIndex:i,
                    width:lw,
                    height:lh,
                    opacity:1/(oloop),
                    left:i*gap,
                    top:self.setVerticalAlign(lh)
                });
                lw = lw / self.setting.scale;
                lh = lh / self.setting.scale;
                oloop--;
            });
        },

        //设置垂直对齐方式
        setVerticalAlign:function(height){
            var verticalType = this.setting.verticalAlign;
            var t = 0;
            if(verticalType==="top"){
                t = 0;
            }else if(verticalType==="bottom"){
                t = this.setting.height-height;
            }else{
                t = (this.setting.height-height)/2;
            }
            return t;
        },

        setSettingValue:function(){
            this.poster.css({
                width:this.setting.width,
                height:this.setting.height
            });
            this.posterItemMain.css({
                width:this.setting.posterWidth,
                height:this.setting.posterHeight
            });
            var btnWidth = (this.setting.width - this.setting.posterWidth)/2;
            this.nextBtn.css({
                width:btnWidth,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.length/2)
            });
            this.prevBtn.css({
                width:btnWidth,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.length/2)
            });
            this.posterFirst.css({
                width:this.setting.posterWidth,
                height:this.setting.posterHeight,
                left:btnWidth,
                zIndex:Math.floor(this.posterItems.length/2)
            })
        },

        //获取人工配置参数
        getSetting:function(){
            var setting = this.poster.attr("data-setting");
            if(setting&&setting!=""){
                return $.parseJSON(setting);
            }else{
                return {};
            }
        }
    };

    //初始化
    Carousel.init = function(posters){
      var _this_ = this;
        posters.each(function(){
            new _this_($(this));
        })
    };
    window.Carousel = Carousel;
})(jQuery);