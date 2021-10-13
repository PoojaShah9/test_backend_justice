
let Minio = require( 'minio' )
const config = require("jsconfig");

const minioClientConfig = {
	endPoint: config.env.minio.client.endPoint,
	port: parseInt( config.env.minio.client.port),
	accessKey: config.env.minio.client.accessKey,
	secretKey: config.env.minio.client.secretKey,
	useSSL: config.env.minio.client.useSSL ? true : false
}



const minioClient = new Minio.Client( minioClientConfig )

export default minioClient