var Class = require("./index.js");

var A = Class({
  foo: function(a,b) {
    console.log("A#foo",a,b);
    return [a,b];
  }
});

var B = Class({
  foo: function(a,b) {
    console.log("B#foo",a,b);
    return this._super("foo",a*10,b*100);
  }
},A);

var C = Class({
  foo: function(a,b) {
    console.log("C#foo",a,b);
    return this._super("foo",a*10,b*100);
  }
},B);

var c = new C()
c.foo(1,2);