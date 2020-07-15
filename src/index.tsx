import {
  addEventListener
} from './utils/event';
import send from './utils/send';

function getTime(){
  return new Date().getTime();
};

let startTime;

export default function doCollect(options = {}) {
  const {
    url,// 远程收集数据的地址
    target = [],// 绑定监听点击事件的节点
  } = options;

  // 点击事件监听
  addEventListener(document.body, 'click', (e) => {
    let targetElm = e.target || e.srcElement;
    let nodeName = targetElm.nodeName.toLowerCase();

    if (['html', 'body', ''].indexOf(nodeName) !== -1) return;

    const key = targetElm.getAttribute('collect');
    if ( target.indexOf(targetElm) === -1 && !key ) return;

    const parmas = {
      type: 'click',
      key,
      nodeName: targetElm.nodeName,
      title: targetElm.title, 
      text: targetElm.innerHTML,
      time: new Date().getTime()
    };

    send(url, parmas);
  });

  window.onload = function(){
    startTime = getTime();
    const params = {
      type: 'load',
      time: startTime
    };
    send(url, params);
  }

  window.onbeforeunload = function(){
    const now = getTime();
    const params = {
      type: 'unload',
      time: now, 
      timeStamp: now - startTime
    };
    send(url, params);
  };

  const onpopstate = window.onpopstate;
  window.onpopstate = function(...args){
    console.log(document.location)
    onpopstate && onpopstate(...args);
  };
};