/**
 * Created by 王宜明 on 2017/3/22.
 */
'use strict';
(function () {

    //1.数据定义(实际生产环境中数据是由后台给出的)
    var data = [
        {img: 1, h1: "Creative", h2: "DUET"},
        {img: 2, h1: "Friendly", h2: "DEVIL"},
        {img: 3, h1: "Tranquilent", h2: "COMPATRIOT"},
        {img: 4, h1: "Insecure", h2: "HUSSLER"},
        {img: 5, h1: "Loving", h2: "REBEL"},
        {img: 6, h1: "Passionate", h2: "SEEKER"},
        {img: 7, h1: "Crazy", h2: "FRIEND"}
    ]

    // 2.编写一个通用函数
    function get(elem) {
        if (elem.substr(0, 1) === ".") {
            return document.getElementsByClassName(elem.substr(1));
        } else {
            return document.getElementById(elem);
        }
    }

    // 3.添加幻灯片操作 (所有的幻灯片和对应按钮)
    function addSideber() {
        //3.1 获取模板
        var tpl_main = get("template_main").innerHTML
            .replace(/^\s*/, "")
            .replace(/\s*$/, "");
        var tpl_control = get("template_control").innerHTML
            .replace(/^\s*/, "")
            .replace(/\s*$/, "");
        //3.2定义最终输出的HTML的变量
        var out_main = [];
        var out_control = [];

        //3.3遍历所有数据,构建最终的HTML
        for (var i = 0; i < data.length; i++) {
            var _html_main = tpl_main.replace(/{{index}}/g, data[i].img)
                .replace(/{{h2}}/g, data[i].h1)
                .replace(/{{h3}}/g, data[i].h2);

            var _html_control = tpl_control.replace(/{{index}}/g, data[i].img);

            out_main.push(_html_main);
            out_control.push(_html_control);

            //3.4 把所有的HTML会写到对应的DOM里面
            get("template_main").innerHTML = out_main.join("")
            get("template_control").innerHTML = out_control.join("")
        }


    }

    //4.定义合时处理幻灯片输出
    window.onload = function () {
        addSideber();
        switchSideber(1);
        // 事件操作
        var controls = get(".control-i");
        for (var i = 1; i < controls.length + 1; i++) {
            get("control_i_" + i).onclick = function () {
                var index = parseInt(this.id.substr(-1));
                switchSideber(index);
            }
        }
    }

    //5.幻灯片切换
    function switchSideber(n) {
        //5.1 获得要展现的幻灯片&控制按钮 DOM
        var main = get("main_i_" + n);
        var control = get("control_i_" + n);

        //5.2 获得所有的要展现的幻灯片&控制按钮
        var mains = get(".main-i");
        var controls = get(".control-i");

        //清除他们的active样式
        for (var i = 0; i < mains.length; i++) {
           mains[i].className = mains[i].className.replace("main-i_active","");
           controls[i].className = controls[i].className.replace("control-i_active","");
        }

        main.className += " main-i_active";
        control.className += " control-i_active";
    }

})()