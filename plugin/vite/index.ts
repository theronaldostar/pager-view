const ReactNativeWeb = () => {
	const extensions = [".css", ".json", ".web.js", ".web.ts", ".web.tsx", ".js", ".ts", ".tsx"];

	return {
		name: "react-native-web",
		config(config) {
			return {
				...config,
				optimizeDeps: {
					force: true,
					esbuildOptions: {
						loader: { ".js": "jsx" },
						resolveExtensions: extensions,
						...(config.optimizeDeps?.esbuildOptions || {}),
					},
					...(config.optimizeDeps || {}),
				},
				resolve: {
					alias: {
						"react-native": "react-native-web",
						...(config.resolve?.alias || {}),
					},
					extensions,
				},
			};
		},
	};
};

export { ReactNativeWeb };
