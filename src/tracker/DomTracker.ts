import AbstractTracker from './AbstractTracker';

/**
 * 点击跳转事件上报
 */
export default class DomTracker extends AbstractTracker {
  type: string = 'dom';

  /**
   * 模板方法，追踪并上报数据
   * @param selectors 选择器
   * @param eventName 事件
   */
  track(selectors: string, eventName: string){
    const nodes = document.querySelectorAll(selectors);
    if (!nodes.length){
      console.error(`querySelectorAll returned 0 elements`)
      return;
    };

    Array.prototype.forEach.call(nodes, (node: HTMLElement) => {
      node.addEventListener(eventName, (event: Event) => {
        const checked = this.beforeSend(event, node);

        if (checked !== false){
          this.send(this.grab(event, node), (err?: Error) => {
            this.afterSend(err, event, node)
          });
        }
      })
    });
  }

  /**
   * 自动追踪
   */
  autoTrack(): void {}

  /**
   * 获取上报数据
   * @param event 
   * @param node 
   */
  grab(event: Event, node: HTMLElement){
    return {
      type: this.type,
    }
  }

  /**
   * 上报前
   * @param event 
   * @param node 
   */
  beforeSend(event: Event, node: HTMLElement): boolean | void { }

  /**
   * 上报后
   * @param err
   * @param event 
   * @param node 
   */
  afterSend(err: Error | undefined, event: Event, node: HTMLElement){ }
}