'use strict';
const test = require('tape');
const spacetime = require('../src');

test('inputs', t => {
  let a = spacetime([2015, 2, 25]);
  let b = spacetime('25 Mar 2015');
  let c = spacetime('Mar 25 2015');
  let d = spacetime('03/25/2015');
  let e = spacetime('2015/03/25');
  let f = spacetime('2015-03-25');
  t.ok(a.isValid(), 'date is valid');
  t.ok(a.isSame(b, 'hour'), 'b-is-equal');
  t.ok(a.isSame(c, 'hour'), 'c-is-equal');
  t.ok(a.isSame(d, 'hour'), 'd-is-equal');
  t.ok(a.isSame(e, 'hour'), 'e-is-equal');
  t.ok(a.isSame(f, 'hour'), 'f-is-equal');
  t.end();
});

test('hour-inputs', t => {
  let s = spacetime('March 21, 2017 20:42:00');
  t.equal(s.date(), 21, 'before-dst.date()');
  t.ok(s.isValid(), 'hour input is valid');

  s = spacetime('March 11, 2017 20:42:00');
  t.equal(s.date(), 11, 'after-dst.date()');
  t.end();
});

test('null input', t => {
  let a = spacetime(null, 'Canada/Eastern');
  let b = spacetime(Date.now(), 'Canada/Eastern');
  t.ok(a.isValid(), 'null input is valid');
  a = a.format();
  b = b.format();
  t.equal(a.iso.short, b.iso.short, 'dates are the same');
  t.equal(a.time.h12, b.time.h12, 'times are the same');
  t.end();
});

test('arr-input', t => {
  let s = spacetime([2020, 2, 28]);
  t.ok(s.isValid(), 'array input is valid');
  t.equal(s.year(), 2020, 'arr-year');
  t.equal(s.date(), 28, 'arr-date');
  t.equal(s.monthName(), 'march', 'arr-month');

  s.set([2017, 1, 2]);
  t.equal(s.year(), 2017, 'set-arr-year');
  t.equal(s.date(), 2, 'set-arr-date');
  t.equal(s.month(), 1, 'set-arr-month');
  t.end();
});

test('obj-input', t => {
  let s = spacetime({
    year: 2020,
    month: 'march',
    date: 28,
  });
  t.ok(s.isValid(), 'obj input is valid');
  t.equal(s.date(), 28, 'obj-date');
  t.equal(s.year(), 2020, 'obj-year');
  t.equal(s.monthName(), 'march', 'obj-month');
  t.end();
});

test('date-input', t => {
  let d = new Date('March 11, 2017');
  let s = spacetime(d);
  t.ok(s.isValid(), 'date object input is valid');
  // t.equal(s.date(), 11, 'date-date');//FIXME:!
  t.equal(s.year(), 2017, 'date-year');
  t.equal(s.monthName(), 'march', 'date-month');
  t.end();
});

test('self-input', t => {
  let a = spacetime('March 11, 2017');
  let s = spacetime(a);
  t.ok(s.isValid(), 'spacetime object input is valid');
  t.equal(s.date(), 11, 'self-date');
  t.equal(s.year(), 2017, 'self-year');
  t.equal(s.monthName(), 'march', 'self-month');
  t.end();
});

test('inputs-in-comparisons', t => {
  let s = spacetime('March 11, 2017');
  t.ok(s.isAfter(new Date('March 10, 2017')), 'compare with date obj');
  // t.ok(s.isBefore([2022, 3, 2]), 'compare with array'); //this isn't working yet
  let future = spacetime([2022, 3, 2]);
  t.ok(s.isBefore(future.epoch), 'compare with epoch');
  t.ok(s.isBefore(future), 'compare with spacetimeObj');
  t.end();
});
