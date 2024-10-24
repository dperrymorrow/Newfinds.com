What's wrong with classes?
I won’t get into the full [discussion of if you should use Classes in Javascript](https://github.com/joshburgess/not-awesome-es6-classes/), but you have options.
A factory is merely a function that returns an object. Consider the following.

```javascript
const dog = (name) => {
  const type = 'dog';

  return {
    name: name,
    speak() {
      console.log(`my name is ${this.name} i am a ${type}`);
    }
  };
}

let spot = dog('spot'); --
spot.speak();
// my name is spot i am a dog

let rufus = dog('rufus'); --
rufus.speak();
// my name is rufus i am a dog
```

The Function dog returns an Object, and since it does so each time, you will get a different Object allowing you to maintain “state”. Similarly to how a constructor on a class returns an unique Object.
You can think of hoisted variables inside the Function as a “Static” properties. The example here would be the property type. Type will be the same for all Objects returned by the dog Function.

### Great, but what if I want to share some logic between some factories?

Is this possible, or do I have to resort to Classes with inheritance if I need that?
Yup, you can. Since all a factory function does is just return an Object, you can augment that using [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

```javascript
const animal = () => {
  return {
    name: 'animal',

    eat() {
      console.log(`my name is ${this.name} i am a eating`);
    }
  };
}

const dog = (name) => {
  const type = 'dog';

  return Object.assign(animal(), {
    name: name,
    speak() {
      console.log(`my name is ${this.name} i am a ${type}`);
    }
  });
}

let spot = dog('spot');
spot.speak();
// my name is spot i am a dog
spot.eat();
// my name is spot i am eating
```

So it simply returns the combination of the two objects returned from your functions by using Object.assign. In my experience, this pattern gives me most of what I needed when resorting to a Class. I hope you find this pattern as useful as I do.
