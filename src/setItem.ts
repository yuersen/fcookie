import stringify from './internal/stringify';

/**
 * 接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值
 *
 * @function
 * @param  {String} key 要创建或覆盖的cookie的名字
 * @param  {Any} value 存储的值
 * @param  {String|Number|Date} end 有效最大日期
 * @param  {String} path? 指向的路径，默认为当前文档位置的路径
 * @param  {String} domain? 有效域名，默认为当前文档位置的路径的域名部分
 * @param  {String} secure? cookie只会被https传输 (boolean或null)
 */
const setItem = (
  key: string,
  value: any,
  end?: string | number | Date,
  path?: string,
  domain?: string,
  secure?: boolean
): void => {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
    return;
  }
  let expires = '';
  if (end) {
    switch (end.constructor) {
      case Number:
        // Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
        // version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
        // the end parameter might not work as expected. A possible solution might be to convert the the
        // relative time to an absolute time. For instance, replacing the previous line with:
        // expires = end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : ";
        // expires=" + (new Date(end * 1e3 + Date.now())).toUTCString();
        expires =
          end === Infinity
            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            : '; max-age=' + end;
        break;
      case String:
        expires = '; expires=' + end;
        break;
      case Date:
        expires = '; expires=' + (end as Date).toUTCString();
        break;
    }
  }
  document.cookie =
    encodeURIComponent(key) +
    '=' +
    encodeURIComponent(stringify(value)) +
    expires +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '') +
    (secure ? '; secure' : '');
};
export default setItem;
