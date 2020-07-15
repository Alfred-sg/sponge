import DomTracker from './DomTracker';

/**
 * 表单提交事件上报
 */
export default class FormTracker extends DomTracker {
  type: string = 'form';

  /**
   * 自动追踪
   */
  autoTrack(){
    this.track('form', 'submit')
  }

  /**
   * 上报前
   * @param event 
   * @param node 
   */
  beforeSend(event: Event, node: HTMLElement): void{
    event.preventDefault();
  }

  /**
   * 上报后
   * @param err
   * @param event 
   * @param node 
   */
  afterSend(err: Error | undefined, event: Event, node: HTMLElement){
    if (!err) event.submit();
  }
}