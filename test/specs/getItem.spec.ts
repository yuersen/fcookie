import 'mocha';
import { expect } from 'chai';
import { createEnvironment, destroyEnvironment } from './utils';
import getItem from '@/getItem';

describe('getItem', () => {
  before(() => {
    createEnvironment();
  });

  after(() => {
    destroyEnvironment();
  });

  it('returns name field value', () => {
    const name = getItem('name');
    expect(name).to.equal('fx');
  });

  it('returns null', () => {
    const author = getItem('author');
    expect(author).to.equal(null);
  });

  it('returns null when the input is empty', () => {
    expect(getItem('')).to.equal(null);
  })
});
