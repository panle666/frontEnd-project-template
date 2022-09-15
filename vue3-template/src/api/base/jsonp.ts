/**
 * Callback index.
 */

 let count = 0;

 /**
  * Noop function.
  */
 
 function noop() {}
 
 /**
  * JSONP handler
  *
  * Options:
  *  - param {String} qs parameter (`callback`)
  *  - prefix {String} qs parameter (`__kadjp`)
  *  - name {String} qs parameter (`prefix` + incr)
  *  - timeout {Number} how long after a timeout error is emitted (`60000`)
  *
  * @param {String} url
  * @param {Object|Function} optional options / callback
  * @param {Function} fn callback
  */
 
 function jsonp(url: string, opts: { prefix?: string; name?: string; param?: string; timeout?: number } = {}, fn: Function) {
   if ('function' == typeof opts) {
     fn = opts;
     opts = {};
   }
   if (!opts) opts = {};
 
   const prefix = opts.prefix || '__kadjp';
 
   // use the callback name that was passed if one was provided.
   // otherwise generate a unique name by incrementing our counter.
   const id = opts.name || prefix + count++;
 
   const param = opts.param || 'callback';
   const timeout = null != opts.timeout ? opts.timeout : 60000;
   const enc = encodeURIComponent;
   const target = document.getElementsByTagName('script')[0] || document.head;
   let script: HTMLElementTagNameMap['script'];
   let timer: any;
 
   if (timeout) {
     timer = setTimeout(function () {
       cleanup();
       if (fn) {
         fn(new Error('Timeout'));
       }
     }, timeout);
   }
 
   function cleanup() {
     if (script.parentNode) script.parentNode.removeChild(script);
     window[id] = noop;
     if (timer) {
       clearTimeout(timer);
     }
   }
 
   function cancel() {
     if (window[id]) {
       cleanup();
     }
   }
 
   window[id] = function (data: any) {
     cleanup();
     if (fn) {
       fn(null, data);
     }
   };
 
   // add qs component
   url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
   url = url.replace('?&', '?');
 
   // create script
   script = document.createElement('script');
   script.src = url;
   target.parentNode && target.parentNode.insertBefore(script, target);
 
   return cancel;
 }
 
 export { jsonp };
 