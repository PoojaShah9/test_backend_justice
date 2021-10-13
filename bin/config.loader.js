/**
 * Module dependencies
 */
const path = require('path');
const config = require('jsconfig');

const configPath =
	process.argv.indexOf('--config') !== -1 ? process.argv[process.argv.indexOf('--config') + 1] : './config.js';

module.exports = new Promise(resolve => {
	config.load(path.resolve(configPath), async () => {
		const schema = 2;
		// check config version
		if (config.version !== schema) {
			console.error('Unsupported configuration version.', config.version, schema);
			process.exit(-1);
		}
		resolve(true);
	});
});
