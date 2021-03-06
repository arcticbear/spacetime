'use strict';
const test = require('tape');
const spacetime = require('../src');
//ST  = winter.   november -> march
//DST = summer.   march    -> november

var timezones = [
  'America/Los_Angeles',
  'America/Denver',
  'America/Chicago',
  'America/New_York',
];

test('ST → ST', function(t) {
  timezones.forEach(tz => {
    //start in ST - december 5th 2010 5:00am
    let d1 = spacetime([2010, 11, 5, 5, 0], tz);
    let str = d1.format('nice');
    let isDst = d1.timezone().current.isDst;
    t.equal(str, 'December 5th, 5:00am', 'init-time');
    t.equal(isDst, false, 'init-dst-off');
    //move it to a new time in ST
    d1.add(3, 'days');
    str = d1.format('nice');
    isDst = d1.timezone().current.isDst;
    t.equal(str, 'December 8th, 5:00am', 'new-date');
    t.equal(isDst, false, 'still-dst-off');
  });
  t.end();
});

test('ST → DST', function(t) {
  timezones.forEach(tz => {
    //start in ST - december 5th 2010 10:20am
    let d1 = spacetime([2010, 11, 5, 10, 0], tz);
    let str = d1.format('nice');
    let isDst = d1.timezone().current.isDst;
    t.equal(str, 'December 5th, 10:00am', 'init-time');
    t.equal(isDst, false, 'init-dst-off');
    //move it to a new time in DST - April 5th
    d1.add(4, 'months');
    str = d1.format('nice');
    isDst = d1.timezone().current.isDst;
    t.equal(str, 'April 5th, 10:00am', 'new-date');
    t.equal(isDst, true, 'dst-now-on');
  });
  t.end();
});

test('DST → DST', function(t) {
  timezones.forEach(tz => {
    //start in DST - june 5th 2010 3:00pm
    let d1 = spacetime([2010, 5, 5, 15, 0], tz);
    let str = d1.format('nice');
    let isDst = d1.timezone().current.isDst;
    t.equal(str, 'June 5th, 3:00pm', 'init-time');
    t.equal(isDst, true, 'init-dst-on');
    //move it to a new time in DST - July 5th
    d1.add(1, 'months');
    str = d1.format('nice');
    isDst = d1.timezone().current.isDst;
    t.equal(str, 'July 5th, 3:00pm', 'new-date');
    t.equal(isDst, true, 'dst-still-on');
  });
  t.end();
});

test('DST → ST', function(t) {
  timezones.forEach(tz => {
    //start in DST - june 5th 2010 8:00pm
    let d1 = spacetime([2010, 5, 5, 20, 0], tz);
    let str = d1.format('nice');
    let isDst = d1.timezone().current.isDst;
    t.equal(str, 'June 5th, 8:00pm', 'init-time');
    t.equal(isDst, true, 'init-dst-on');
    //move it to a new time in ST - December 5th
    d1.add(6, 'months');
    str = d1.format('nice');
    isDst = d1.timezone().current.isDst;
    t.equal(str, 'December 5th, 8:00pm', 'new-date');
    t.equal(isDst, false, 'dst-now-off');
  });
  t.end();
});
