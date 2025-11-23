# 🚀 pager-view

[![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/pager-view) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theronaldostar/pager-view/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/pager-view.svg?style=flat)](https://www.npmjs.com/package/pager-view) [![Downloads](https://img.shields.io/npm/dm/pager-view.svg)](https://www.npmjs.com/package/pager-view) [![Runs with Expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

---

## 📌 Features

✅ **Compatible with React 19**<br/>
🌍 **Supports React Native Web**<br/>
📏 **Dynamic Sizing**<br/>
🚀 **Compatible with FlashList**

---

## 📥 Installation & Usage

### 📦 Quick Installation

Run one of the following commands to install the library:

```sh
npm install pager-view
```

Or using `yarn`:

```sh
yarn add pager-view
```

---

## 🪄 Quick Usage

### ⚛️ Standard Example

```tsx
import { Text, View } from "react-native";
import PagerView, { Pager } from "pager-view";

const Component = () => {
	const Header = () => <Text>PagerView</Text>;

	const Screen = () => (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ color: "#f90" }}>Swipe ➡️</Text>
		</View>
	);

	return (
		<PagerView before={<Header />} tabItemsColor="#2196f3" titleColor="var(--color-sky-400)">
			<Pager title="First Page" element={<Screen />} />
			<Pager index title="Second Page" element={<Text>Second page</Text>} />
			<Pager index={false} title="Third Page" element={<Text>Third page</Text>} />
		</PagerView>
	);
};

export default Component;
```

---

### 🪝 Using Hook

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import PagerView, { Pager, useScroll, type ScrollRef } from "pager-view";

const Component = () => {
	const [state, setState] = useState<ScrollRef>({
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
		<PagerView getRef={(ref, width) => setState({ ref, width })}>
			<Pager title="First Page" element={<Screen />} />
			<Pager index title="Second Page" element={<Text>Second page</Text>} />
			<Pager index={false} title="Third Page" element={<Text>Third page</Text>} />
		</PagerView>
	);
};

export default Component;
```

---

## 🌐 Web Configuration

### ⚡ Example with Vite

#### File: `vite.config.ts`

```ts
import { env } from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const extensions = [".css", ".json", ".web.mjs", ".web.js", ".web.mts", ".web.ts", ".web.jsx", ".web.tsx", ".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx"];

export default defineConfig({
	define: {
		__DEV__: JSON.stringify(env.NODE_ENV === "development"),
		global: "window",
		process: { env: { EXPO_OS: "web" } },
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: { ".js": "jsx" },
			resolveExtensions: extensions,
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			"react-native": "react-native-web",
		},
		extensions,
	},
	server: { hmr: true, host: true, open: true },
});
```

### ▲ Example with Next.js

#### File: `next.config.mjs`

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

---

## ⚙️ Available Props

### 📟 `PagerView`

| Prop               | Type          | Default     | Description                                                                            |
| ------------------ | ------------- | ----------- | -------------------------------------------------------------------------------------- |
| **before**         | `react-node`  | `undefined` | Optional component rendered above the tab bar.                                         |
| **children**       | `react-node`  | `required`  | Must contain `Pager` components defining the pages.                                    |
| **indicatorStyle** | `react-style` | `undefined` | Styling for the indicator.                                                             |
| **getRef**         | `function`    | `undefined` | Gets the reference of the pages and their width                                        |
| **tabItemsColor**    | `color`       | `undefined` | It must follow one of the following patterns: `var`, `#`, `rgb`, `rgba`, `hsl`, etc... |
| **titleColor**     | `color`       | `undefined` | It must follow one of the following patterns: `var`, `#`, `rgb`, `rgba`, `hsl`, etc... |
| **showIndicator**  | `boolean`     | `true`      | Controls the visibility of the indicator.                                              |
| **style**          | `react-style` | `undefined` | Custom styling for the component.                                                      |
| **tabStyle**       | `react-style` | `undefined` | Styling for the tabs.                                                                  |
| **titleStyle**     | `react-style` | `undefined` | Custom styling for the tab text                                                        |

### 🪟 `Pager`

| Prop        | Type         | Default    | Description                                                                     |
| ----------- | ------------ | ---------- | ------------------------------------------------------------------------------- |
| **index**   | `boolean`    | `false`    | Defines the default page. If multiple have this property, the last one is used. |
| **title**   | `string`     | `required` | Title of the corresponding tab                                                  |
| **element** | `react-node` | `required` | React component to be rendered                                                  |

---

## 🙌 Support & Feedback

📢 Found an issue or have suggestions? Open an issue on GitHub!

💻 **GitHub:** [@TheRonaldoStar](https://github.com/theronaldostar/pager-view/discussions)<br/>
🐦 **X/Twitter** [@TheRonaldoStar](https://x.com/theronaldostar)<br/>
🔗👔 **Linkedin** [@TheRonaldoStar](https://www.linkedin.com/in/theronaldostar)

---
