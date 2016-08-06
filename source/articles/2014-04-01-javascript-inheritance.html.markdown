---
title: Javascript Inheritance
intro: So you have a class in Javascript and you want it to inherit from another class right?
tags: Javascript
---

You want traditional characteristics from your Javascript classes. In Javascript, it can be quite elusive to create "classes" like you are accustomed to in other languages.

- you want to be able to call the parent class constructor as well as the child
- you want the child class to inherit all methods from the parent class
- you want to be able to call super on individual methods in the child class

Below is a simple utility function for extending a class, you could do this manually each time.
But I find it easier to set it up once per project so it can be reused.

```javascript
function extend (base, constructor) {
  var prototype = new Function();
  prototype.prototype = base.prototype;
  constructor.prototype = new prototype();
  constructor.prototype.constructor = constructor;
}
```

Example parent class in this case Animal that has a name and makes noise

```javascript
function Animal (name) {
  this.animalName = name;
  console.log("////== Animal Constructor ==/////");
  console.log("An animal named " + name);
}

Animal.prototype.makeNoise = function (noise) {
  console.log("////== Animal makeNoise() ==////");
  console.log(noise + ", I can make noise...");
};
```

Ok, now we want to make a Dog class that inherits from Animal

```javascript
function Dog (name) {
  // call the super
  Animal.call(this, name);
  console.log("////== Dog Constructor ==/////");
  console.log("I am a Dog named " + this.animalName);
}

// important that this happens before you override methods on parent class
extend(Animal, Dog);

Dog.prototype.makeNoise = function (noise) {
  Animal.prototype.makeNoise.call(this, noise);
  console.log("////== Dog makeNoise() ==////");
  console.log("I am a Dog, I like to " + noise);
};

var dog = new Dog("Sparky");
dog.makeNoise("Bark!!");

"////== Animal Constructor ==/////"
"An animal named Sparky"
"////== Dog Constructor ==/////"
"I am a Dog named Sparky"
"////== Animal makeNoise() ==////"
"Bark!!, I can make noise..."
"////== Dog makeNoise() ==////"
"I am a Dog, I like to Bark!!"
```

So we now have a Dog that also has all the Animal methods.
[See example working](http://jsbin.com/zixohimo/1/edit?js,console)
