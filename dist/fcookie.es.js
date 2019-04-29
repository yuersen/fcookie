var stringify = JSON.stringify;

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
var setItem = function(key, value, end, path, domain, secure) {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
    return;
  }
  var expires = '';
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
        expires = '; expires=' + end.toUTCString();
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

var parse = JSON.parse;

/**
 * 从当前的 cookie 中获取指定的值
 *
 * @function
 * @param  {String} key 读取的cookie名
 * @returns {Any|Null}
 */
var getItem = function(key) {
  if (!key) {
    return null;
  }
  return (
    parse(
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      )
    ) || null
  );
};

/**
 * 检查一个 cookie 中是否包含指定的字段
 *
 * @function
 * @param {String} key 要检查的 cookie 名
 * @returns {Boolean}
 */
var hasItem = function(key) {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
    return false;
  }
  return new RegExp(
    '(?:^|;\\s*)' +
      encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') +
      '\\s*\\='
  ).test(document.cookie);
};

/**
 * 接受一个键名作为参数，并把该键名从 cookie 存储中删除
 *
 * @function
 * @param {String} key 要移除的cookie名
 * @param {String} path? 如果没有定义，默认为当前文档位置的路径
 * @param {String} domain? 默认为当前文档位置的路径的域名部分
 */
var removeItem = function(key, path, domain) {
  if (hasItem(key)) {
    document.cookie =
      encodeURIComponent(key) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (domain ? '; domain=' + domain : '') +
      (path ? '; path=' + path : '');
  }
};

/**
 * 返回一个这个路径所有可读的 cookie 的数组
 *
 * @function
 * @returns {String[]}
 */
var keys = function() {
  var cookies = document.cookie
    .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
    .split(/\s*(?:\=[^;]*)?;\s*/);
  for (var l = cookies.length, i = 0; i < l; i++) {
    cookies[i] = decodeURIComponent(cookies[i]);
  }
  return cookies;
};

/**
 * 清空 cookies 中所有的数据
 *
 * @function
 * @param  {string} path? 如果没有定义，默认为当前文档位置的路径
 * @param  {string} domain? 默认为当前文档位置的路径的域名部分
 */
var clear = function(path, domain) {
  var key = keys();
  for (var l = key.length, i = 0; i < l; i++) {
    removeItem(key[i], path, domain);
  }
};

/**
 * cookies extension tool
 * @see https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 * @see https://github.com/madmurphy/cookies.js
 */

export { clear, getItem, keys, removeItem, setItem };
