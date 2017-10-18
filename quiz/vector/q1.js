var Vector = require('../../lib')

function printQuest(v1, v2, method, result){
  console.log("====================")
  console.log(`${v1.toString()} ${method} ${v2.toString()}`)
  console.log(`result => ${result.toString()}`)
  console.log("====================")
}


let one1 = new Vector([8.218, -9.341])
let one2 = new Vector([-1.129, 2.111])
printQuest(one1, one2, "plus", one1.plus(one2))

let two1 =new Vector([7.119, 8.215])
let two2 =new Vector([-8.223, 0.878])
printQuest(two1, two2, "-", two1.minus(two2))

let three = new Vector([1.671, -1.012, -0.318])
printQuest(three, 7.41, "*", three.timesScalar(7.41))
