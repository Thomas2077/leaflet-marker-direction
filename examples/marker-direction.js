/*
 * LEAFLET.MARKER_DRECTION
 * vesion 0.0.1
 * @author Thomas Zou
 * @date 10/1/2018
 */

/* Angle ICON */
L.AngleIcon = L.Icon.extend({
    // default value
    options: {
        angle: 0,
        iconSize: new L.Point(80,60),	// canvas  size
        className: "leaflet-boat-icon",
        course: 0,    		   			// angle
        labelAnchor: [10, -10],			// test loaction
        pointType:0,			   		// pointType
        ciFlag :false,
        label:'',
        textColor:'red',
        img:null
    },

    createIcon: function () {
        var e = document.createElement("canvas");
        this._setIconStyles(e, "icon");
        var s = this.options.iconSize;
        e.width = s.x;
        e.height = s.y;
        this.ctx = e.getContext("2d");
        this.draw(e.getContext("2d"), s.x, s.y);
        return e;
    },

    draw: function(ctx, w, h) {

        if(!ctx)
            return;
        var x = this.x;
        var y = this.y;

        var course = this.options.course;

        ctx.font="10px Courier New";
        ctx.fillStyle = this.options.textColor;
        if(this.options.ciFlag){
            var text = this.options.label;
            ctx.fillText(text, 0, 20);
        }

        this.drwaImage(ctx, this.options.img, course, 35, 20);
    },

    /**
     * draw image by canvas
     * @param ctx canvas
     * @param img image
     * @param course angle
     * @param w width
     * @param h height
     */
    drwaImage : function(ctx , img, course, w, h){
        console.log(img.src)
        img.onload = function(){
            //平移坐标原点
            ctx.translate(40,30);
            //旋转画布
            ctx.rotate(course);
            ctx.translate(-40,-30);
            //画图
            ctx.drawImage(img,w,h);
            console.log(img.src)
        }
    },

    /**
     * 获得两点之间方向角 (Get the direction angle between two points)
     * 根据地球上两点之间的经纬度计算两点之间与正北方向的夹角
     * (According to the latitude and longitude between two points on earth,
     *  calculate the angle between two points and the direction of the north)
     *
     * @param  点A(L.Latlng)  PointA
     * @param  点B(L.Latlng)  PointB
     * @return result:  AB角度 (the angle of AB (calculated result degree))
     *
     * @version   2016-08-19
     *
     * @see    Math.atan2()用于返回从x轴到指定坐标点(x, y)的角度(以弧度为单位);y/x = tan#
     *         Math.atan2 () returns the angle (in radians) from the x-axis to the specified coordinate point (x, y); y / x = tan #
     * @version   2016-08-19
     */
    getAngle : function(A, B){
        var angle = null;
        var latA = A.lat;
        var lonA = A.lon;
        var latB = B.lat;
        var lonB = B.lon;

        // 注意经度或者纬度相等 (when longitude or latitude is equal)
        if(lonA == lonB && latA>latB ){
            angle = Math.PI;
        }
        else if(lonA == lonB && latA < latB ){
            angle = 0	;
        }
        else if(lonA > lonB && latA == latB ){
            angle = -(Math.PI/2);
        }
        else if(lonA < lonB && latA == latB ){
            angle = Math.PI/2	;
        }

        // 注意经度或者纬度都不相等 (Longitude and latitude are not equal)
        else{
            var x1 = A.lat*Math.pow(10,12);
            var x2 = B.lat*Math.pow(10,12);
            var y1 = A.lon*Math.pow(10,12);
            var y2 = B.lon*Math.pow(10,12);
            angle = Math.atan2(y2-y1,x2-x1)
        }
        options.angle = angle;
        return angle;
    },

    /**
     * 设置maker 和正北方向 角度
     * Set the angle between the maker and the north
     * @param heading (Unit: radian)
     */
    setHeading : function(heading) {

        if(!heading){
            heading = options.angle;
        }
        this.options.course = (heading % 360);
        var s = this.options.iconSize;

        //我们不需要在这里显示的调用draw()方法，因为map.addLayer(layer)会调用这个方法
        //We do not need to call draw() as shown here
        //because map.addLayer (layer) will call this method
        //this.draw(this.ctx, s.x, s.y);
    }
});

// AngleMarker继承Marker并添加setHeading 和 getAngle 方法
// AngleMarker extends from Marker and adds the setHeading and getAngle methods
L.AngleMarker = L.Marker.extend({
    getAngle : function (A, B) {
        return this.options.icon.getAngle(A, B);
    },
    setHeading: function(heading) {
        this.options.icon.setHeading(heading);
    }
});

L.angleMarker = function(pos, options) {

    options.icon = new L.AngleIcon({
        ciFlag:options.labelFlag,
        label:options.label,
        textColor:options.labelColor,
        img: options.img
    });

    return new L.AngleMarker(pos,options);
};
