'use strict';

var lo = require('lodash');
var fs = require('fs');


var template = lo.template('==  data-x="<%= x %>" data-y="<%= y %>" data-rotate="<%= rotate %>"\n');


module.exports = function(file, radus) {

  var content = fs.readFileSync(file, 'utf8');


  var slices = content.split('---\n');

  var header = slices[1];
  slices = slices.slice(2);


  var baseAngle = Math.PI / 6;
  for (var i = 0; i < Math.min(slices.length, 12); i++) {
    var angle = -Math.PI / 2 + baseAngle * i;
    var data = {
      x: Math.round(radus * Math.cos(angle)),
      y: Math.round(radus * Math.sin(angle)),
      rotate: Math.round(i * 180 / 6) % 360
    };


    slices[i] = template(data) + slices[i];


  }
  var newSlices = ['---\n' + header].concat(slices).join('---\n');

  fs.writeFileSync('rotated.' + file, newSlices);

};