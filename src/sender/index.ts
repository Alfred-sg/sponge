import { stringify } from "../utils";

type SendType = 'image' | 'script' | 'sendBeacon' | 'ajax';

type OptionsType = {
  [key: string]: any;
};

export type Params = {
  [key: string]: any;
};

const defaultOptions: OptionsType = { } as OptionsType;

/**
 * 上报策略
 */
const SendStrategy = {
  image: (url: string, callback: Function, extra?: any) => { 
    const img = new Image();
    img.src = url;
  },
  
  script: (url: string, callback: Function, extra?: any) => { 
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    script.defer = true;
    script.src = url;
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode && firstScript.parentNode.insertBefore(script, firstScript);
  },

  // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon
  sendBeacon: (url: string, callback: Function, extra?: any) => {
    navigator.sendBeacon(url, extra.data || null);
  },

  ajax: (url: string, callback: Function, extra?: any) => { 
    try {
      var req = new XMLHttpRequest();
      req.open("GET", url, true);

      const { headers } = extra || {};
      Object.keys(headers || {}).map(headerName => {
        req.setRequestHeader(headerName, headers[headerName]);
      });

      req.withCredentials = true;
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (req.status === 200) {
            let response;
            try {
              response = JSON.parse(req.responseText);// 无法解析 json
            } catch (e) {
              callback(new Error('send failed'));
              return;
            };

            callback();
          } else {
            callback(new Error('send failed'));
          }
        }
      };
      req.send(extra.data || null);
    } catch (e) {
      console.error(e);
    }
  }
};

export default class Sender {
  sendType: SendType = 'ajax';
  options: OptionsType;

  constructor(sendType: SendType, options?: OptionsType) {
    this.sendType = sendType;
    this.options = options || defaultOptions;
  }

  /**
   * 策略模式，发送数据
   * @param url 上报地址
   * @param params 参数
   * @param callback 回调
   * @param extra 额外参数
   */
  send(url: string, params: Params, callback: Function, extra?: any){
    const paramsStr = stringify({ ...params });
    const realUrl = `${url}${paramsStr}`;
    SendStrategy[this.sendType](realUrl, callback, {
      ...this.options,
      ...extra,
    });
  }
}