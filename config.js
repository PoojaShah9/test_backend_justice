module.exports = {
	version: 2,
	env: {
		appKey: 'ZTA0MTlkZDMzMDFhM2E1MmZiY2YxNzk1MTQ3NzkwNTBkNDRmMWQ5OTU3Mzg5MTNiYzA2MmNlNWJmNzUxNDMzNA==',
		refreshKey : ' MjlkOGM5Y2U3NDQxY2VmNWQ0N2RhYzc4NGM5NzFmMTk2NmIzNzZiNGU1Yjk1YzdmNTFlMDNkMmE5MmZmNGExOQ==',
		jwtAlgorithm: 'HS256',
		cryptoAlgorithm: 'aes-256-cbc',
		passwordSaltRounds: 10,
		lifetimeResetToken: 1000 * 60 * 60, // 1 hour
	},
	http: {
		host: '::',
		port: 8001,
	},
	amqp: 'amqp://pooja@localhost:15672',
	databases: {
		main: 'mongodb://localhost:27017/yj',
		test: 'mongodb://localhost:27017/test',
	},
	graph: {
		graphiql: true,
	},
	minio: {
		client: {
			endPoint: '192.168.1.5',
			port: 9000,
			useSSL: false,
			accessKey: 'minioadmin',
			secretKey: 'minioadmin',
		},
		bucketName: 'test',
		destBucketName: 'test',
		bucketRegion: '',
	},
};
