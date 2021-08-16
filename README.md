### **Not for production! Just for experiments! This thing is unreadable.**

#### Description

Extends promise functionality.

#### Install

```npm install lost-promise```

or 

```yarn add lost-promise```

#### How to use

[Examples](./examples)

* How to extend function

```javascript
const someFunction = LostPromise.extendFunction(async () => {
	const result = await someAsyncCall ();
	
	// do smth with result
	
	return result;
});
```

* How to extend class

Just one instance

```javascript
class MyClass {
	constructor() {
		LostPromise.extendClass(this);
	}

	async someFunction () {
		const result = await someAsyncCall ();

		// do smth with result

		return result;
	}
}
```

or

```javascript
class MyClass extends LostPromise.extendable {
	constructor() {
		super();
	}

	async someFunction () {
		const result = await someAsyncCall ();

		// do smth with result

		return result;
	}
}
```

or all new instances

```javascript
class MyClass {
	async someFunction () {
		const result = await someAsyncCall ();

		// do smth with result

		return result;
	}
}

LostPromise.extendClass(MyClass);
```

* How to extend global Promise

At the very beginning of your code

```javascript
require('lost-promise').extendGlobal();
```
