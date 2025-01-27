import { Children, createRef, useEffect, useRef, useState, type ReactElement, type RefObject, type ReactNode } from "react";
import { Animated, View, StyleSheet, type FlexStyle } from "react-native";

import { Slider } from "layout/body/scroll-view";
import { TabBar } from "layout/tab/bar";

type ContainerProps = {
	index?: number;
	children: ReactNode | ReactElement;
	style?: FlexStyle;
	tabStyle?: FlexStyle;
};

type Screen = { id: number; element: ReactElement };
type Tab = { id: number; ref: RefObject<View>; title: string };

type StateProps = {
	screens: { [key: number]: Screen };
	tabs: { [key: number]: Tab };
};

const PagerView = (props: ContainerProps) => {
	const { children, index = 0, style = {}, tabStyle = {} } = props;

	const refScroll = useRef<Animated.FlatList>(null);
	const { current } = useRef(new Animated.Value(0));

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

export { PagerView, type ContainerProps };
