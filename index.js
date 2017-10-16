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

Vector.prototype.normalized = function() {
  return Math.sqrt(_.sum(_.map(this.coordinate, (x) => Math.pow(x, 2))))
}

Vector.prototype.magnitude = function() {
  let magnitude = this.normalized()

  if (magnitude === 0){
    throw "denominator is zero"
  }
  return this.timesScalar(1./magnitude)
}

Vector.prototype.dot = function(other) {
  let zipped = _.zipWith(this.coordinate, other.coordinate, (me, other) => (me * other))
  return _.sum(zipped)
}

Vector.prototype.angle = function(other, inDegrees) {
  let normMe = this.normalized()
  let normOther = other.normalized()
  
  let dotted = this.dot(other)

  let angleInRad = Math.acos(dotted / (normMe * normOther))

  if(inDegrees){
    return angleInRad * 180 / Math.PI
  } 

  return angleInRad
}


module.exports = Vector
