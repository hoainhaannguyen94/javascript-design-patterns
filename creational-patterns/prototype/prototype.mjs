class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(`Woof!`);
    }
};

const dog1 = new Dog("Daisy");

Dog.prototype.play = () => console.log("Playing now!");

dog1.play();

class SuperDog extends Dog {
    constructor(name) {
        super(name);
    }

    fly() {
        console.log(`Flying!`);
    }
};

const dog2 = new SuperDog("Max");
dog2.bark();
dog2.fly();

const dog = {
    bark() {
        console.log(`Woof!`);
    }
};

const pet1 = Object.create(dog);

pet1.bark(); // Woof!
console.log('Direct properties on pet1: ', Object.keys(pet1));
console.log(`Properties on pet1's prototype: `, Object.keys(pet1.__proto__));
