const _ = require('lodash')
const Decimal = require('decimal.js')


function Vector (coordinate) {
  if (!_.isArray(coordinate)){
    throw "please insert an array";
  }

  this.coordinate = _.map(coordinate, v => (new Decimal(v)));
  this.tolerance = 1e-10
}

Vector.prototype.toString = function(){
  return "Vector(" + JSON.stringify(_.map(this.coordinate, x => x.toDP(3))) + ")"
}


Vector.prototype.plus = function(other) {
  if(!other instanceof Vector){
    throw "should used with Vector object";
  }

  let other_coordinate = _.map(other.coordinate, v => new Decimal(v))

  return new Vector(_.zipWith(this.coordinate, other_coordinate, (me, other) => (me.add(other))))
}

Vector.prototype.minus = function(other) {
  if(!other instanceof Vector){
    throw "should used with Vector object";
  }
  let other_coordinate = _.map(other.coordinate, v => new Decimal(v))

  return new Vector(_.zipWith(this.coordinate, other_coordinate, (me, other) => (me.minus(other))))
}

Vector.prototype.timesScalar = function(other) {
  if (!_.isNumber(other)){
    throw true
  }

  return new Vector(_.map(this.coordinate, (me) => (me.times(other))))
}

Vector.prototype.normalized = function() {
  return Math.sqrt(_.sum(_.map(this.coordinate, (x) => Math.pow(x.toNumber(), 2))))
}

Vector.prototype.magnitude = function() {
  let magnitude = this.normalized()

  if (magnitude === 0){
    throw "denominator is zero"
  }
  return this.timesScalar(1./magnitude)
}

Vector.prototype.dot = function(other) {
  let other_coordinate = _.map(other.coordinate, v => new Decimal(v))
  let zipped = _.zipWith(this.coordinate, other_coordinate, (me, other) => (me * other))
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

Vector.prototype.isOrtogonalTo = function(other) {
  return Math.abs(this.dot(other)) < this.tolerance
}

Vector.prototype.isZero = function(){
  return this.magnitude() < this.tolerance
}

Vector.prototype.isParallelTo = function(other){
  return (this.isZero() || other.isZero() || this.angle(other) === 0 || this.angle(other) < Math.PI)
}


module.exports = Vector
