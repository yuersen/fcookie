import keys from './keys';
import removeItem from './removeItem';

/**
 * 清空 cookies 中所有的数据
 *
 * @function
 * @param  {string} path? 如果没有定义，默认为当前文档位置的路径
 * @param  {string} domain? 默认为当前文档位置的路径的域名部分
 */
const clear = (path?: string, domain?: string): void => {
  const key = keys();
  for (let l = key.length, i = 0; i < l; i++) {
    removeItem(key[i], path, domain);
  }
};
export default clear;
