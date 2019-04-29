import 'mocha';
import { expect } from 'chai';
import { createEnvironment, destroyEnvironment } from './utils';
import keys from '@/keys';

describe('keys', () => {
  before(() => {
    createEnvironment();
  });

  after(() => {
    destroyEnvironment();
  });

  it('returns list', () => {
    const cookies = keys();
    expect(cookies.length).to.equal(1);
    expect(cookies[0]).to.equal('name');
  });
});
