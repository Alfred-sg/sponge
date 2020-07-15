import Sender, { Params } from '../sender';
import { OptionsType, OptsType } from "../types";

const defaultOptions: OptionsType = {
  sendType: "ajax"
};

export default class AbstractTracker {
  options: OptionsType;
  sender: Sender;

  constructor(options?: OptionsType) {
    this.options = options || defaultOptions;
    this.sender = new Sender(this.options.sendType, {});
  }

  /**
   * 获取默认上报数据
   */
  getBasicParams() {
    const defaultParams: Params = {} as Params;
  
    if (document) {
      defaultParams.domain = document.domain || '';
      defaultParams.url = document.URL || '';
      defaultParams.title = document.title || '';
      defaultParams.referrer = document.referrer;
    };
  
    if (window && window.screen) {
      defaultParams.sh = window.screen.height || 0;
      defaultParams.sw = window.screen.width || 0;
      defaultParams.cd = window.screen.colorDepth || 0;
    };
  
    if (navigator) {
      defaultParams.lang = navigator.language || '';
      defaultParams.userAgent = navigator.userAgent || '';
    };
  
    if (document && document.cookie) {
      defaultParams.cookie = document.cookie;
    };

    defaultParams.top = window.top == window ? 1 : 0;
    defaultParams.timestamp = new Date().getTime();
    defaultParams.random = Math.random();
  
    return defaultParams;
  }

  /**
   * 模板方法，发送数据
   * @param url 上报地址
   * @param opts 选项
   */
  send(params: Params, callback: Function){
    const basic = this.getBasicParams();
    this.sender.send(this.options.url, { basic, ...params }, callback);
  }
}