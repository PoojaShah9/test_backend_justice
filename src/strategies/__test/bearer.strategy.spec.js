/**
 * Module dependencies
 */
const chai = require('chai');
const chaiHttp = require('chai-http');

/**
 * Utils
 */
const TestsUtils = require('../../utils/tests.utils');
/**
 * Services
 */
const EntityService = require('../../services/entity.service');
const AuthService = require('../../services/auth.service');

describe('Bearer Strategy', () => {
	it('should add user model to the request object', () =>
		new Promise(async (resolve, reject) => {
			const app = TestsUtils.expressWithPassport();
			const email = 'test@email';
			const password = 'password';
			const user = await EntityService.create({
				email,
				password,
			});

			const auth = await AuthService.login({
				email,
				password,
			});

			app.post('/', (req, res) => {
				res.end((req.user && req.user.email) || '');
			});

			chai.use(chaiHttp);
			const { expect } = chai;

			await chai
				.request(app)
				.post('/')
				.then(res => {
					expect(res.text).to.equal('');
				})
				.catch(err => {
					reject(err);
				});
			await chai
				.request(app)
				.post('/')
				.set('authorization', '')
				.then(res => {
					expect(res.text).to.equal('');
				})
				.catch(err => {
					reject(err);
				});
			await chai
				.request(app)
				.post('/')
				.set('authorization', auth.token_type)
				.then(res => {
					expect(res.text).to.equal('');
				})
				.catch(err => {
					reject(err);
				});
			await chai
				.request(app)
				.post('/')
				.set('authorization', `${auth.token_type} text`)
				.then(res => {
					expect(res.text).to.equal('');
				})
				.catch(err => {
					reject(err);
				});
			await chai
				.request(app)
				.post('/')
				.set('authorization', `${auth.token_type} ${auth.access_token}`)
				.then(res => {
					expect(res.text).to.equal(user.email);
				})
				.catch(err => {
					reject(err);
				});

			resolve();
		}));
});
