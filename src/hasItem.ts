/**
 * 检查一个 cookie 中是否包含指定的字段
 *
 * @function
 * @param {String} key 要检查的 cookie 名
 * @returns {Boolean}
 */
const hasItem = (key?: string): boolean => {
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
    return false;
  }
  return new RegExp(
    '(?:^|;\\s*)' +
      encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') +
      '\\s*\\='
  ).test(document.cookie);
};
export default hasItem;
