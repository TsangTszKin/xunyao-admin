import { Notification } from 'element-ui';
import Vue from 'vue'
class WebSocketStore {

    constructor() {
        this.init = this.init.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.close = this.close.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }

    websocket = null;

    loading = null;

    close() {
        this.websocket.close();
        console.log("websocket连接已经关闭");
    }

    sendMessage(message) {
        this.websocket.send(message);
    }

    onMessage(msg) {
        Notification({
            title: '消息提示',
            message: msg,
            position: 'bottom-right'
          });
    }

    init() {
        if(this.websocket!=null)return
        var token = Vue.cookie.get('token');
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
          var prefix = window.SITE_CONFIG['baseUrl'];
          prefix = prefix.replace("http://","ws://")
          this.websocket = new WebSocket(`${prefix}/websocket/${token}`);
        } else {
            console.warn("您的浏览器或版本太旧，暂不支持websocket");
            Modal.warning({ title: '系统提示', content: "您的浏览器或版本太旧，暂不支持websocket" });
            return
        }
        let self = this;
        //连接成功建立的回调方法
        this.websocket.onopen = function (event) {
            console.log("WebSocket connects successful:", event);
        }
        //连接发生错误的回调方法
        this.websocket.onerror = function (event) { console.error("WebSocket error observed:", event); };
        //接收到消息的回调方法

        this.websocket.onmessage = function (event) { 
            //console.log("websocketevent", event); 
            //console.log("websocket收到信息：", JSON.parse(event.data)); 
            self.onMessage(event.data); 
        }

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            self.websocket.close();
        }
    }

}
export default new WebSocketStore
