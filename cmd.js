#!/usr/bin/env node

'use strict';
var rotate = require('./rotate.js');
var program = require('commander');

program
  .version('0.0.0')
  .option('<mdfile>', 'Mdpress file')
  .option('-r --radus <radus>', 'Radus in px', parseInt)
  .parse(process.argv);

console.log(program);

var files = program.args;

for (var i = 0, l = files.length; i < l; i++) {
  rotate(files[i], program.radus || 3600);
}