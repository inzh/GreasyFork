// ==UserScript==
// @name         标智客导出LOGO
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除标智客LOGO水印并导出
// @author       inzh
// @match        https://www.logomaker.com.cn/editor*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=logomaker.com.cn
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    const button = document.createElement('button')
    button.innerText = "点击导出";
    button.style = "width:100px; height:100px; position: absolute; top:50%; left: 0; transform:translate(0,-50%); z-index: 9999; background-color: #06ddfe; color: #fff; font-size: 24px;";
    document.body.appendChild(button)
    button.addEventListener("click", async function() {
        document.querySelector("#stage_canvas>.watermark").remove();
        const svgString = document.querySelector(".svg-canvas")
        var serializer = new XMLSerializer();
        var svg1 = document.querySelector(".svg-canvas")
        var toExport = svg1.cloneNode(true);
        var bb = svg1.getBBox();
        toExport.setAttribute('viewBox', bb.x + ' ' + bb.y + ' ' + bb.width + ' ' + bb.height);
        toExport.setAttribute('width', bb.width);
        toExport.setAttribute('height', bb.height);
        var source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(toExport);
        var image = new Image;
        image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        var canvas = document.createElement("canvas");
        canvas.width = bb.width;
        canvas.height = bb.height;
        var context = canvas.getContext("2d");
        context.fillStyle = '#fff';
        context.fillRect(0, 0, 10000, 10000);
        image.onload = function() {
            context.drawImage(image, 0, 0);
            var a = document.createElement("a");
            a.download = "logo.png";
            a.href = canvas.toDataURL("image/png");
            a.click();
        }
    })
})();