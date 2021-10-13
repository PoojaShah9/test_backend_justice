/**
 * external libs
 */
const express = require('express');
const config = require('jsconfig');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
/**
 * internal strategies
 */
const { bearerStrategyHandler } = require('./strategies/bearer.strategy');
/**
 * middleware
 */
const authMiddleware = require('./middleware/authenticate.middleware');

const schema = require('./schema');

class HttpServer {
	/**
	 * init a http server
	 *
	 * @param {String} host
	 * @param {String|Number} port
	 * @returns {Promise<void>}
	 */
	async init(host, port) {
		const self = HttpServer;
		// set the host and port
		self.host = host;
		self.port = port;
		// init a http server
		self.app = express();
		// passport init
		passport.use(bearerStrategyHandler());
		//

		// add the settings
		this.useCors();
		this.useRequestParsers();
		this.useRequestTrace();
		// add routes
		this.useRoutes();
		// listen to the http host and port
		// eslint-disable-next-line no-console
		self.app.listen(port, host, () => console.log(`App listening on ${host}:${port}!`));
	}

	/**
	 * add cors
	 *
	 * @returns {void}
	 */
	useCors() {
		const self = HttpServer;
		self.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
			res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
			res.header('Access-Control-Max-Age', 600);
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
			res.header('Access-Control-Expose-Headers', 'content-type, authorization, x-request-id');

			switch (req.method) {
				case 'OPTIONS':
					return res.send({ status: true, data: {} });
				case 'GET':
				case 'POST':
					return next();
				default:
					return res.status(405).send({ status: false, error: 'req_type' });
			}
		});

		return void 0;
	}

	/**
	 * add request id
	 *
	 * @returns {void}
	 */
	useRequestTrace() {
		const self = HttpServer;
		self.app.use((req, res, next) => {
			req.id = uuidv4();
			res.setHeader('X-Request-Id', req.id);
			next();
		});
	}

	/**
	 * parse request
	 *
	 * @returns {void}
	 */
	useRequestParsers() {
		const self = HttpServer;
		self.app.use(passport.initialize());
		self.app.use(bodyParser.json());
		self.app.use(bodyParser.urlencoded({ extended: false }));
	}

	/**
	 * add http routes
	 *
	 * @return {void}
	 */
	useRoutes() {
		const self = HttpServer;
		// add auth middleware
		self.app.use(authMiddleware);
		// add endpoints
		self.app.use(
			'/graph',
			graphqlHTTP(req => ({
				schema,
				context: {
					id: req.id,
					user: req.user,
				},
				...config.graph,
			})),
		);
		// catch 404 and forward
		self.app.use((req, res) =>
			res.status(404).json({
				status: false,
				data: {},
			}),
		);
		// error handler
		// eslint-disable-next-line no-unused-vars
		self.app.use((err, req, res, next) => {
			res.send({
				status: false,
				data: {},
				error: err.message,
			});
		});
	}
}

module.exports = new HttpServer();
