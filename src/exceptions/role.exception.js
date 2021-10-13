module.exports.CheckPermission = {
	disabled: () => new Error(`User disabled`),
	cant_login: () => new Error(`User cant login`),
	cant_use: PermissionStr => new Error(`User cant use ${PermissionStr}`),
};
