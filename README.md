### **Not for production! Just for experiments!**

#### Description

Extends promise functionality. You can use any Array, Object or JSON function straight after promise. List of all functions is below.

Example

Use

```javascript
const result = await someAsyncFunctionThatReturnsAnArray()
			.filter(v => v.score > 0)
			.entries()
			.fromEntries();
```

instead of

```javascript
const result = Object.fromEntries(Object.entries(
	(await someAsyncFunctionThatReturnsAnArray()).filter(v => v.score > 0)
));
```

[More examples](./examples)

#### Install

```npm install lost-promise```

or 

```yarn add lost-promise```

#### How to use

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
#### Functions

```javascript
[
  "Array.concat",
  "Array.copyWithin",
  "Array.fill",
  "Array.find",
  "Array.findIndex",
  "Array.lastIndexOf",
  "Array.pop",
  "Array.push",
  "Array.reverse",
  "Array.shift",
  "Array.unshift",
  "Array.slice",
  "Array.sort",
  "Array.splice",
  "Array.includes",
  "Array.indexOf",
  "Array.join",
  "Array.keys",
  "Array.entries",
  "Array.values",
  "Array.forEach",
  "Array.filter",
  "Array.flat",
  "Array.flatMap",
  "Array.map",
  "Array.every",
  "Array.some",
  "Array.reduce",
  "Array.reduceRight",
  "Array.toLocaleString",
  "Array.toString",
  "Array.index", //Returns Array element with specific index
  "Array.length", //Function, not getter
  "Object.assign",
  "Object.getOwnPropertyDescriptor",
  "Object.getOwnPropertyDescriptors",
  "Object.getOwnPropertyNames",
  "Object.getOwnPropertySymbols",
  "Object.is",
  "Object.preventExtensions",
  "Object.seal",
  "Object.create",
  "Object.defineProperties",
  "Object.defineProperty",
  "Object.freeze",
  "Object.getPrototypeOf",
  "Object.setPrototypeOf",
  "Object.isExtensible",
  "Object.isFrozen",
  "Object.isSealed",
  "Object.keys",
  "Object.entries",
  "Object.fromEntries",
  "Object.values",
  "Object.get", //Returns Object property with specific name
  "Any.toString", //String([Promise result])
  "Any.toNumber", //Number([Promise result])
  "Any.toBoolean", //Boolean([Promise result])
  "String.parse", //JSON.parse
  "Object.stringify", //JSON.stringify
  "Any.or", //[Promise result] || argument
  "Any.safeOr", //[Promise result] ?? argument
  "Any.returnOnCatch",
  "Any.log", //console.log([Promise result])
  "Any.delay" //Delay in msec after promise
]
```
