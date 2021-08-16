require('../').extendGlobal();
const get = require('./helpers/get');

class MyClass {
	getRepositories () {
		return get ('https://api.github.com/users/Shift46/repos');
	}

	getPopularRepositoriesCount () {
		return this.getRepositories()
			.filter(v => v.watchers > 0)
			.length();
	}
}

(async () => {
	const someClass = new MyClass();

	const result = await someClass.getPopularRepositoriesCount();

	console.log(`Number of repositories with more than zero watchers: ${result}`);
})();
