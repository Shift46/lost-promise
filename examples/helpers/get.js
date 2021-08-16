const https = require("https");

module.exports = url => new Promise ((resolve, reject) => {
	const options = {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0'
		}
	}

	https.get(url, options, res => {
		const data = [];

		res.on('data', chunk => {
			data.push(chunk);
		});

		res.on('end', () => {
			resolve (JSON.parse(Buffer.concat(data).toString()))
		});
	}).on('error', err => {
		reject (err);
	});
});
