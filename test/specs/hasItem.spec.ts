import 'mocha';
import { expect } from 'chai';
import { createEnvironment, destroyEnvironment } from './utils';
import hasItem from '@/hasItem';

describe('hasItem', () => {
  before(() => {
    createEnvironment();
  });

  after(() => {
    destroyEnvironment();
  });

  it('returns true', () => {
    expect(hasItem('name')).to.equal(true);
  });

  it('returns false', () => {
    expect(hasItem('author')).to.equal(false);
  });

  it('returns false when the input is empty', () => {
    expect(hasItem()).to.equal(false);
  });

  it('returns false when the input is specified value', () => {
    ['expires', 'max-age', 'path', 'domain', 'secure'].forEach(val => {
      expect(hasItem(val)).to.equal(false);
    });
  });
});
