/**
 * Models
 */
const FileModel = require('../db/models/file.model');
const ProfileModel = require('../db/models/modifiers/profile.model');
/**
 * Services
 */
// const MinioService = require('./minio.service');

const logger = console;

class ProfileService {
	static async create(data) {
		logger.debug('ProfileService::create processing');

		try {
			let update = {expire: new Date()};
			let options = {upsert: true, new: true, setDefaultsOnInsert: true};
			const profile = await ProfileModel.findOneAndUpdate({
				entity_id: data.entity_id,
				type: 'human',
				status: 'live',
				values: data.vars,
			},update,options);
			logger.info('ProfileService::create profile model:', profile);

			logger.debug('ProfileService::create has been processed with success status');
			return profile;
		} catch (e) {
			logger.debug('ProfileService::create has been processed with fail status');
			logger.error('ProfileService::create error message:', e.toString());
			throw e;
		}
	}

	static async me(data){
		try{
			return ProfileModel.findOne({entity_id : data.entity_id});
		}catch(e){
			logger.debug('ProfileService::me has been processed with fail status');
			logger.error('ProfileService::me error message:', e.toString());
			throw e;
		}
	}

	/**
	 * get upload avatar policy
	 *
	 * @param {ProfileModel} profile
	 * @param {String} filename
	 * @returns {Promise<{postURL: string, formData: {}}>}
	 */
	static async getUploadAvatarPolicy(profile, filename) {
		logger.debug('ProfileService::getUploadAvatarPolicy processing');

		try {
			const extension = /(?:\.([^.]+))?$/.exec(filename)[1];
			const directory = `avatars/${profile._id}`;
			// noinspection JSUnresolvedVariable
			const key = `${directory}/avatar.${extension}`;
			logger.info('ProfileService::getUploadAvatarPolicy key:', key);
			const policy = await MinioService.presignedPostPolicy(key, 'image/', 1, 1024 * 1024 * 10);
			logger.info('ProfileService::getUploadAvatarPolicy policy:', policy);

			await FileModel.create({
				title: 'avatar',
				description: 'avatar',
				data_link: key,
				extension,
				icon: 'picture',
				metadata: [
					{
						key: 'directory',
						value: directory,
					},
					{
						key: 'profile',
						value: profile._id,
					},
				],
			});

			logger.debug('ProfileService::getUploadAvatarPolicy has been processed with success status');
			return policy;
		} catch (e) {
			logger.debug('ProfileService::getUploadAvatarPolicy has been processed with fail status');
			logger.error('ProfileService::getUploadAvatarPolicy error message:', e.toString());
			throw e;
		}
	}

	/**
	 * get upload background policy
	 *
	 * @param {ProfileModel} profile
	 * @param {String} filename
	 * @returns {Promise<{postURL: string, formData: {}}>}
	 */
	static async getUploadBackgroundPolicy(profile, filename) {
		logger.debug('ProfileService::getUploadBackgroundPolicy processing');

		try {
			const extension = /(?:\.([^.]+))?$/.exec(filename)[1];
			const directory = `backgrounds/${profile._id}`;
			const key = `${directory}/origin.${extension}`;
			logger.info('ProfileService::getUploadBackgroundPolicy key:', key);
			const policy = await MinioService.presignedPostPolicy(key, 'image/', 1, 1024 * 1024 * 10);
			logger.info('ProfileService::getUploadBackgroundPolicy policy:', policy);

			await FileModel.create({
				title: 'background',
				description: 'background',
				data_link: key,
				extension,
				icon: 'picture',
				metadata: [
					{
						key: 'directory',
						value: directory,
					},
					{
						key: 'profile',
						value: profile._id,
					},
				],
			});

			logger.debug('ProfileService::getUploadBackgroundPolicy has been processed with success status');
			return policy;
		} catch (e) {
			logger.debug('ProfileService::getUploadBackgroundPolicy has been processed with fail status');
			logger.error('ProfileService::getUploadBackgroundPolicy error message:', e.toString());
			throw e;
		}
	}

	static async uploadAvatar(profile, file){
		minioClient.putObject("main", "resrc" + "/" + "sample.txt", filePath);
		await minioClient.putObject('test-bucket', fileName, req.file.buffer);

	}
}

module.exports = ProfileService;
