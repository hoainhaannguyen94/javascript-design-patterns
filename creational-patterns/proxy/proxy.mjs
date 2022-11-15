const person = {
    name: 'John Doe',
    age: 42,
    nationality: 'American'
};

const personProxy = new Proxy(person, {
    get: (obj, prop) => {
        console.log(`The value of ${prop} is ${obj[prop]}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
        obj[prop] = value;
    }
});

const personProxyValidation = new Proxy(person, {
    get: (obj, prop) => {
        if (!obj[prop]) {
            console.log(
                `Hmm.. this property doesn't seem to exist on the target object`
            );
        } else {
            console.log(`The value of ${prop} is ${obj[prop]}`);
        }
    },
    set: (obj, prop, value) => {
        if (prop === 'age' && typeof value !== 'number') {
            throw Error(`Sorry, you can only pass numeric values for age.`);
        } else if (prop === 'name' && value.length < 2) {
            throw Error(`You need to provide a valid name.`);
        } else {
            console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
            obj[prop] = value;
        }
    }
});

const personProxyReflect = new Proxy(person, {
    get: (obj, prop) => {
        console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
        return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
        console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
        Reflect.set(obj, prop, value);
    }
});

export {
    personProxy,
    personProxyValidation,
    personProxyReflect
};
