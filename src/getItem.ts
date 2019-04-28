import parse from './internal/parse';

/**
 * 从当前的 cookie 中获取指定的值
 *
 * @function
 * @param  {String} key 读取的cookie名
 * @returns {Any|Null}
 */
const getItem = (key: string): any | null => {
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

export default getItem;
