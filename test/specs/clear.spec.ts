import 'mocha';
import { expect } from 'chai';
import { createEnvironment, destroyEnvironment } from './utils';
import clear from '@/clear';

describe('clear', () => {
  before(() => {
    createEnvironment();
  });

  after(() => {
    destroyEnvironment();
  });

  it('clear the cookie', () => {
    expect(document.cookie.indexOf('name') !== -1).to.equal(true);
    clear();
    expect(document.cookie.length).to.equal(0);
  });
});
