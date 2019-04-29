import 'mocha';
import { expect } from 'chai';
import { createEnvironment, destroyEnvironment } from './utils';
import setItem from '@/setItem';
import getItem from '@/getItem';

describe('setItem', () => {
  before(() => {
    createEnvironment();
  });

  after(() => {
    destroyEnvironment();
  });

  it('sets name field', () => {
    expect(getItem('name')).to.equal('fx');
    setItem('name', 'fiy');
    expect(getItem('name')).to.equal('fiy');
  });

  it('sets string value', () => {
    setItem('author', 'pxy');
    expect(getItem('author')).to.equal('pxy');
  });

  it('sets number value', () => {
    setItem('age', 30);
    const age = getItem('age');
    expect(typeof age).to.equal('number');
    expect(age).to.equal(30);
  });

  it('sets object value', () => {
    setItem('love', { name: 'ball' });
    const love = getItem('love');
    expect(typeof love).to.equal('object');
    expect(love.name).to.equal('ball');
  });

  it('returns undefined when the input is empty', () => {
    expect(setItem('', '2019')).to.equal(undefined);
  });

  it('sets the end = number', () => {
    setItem('sex', 'man', 6000);
    expect(getItem('sex')).to.equal('man');
  });

  it('sets end field Infinity', () => {
    setItem('sexin', 'manin', Infinity);
    expect(getItem('sexin')).to.equal('manin');
  });

  it('sets the end = string', () => {
    setItem('sexs', 'mans', 'Fri, 31 Dec 9999 23:59:59 GMT');
    expect(getItem('sexs')).to.equal('mans');
  });

  it('sets the end = date', () => {
    setItem('sexd', 'mand', new Date('2020/10/06'));
    expect(getItem('sexd')).to.equal('mand');
  });

  it('sets path', () => {
    setItem('sexp', 'manp', 'Fri, 31 Dec 9999 23:59:59 GMT', '/');
    expect(getItem('sexp')).to.equal('manp');
  });

  it('sets domain', () => {
    setItem(
      'sexdo',
      'mando',
      'Fri, 31 Dec 9999 23:59:59 GMT',
      '/',
      '127.0.0.1'
    );
    expect(getItem('sexdo')).to.equal('mando');
  });

  it('sets secure', () => {
    setItem(
      'sexse',
      'manse',
      'Fri, 31 Dec 9999 23:59:59 GMT',
      '/',
      '127.0.0.1',
      true
    );
    expect(getItem('sexse')).to.equal(null);
  });
});
