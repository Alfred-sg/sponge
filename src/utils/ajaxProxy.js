export default function ajaxProxy(cb) {
  XMLHttpRequest.prototype.send = new Proxy(XMLHttpRequest.prototype.send, {
    apply: function(target, thisBinding, args) {
      target.apply(thisBinding, args);
      setTimeout(() => {
        thisBinding.onreadystatechange = () => {
          if (thisBinding.readyState === 4 && thisBinding.status === 200) {
            cb && cb.call(thisBinding);
          };
        };
      }, 0);
    }
  });
};