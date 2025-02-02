# [PagerView](https://github.com/theronaldostar/pager-view)

[![npm](https://img.shields.io/badge/types-included-blue?style=flat-square)](https://www.npmjs.com/package/pager-view) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/theronaldostar/pager-view/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/pager-view.svg?style=flat)](https://www.npmjs.com/package/pager-view) [![Downloads](https://img.shields.io/npm/dm/pager-view.svg)](https://www.npmjs.com/package/pager-view) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

---

## Features

- ⭐️ Compatible with React 19.
- ⭐️ Support React Native Web.
- ⭐️ Dynamic Sizing.
- ⭐️ Support FlashList.

## How to use

```shell
npm i pager-view
```

```shell
yarn add pager-view
```

## Quick use

### Standard

```jsx
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

### With Hook

```jsx
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
				<Text onPress={() => handleChange(0)} style={{ color: "#f90" }}>Swipe ➡️</Text>
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

## Configuration to use in the web version

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
	},
});
```

## Available props

### PagerView

| Name           | Type      | Default   | Description            |
| -------------- | --------- | --------- | ---------------------- |
| children       | ReactNode | Required  | [See](#children)       |
| indicatorStyle | StyleProp | undefined | [See](#style)          |
| showIndicator  | boolean   | true      | [See](#show-indicator) |
| style          | StyleProp | undefined | [See](#style)          |
| tabStyle       | StyleProp | undefined | [See](#style)          |

### Pager

| Name    | Type      | Default  | Description     |
| ------- | --------- | -------- | --------------- |
| index   | boolean   | false    | [See](#index)   |
| element | ReactNode | Required | [See](#element) |
| title   | string    | Required | [See](#title)   |

### Descriptions

#### PagerView

| Prop          | Description                                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children      | <a id="children">The children property must be a Pager component. It defines the content or child elements that are rendered within the parent component, specifically as a Pager.</a> |
| showIndicator | <a id="show-indicator">A boolean value that controls the visibility of the indicator. Default is true. Set to false to hide it</a>                                                     |
| style         | <a id="style">Customizes the visual appearance of the component using a style object or an array of objects.</a>                                                                       |

#### Pager

| Prop    | Description                                                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| index   | <a id="index">Specifies the default page. If multiple Pager components have this property, the last one will be used as the default page</a> |
| element | <a id="element">Accepts a ReactNode, allowing any valid React element to be passed and rendered inside the component.</a>                    |
| title   | <a id="title">The title of the tabs or guides, displayed as the label for each tab.</a>                                                      |
