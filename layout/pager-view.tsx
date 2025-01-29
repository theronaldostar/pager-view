import type { ReactElement, RefObject, ReactNode } from "react";
import { Children, createRef, useEffect, useRef, useState} from "react";
import { Animated, View, StyleSheet, type FlexStyle } from "react-native";

import { Slider } from "pager-view/layout/body/scroll-view";
import { TabBar } from "pager-view/layout/tab/bar";

type ColorProps = `#${string}` | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hwb(${string})`;
type Screen = { id: number; element: ReactElement };
type Tab = { id: number; ref: RefObject<View>; title: string };

type PagerViewProps = {
	index?: number;
	children: ReactNode | ReactElement;
	style?: FlexStyle;
	tabBorderColor?: ColorProps;
	tabStyle?: FlexStyle;
	indicatorColor?: ColorProps;
	indicatorStyle?: FlexStyle;
};


type StateProps = {
	screens: { [key: number]: Screen };
	tabs: { [key: number]: Tab };
};

const PagerView = ({ children, index = 0, style = {}, tabStyle = {} }: PagerViewProps) => {
	const { current } = useRef(new Animated.Value(0));
	const refScroll = useRef<Animated.FlatList>(null);

	const [state, setState] = useState<StateProps>({
		screens: {},
		tabs: {},
	});

	useEffect(() => {
		const baseState: StateProps = {
			screens: {},
			tabs: {},
		};

		Children.map(children as ReactElement<{ element: ReactElement; title: string }>, (child, id) => {
			const { element, title } = child.props;
			const ref = createRef<View>();

			baseState.screens[id] = { id, element };
			baseState.tabs[id] = { id, ref, title };

			if (Object.keys(baseState.tabs).length === Children.count(children)) setState(baseState);
		});
	}, [children]);

	return (
		<View style={[styles.container, style]}>
			<TabBar data={state.tabs} index={index} ref={refScroll} scrollX={current} style={tabStyle} />
			<Slider data={state.screens} ref={refScroll} scrollX={current} style={style} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
	},
});

export { PagerView, type PagerViewProps };
