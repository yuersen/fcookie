import { JSDOM, CookieJar } from 'jsdom';
import { createServer } from 'http';

// 测试用例之中，DOM环境（即window, document 和 navigator 对象）必须是存在的
declare global {
  namespace NodeJS {
    interface Global {
      window: any;
      document: any;
      server: any;
    }
  }
}

/**
 * 创建客户端环境
 */
export const createEnvironment = () => {
  const server = createServer((request, response) => {
    response.setHeader('Set-Cookie', ['name=fx', 'author=fiy']);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('ok');
  }).listen(8090);

  const url = 'http://127.0.0.1:8090';
  const cookieJar = new CookieJar();
  cookieJar.setCookieSync('name=fx; Domain=127.0.0.1; Path=/', url);
  const { window } = new JSDOM(`<!doctype html><html></html>`, {
    url,
    cookieJar
  });
  global.document = window.document;
  global.server = server;
};

/**
 * 销毁创建的客户端环境
 */
export const destroyEnvironment = () => {
  global.server && global.server.close();
  global.window && global.window.close();
};
