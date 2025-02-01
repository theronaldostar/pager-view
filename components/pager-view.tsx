import { Children, createRef, useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, StyleSheet, View, type ViewProps } from "react-native";

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
	showIndicator?: boolean;
	tabStyle?: StyleProps;
}

const PagerView = ({ children, getRef, showIndicator, style, tabStyle, ...props }: PagerViewProps) => {
	const { current } = useRef(new Animated.Value(0));
	const refScroll = useRef<RefScrollProps>(null);

	const [state, setState] = useState<StateProps>({
		index: 0,
		screens: {},
		tabs: {},
	});

	useEffect(() => {
		const newState = { screens: {}, tabs: {} };

		Children.map(children as ReactElement<{ element: ReactElement; index?: boolean; title: string }>, (child, id) => {
			const { element, index, title } = child.props;

			newState.screens[id] = { id, element };
			newState.tabs[id] = { id, ref: createRef(), title };

			if (index && id !== state.index) setState(prev => ({ ...prev, index: id }));
			if (Object.keys(newState.tabs).length === Children.count(children)) setState(prev => ({ ...prev, newState }));
		});

		return () => {};
	}, [children]);

	return (
		<View style={[styles.component, style]} {...props}>
			<TabBar data={state.tabs} index={state.index} ref={refScroll} getRef={getRef} scrollX={current} showIndicator={showIndicator} style={tabStyle} />
			<ScrollView data={state.screens} ref={refScroll} scrollX={current} style={style} />
		</View>
	);
};

const styles = StyleSheet.create({
	component: { width: "100%", height: "100%" },
});

export { PagerView, type ColorProps, type PagerViewProps };
