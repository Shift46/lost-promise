const assignArray = scope => {
	Object.getOwnPropertyNames([].__proto__)
		.filter(name => typeof [][name] === 'function' && name !== 'constructor')
		.forEach(name => scope[name] = function (...opts) {
			return this.then(data => data[name](...opts));
		});
	
	scope.index = function (index) {
		return this.then(data => data[index]);
	};

	scope.length = function () {
		return this.then(data => data.length);
	};
};
/*
const assignAddons  = (scope, addons) => {
	Object.entries(addons).forEach(([ name, addon ]) => {
		scope[name] = function (...opts) {
			return this.then(data => addon(data, opts));
		};
	});
};
*/
const assignObject = scope => {
	Object.getOwnPropertyNames(Object)
		.filter(name => typeof Object[name] === 'function' && name !== 'constructor')
		.forEach(name => scope[name] = function (...opts) {
			return this.then(data => Object[name](data, ...opts));
		});
	
	scope.get = function (index) {
		return this.then(data => data[index]);
	};
};

const assignTransforms = scope => {
	[ 'String', 'Number', 'Boolean' ].forEach(type => {
		scope[`to${type}`] = function () {
			return this.then(data => (global || window)[type](data));
		};
	});
};

const assignJSON = scope => {
	Object.getOwnPropertyNames(JSON)
		.filter(name => typeof JSON[name] === 'function' && name !== 'constructor')
		.forEach(name => scope[name] = function (...opts) {
			return this.then(data => JSON[name](data, ...opts));
		});
};

const assignHelpers = scope => {
	scope.or = function (value) {
		return this.then(data => data || value);
	};

	scope.safeOr = function (value) {
		return this.then(data => data ?? value);
	};

	scope.returnOnCatch = function (value) {
		return this.catch(() => value);
	};

	scope.delay = function (time) {
		return new LostPromise(resolve => setTimeout(() => resolve (this.then(data => data)), time));
	};
};

const assignAll = scope => {
	assignArray(scope);
	assignObject(scope);
	assignTransforms(scope);
	assignJSON(scope);
	assignHelpers(scope);
}

class LostPromise extends Promise {
	constructor(...opts) {
		super(...opts);

		assignAll(this);
	}

	static extendFunction (fn) {
		return () => new this(resolve => resolve (fn()));
	}

	static extendClass (cls, functions) {
		const base = cls.prototype || cls.__proto__;

		const propertyNames = Object.getOwnPropertyNames(base).filter(v => v !== 'constructor' && (!functions || functions.includes(v)));

		for (let name of propertyNames) {
			if (base[name].constructor.name === 'AsyncFunction') {
				const fn = base[name];

				base[name] = function (...props) {
					return new LostPromise(resolve => {
						resolve (fn.bind(this)(...props))
					});
				};
			}
		}
		
		return cls;
	}

	static get extendable () {
		return class {
			constructor() {
				LostPromise.extendClass(this);
			}
		}
	}
}

module.exports = LostPromise;
module.exports.extendGlobal = () => assignAll(Promise.prototype);
