# 🚀 pager-view

[![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/pager-view) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theronaldostar/pager-view/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/pager-view.svg?style=flat)](https://www.npmjs.com/package/pager-view) [![Downloads](https://img.shields.io/npm/dm/pager-view.svg)](https://www.npmjs.com/package/pager-view) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

---

## 📌 Features

- ✅ **Compatible with React 19**.
- ⭐️ **Support React Native Web**.
- ⭐️ **Dynamic Sizing**.
- ⭐️ **Support FlashList**.

## How to use

## 📥 Installation & Usage

### 📦 Quick Start

You don’t need to install anything! Simply run:

```shell
npm i pager-view
```

Or with `yarn`:

```shell
yarn add pager-view
```

## 🪄 Quick use

### ⚛️ Standard

```tsx
import { Text, View } from "react-native";
import { PagerView, Pager } from "pager-view";

const Component = () => {
	const Screen = () => (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ color: "#f90" }}>Swipe ➡️</Text>
		</View>
	);

	return (
		<PagerView>
			<Pager title="First page" element={<Screen />} />
			<Pager index title="Second" element={<Text>Second page</Text>} />
			<Pager index={false} title="Third" element={<Text>Third page</Text>} />
		</PagerView>
	);
};

export default Component;
```

### 🪝 With Hook

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { PagerView, Pager, useScroll, type ScrollRef } from "pager-view";

const Component = () => {
	const [ref, setRef] = useState<ScrollRef>({
		ref: null,
		width: 0,
	});

	const Screen = () => {
		const handleChange = useScroll(state.ref, state.width);

		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text onPress={() => handleChange(2)} style={{ color: "#f90" }}>
					Swipe ➡️
				</Text>
			</View>
		);
	};

	return (
		<PagerView getRef={(ref, width) => setRef({ ref, width })}>
			<Pager title="First page" element={<Screen />} />
			<Pager index title="Second" element={<Text>Second page</Text>} />
			<Pager index={false} title="Third" element={<Text>Third page</Text>} />
		</PagerView>
	);
};

export default Component;
```

## 🛠️ Configuration to use in the web version

### ⚡ Example with Vite

#### file: vite.config.ts

```ts
import { env } from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const extensions = [".css", ".json", ".web.mjs", ".web.js", ".web.mts", ".web.ts", ".web.jsx", ".web.tsx", ".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx"];

export default defineConfig({
	define: {
		__DEV__: JSON.stringify(env.NODE_ENV === "development"),
		global: "window",
		process: { env: {} },
	},
	optimizeDeps: {
		force: true,
		esbuildOptions: {
			loader: { ".js": "jsx" },
			resolveExtensions: extensions,
		},
	},
	plugins: [react()],
	resolve: {
		alias: { "react-native": "react-native-web" },
		extensions,
	},
});
```

### ▲ Example with Next

##### file: next.config.mjs

```ts
const extensions = [".css", ".json", ".web.mjs", ".web.js", ".web.mts", ".web.ts", ".web.jsx", ".web.tsx", ".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx"];

const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	transpilePackages: ["react-native", "react-native-web"],
	webpack: config => {
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			"react-native$": "react-native-web",
		};
		config.resolve.extensions = [...config.resolve.extensions, ...extensions];
		return config;
	},
};

export default nextConfig;
```

## 🛠️ Available props

### PagerView

| Prop           | Type      | Default   | Description                                                                                                                                                       |
| -------------- | --------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children       | ReactNode | Required  | The children property must be a Pager component. It defines the content or child elements that are rendered within the parent component, specifically as a Pager. |
| indicatorStyle | StyleProp | undefined | [Go to](#style)                                                                                                                                                   |
| showIndicator  | boolean   | true      | A boolean value that controls the visibility of the indicator. Default is true. Set to false to hide it                                                           |
| style          | StyleProp | undefined | <a id="style">Customizes the visual appearance of the component using a style object or an array of objects.</a>                                                  |
| tabStyle       | StyleProp | undefined | [Go to](#style)                                                                                                                                                   |

---

### Pager

| Prop    | Type      | Default  | Description                                                                                                                |
| ------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| index   | boolean   | false    | Specifies the default page. If multiple Pager components have this property, the last one will be used as the default page |
| element | ReactNode | Required | Accepts a ReactNode, allowing any valid React element to be passed and rendered inside the component.                      |
| title   | string    | Required | The title of the tabs or guides, displayed as the label for each tab.                                                      |

## 🙌 Support & Feedback

📢 Have feedback or found an issue? Open an issue on GitHub!
💻 **GitHub:** [@TheRonaldoStar](https://github.com/theronaldostar/pager-view/discussions)
