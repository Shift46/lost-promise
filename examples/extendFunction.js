const LostPromise = require('../');
const get = require('./helpers/get');

const getRepositories = LostPromise.extendFunction(async () => {
	return get ('https://api.github.com/users/Shift46/repos');
});

(async () => {
	const result = await getRepositories()
		.filter(v => v.watchers > 0)
		.length();

	console.log(`Number of repositories with more than zero watchers: ${result}`);
})();
