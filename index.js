const _ = require('lodash')


function Vector (coordinate) {
  if (!_.isArray(coordinate)){
    throw "please insert an array";
  }

  this.coordinate = coordinate;
}

Vector.prototype.plus = function(other) {
  if(!other instanceof Vector){
    throw "should used with Vector object";
  }

  return new Vector(_.zipWith(this.coordinate, other.coordinate, (me, other) => (me+other)))
}

Vector.prototype.minus = function(other) {
  if(!other instanceof Vector){
    throw "should used with Vector object";
  }

  return new Vector(_.zipWith(this.coordinate, other.coordinate, (me, other) => (me-other)))
}

Vector.prototype.timesScalar = function(other) {
  if (!_.isNumber(other)){
    throw true
  }

  return new Vector(_.map(this.coordinate, (me) => (me*other)))
}


module.exports = Vector
