/**
 * 返回一个这个路径所有可读的 cookie 的数组
 *
 * @function
 * @returns {String[]}
 */
const keys = (): string[] => {
  const cookies: string[] = document.cookie
    .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
    .split(/\s*(?:\=[^;]*)?;\s*/);
  for (let l = cookies.length, i = 0; i < l; i++) {
    cookies[i] = decodeURIComponent(cookies[i]);
  }
  return cookies;
};
export default keys;
