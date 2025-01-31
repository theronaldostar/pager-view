import { Children, createRef, useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, View, StyleSheet, type ViewProps } from "react-native";

import { ScrollView } from "pager-view/components/container";
import { TabBar } from "pager-view/components/base";
import type { ColorProps, GetRefProps, RefScrollProps, ScreenProps, StyleProps, TabProps } from "pager-view/types";

type StateProps = {
	index: number;
	screens: { [key: number]: ScreenProps };
	tabs: { [key: number]: TabProps };
};

interface PagerViewProps extends ViewProps {
	getRef?: GetRefProps;
	tabStyle?: StyleProps;
}

const PagerView = ({ children, getRef, style, tabStyle = {}, ...props }: PagerViewProps) => {
	const { current } = useRef(new Animated.Value(0));
	const refScroll = useRef<RefScrollProps>(null);

	const [state, setState] = useState<StateProps>({
		index: 0,
		screens: {},
		tabs: {},
	});

	useEffect(() => {
		const newState = { index: 0, screens: {}, tabs: {} };

		Children.map(children as ReactElement<{ element: ReactElement; index?: boolean; title: string }>, (child, id) => {
			const { element, index, title } = child.props;

			const ref = createRef<View>();

			if (index) newState.index = id;
			newState.screens[id] = { id, element };
			newState.tabs[id] = { id, ref, title };

			if (Object.keys(newState.tabs).length === Children.count(children)) setState(newState);
		});

		return () => {};
	}, [children]);

	return (
		<View style={[styles.container, style]} {...props}>
			<TabBar data={state.tabs} index={state.index} ref={refScroll} getRef={getRef} scrollX={current} style={tabStyle} />
			<ScrollView data={state.screens} ref={refScroll} scrollX={current} style={style} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
	},
});

export { PagerView, type ColorProps, type PagerViewProps };
