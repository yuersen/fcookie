import 'mocha';
import { expect } from 'chai';
import { createEnvironment, destroyEnvironment } from './utils';
import removeItem from '@/removeItem';
import setItem from '@/setItem';

describe('removeItem', () => {
  before(() => {
    createEnvironment();
    setItem('age', 12);
    setItem('lover', 'yz');
  });

  after(() => {
    destroyEnvironment();
  });

  it('removes name field', () => {
    expect(document.cookie.indexOf('name') !== -1).to.equal(true);
    removeItem('name');
    expect(document.cookie.indexOf('name') === -1).to.equal(true);
  });

  it('specify domain field', () => {
    expect(document.cookie.indexOf('age') !== -1).to.equal(true);
    removeItem('age', '127.0.0.1');
    expect(document.cookie.indexOf('age') === -1).to.equal(true);
  });

  it('specify path field', () => {
    expect(document.cookie.indexOf('lover') !== -1).to.equal(true);
    removeItem('lover', '127.0.0.1', '/');
    expect(document.cookie.indexOf('lover') === -1).to.equal(false);
  });
});
