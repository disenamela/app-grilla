module.exports = {
	useFileSystemPublicRoutes: false,
	webpack: (config, options) => {
		if(options.isServer) {
			console.log({config});
			console.log(
				options.webpack.ExtendedAPIPlugin
			);
		}
	
		return config
	  },
}