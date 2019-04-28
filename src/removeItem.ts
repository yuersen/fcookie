import hasItem from './hasItem';
/**
 * 接受一个键名作为参数，并把该键名从 cookie 存储中删除
 *
 * @function
 * @param {String} key 要移除的cookie名
 * @param {String} path? 如果没有定义，默认为当前文档位置的路径
 * @param {String} domain? 默认为当前文档位置的路径的域名部分
 */
const removeItem = (key: string, path?: string, domain?: string): void => {
  if (hasItem(key)) {
    document.cookie =
      encodeURIComponent(key) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (domain ? '; domain=' + domain : '') +
      (path ? '; path=' + path : '');
  }
};
export default removeItem;
