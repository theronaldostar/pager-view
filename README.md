# [PagerView](https://boteasy.net/)
[![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/pager-view) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theronaldostar/pager-view/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/pager-view.svg?style=flat)](https://www.npmjs.com/package/pager-view) [![Downloads](https://img.shields.io/npm/dm/pager-view.svg)](https://www.npmjs.com/package/pager-view) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

---

## Features
- ⭐️ Support React Native Web.
- ⭐️ Dynamic Sizing.
- ⭐️ Support FlashList.

## How to use:

```shell
npm i pager-view
```

```shell
yarn add pager-view
```

## Quick use:

```jsx
import { PagerView, Pager } from "pager-view";

const Component = () => {
	const View = () => <>Tab One!</>;

	return (
		<PagerView>
			<Pager title="TabOne" element={<View />} />
			<Pager title="TabTwo" element={<>Tab Two!</>} />
		</PagerView>
	);
};

export default Component;
```

## Configuration to use in the web version:

### Example with Vite.js

```jsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const extensions = [".css", ".json", ".web.js", ".web.ts", ".web.tsx", ".js", ".ts", ".tsx"];

export default defineConfig({
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
	}
});

```

## Available props:

### PagerView

| Name | Type | Default | Description |
| -------- | -------- | -------- | -------- |
| index | number | 0 | - |
| children | ReactElement, ReactNode | Required | - |
| style | FlexStyle | {} | - |
| tabStyle | FlexStyle | {} | - |

### Pager

| Name | Type | Default | Description |
| -------- | -------- | -------- | -------- |
| title | string | Required | - |
| element | ReactNode | Required | - |
