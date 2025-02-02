const reactNativeWeb = alias => {
	const extensions = [".css", ".web.mjs", ".web.js", ".web.mts", ".web.ts", ".web.jsx", ".web.tsx", ".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"];

	return {
		name: "vite:react-native-web",
		config: () => ({
			optimizeDeps: {
				force: true,
				esbuildOptions: {
					resolveExtensions: extensions,
				},
			},
			resolve: {
				alias: {
					"react-native": "react-native-web",
					...alias,
				},
				extensions,
			},
		}),
	};
};

export default reactNativeWeb;
export { reactNativeWeb };
