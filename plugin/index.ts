type ReactNativeProps = { [key: string]: string };

const ReactNative = (alias: ReactNativeProps) => {
	const extensions = [".css", ".json", ".web.js", ".web.ts", ".web.tsx", ".js", ".ts", ".tsx"];

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

export default ReactNative;
export { ReactNative, type ReactNativeProps };
