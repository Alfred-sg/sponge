import DomTracker from './DomTracker';

/**
 * 点击跳转事件上报
 */
export default class LinkTracker extends DomTracker {
  type: string = 'link';

  /**
   * 自动追踪
   */
  autoTrack(){
    this.track('a', 'click')
  }

  /**
   * 获取上报数据
   * @param event 
   * @param node 
   */
  grab(event: Event, node: HTMLLinkElement){
    return {
      type: this.type,
      href: node.href,
    }
  }

  /**
   * 上报前
   * @param event 
   * @param node 
   */
  beforeSend(event: MouseEvent, node: HTMLLinkElement): boolean | void {
    if (!node.href) return false;
    if (event.which !== 2 && !event.metaKey && !event.ctrlKey && node.target !== '_blank'){
      event.preventDefault();
    };
  }

  /**
   * 上报后
   * @param err
   * @param event 
   * @param node 
   */
  afterSend(err: Error | undefined, event: MouseEvent, node: HTMLLinkElement){
    if (!err){
      if (event.which === 2 || event.metaKey || event.ctrlKey || node.target === '_blank'){
        window.location = node.href;
      }
    }
  }
}