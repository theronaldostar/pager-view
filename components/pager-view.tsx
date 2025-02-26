import { Children, createRef, ReactNode, useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, StyleSheet, View, type ViewProps } from "react-native";

import { ScrollView } from "pager-view/components/container";
import { TabBar } from "pager-view/components/base";
import type { PagerProps } from "pager-view/components/pager";
import type { ColorProps, GetRefProps, ScreenProps, StyleProps, TabProps } from "pager-view/types";

type StateProps = {
	index: number;
	screens: { [key: number]: ScreenProps };
	tabs: { [key: number]: TabProps };
};

interface PagerViewProps extends ViewProps {
	before?: ReactNode;
	indicatorStyle?: StyleProps;
	getRef?: GetRefProps;
	showIndicator?: boolean;
	tabStyle?: StyleProps;
}

const PagerView = ({ before, children, indicatorStyle, getRef, showIndicator, style, tabStyle, ...props }: PagerViewProps) => {
	const { current } = useRef(new Animated.Value(0));
	const refScroll = useRef<Animated.FlatList>(null);

	const [state, setState] = useState<StateProps>({
		index: 0,
		screens: {},
		tabs: {},
	});

	useEffect(() => {
		if (!children) return;

		const screens = {};
		const tabs = {};

		Children.map(children as ReactElement<PagerProps>, (child, id) => {
			const { element, index, title } = child.props;
			screens[id] = { id, element };
			tabs[id] = { id, ref: createRef<View>(), title };
			if (index && id !== state.index) setState(prev => ({ ...prev, index: id }));
		});

		if (Object.keys(tabs).length === Children.count(children)) setState(prev => ({ ...prev, screens, tabs }));
	}, [children]);

	return (
		<View style={[styles.component, style]} {...props}>
			{before}
			<TabBar
				data={state.tabs}
				index={state.index}
				indicatorStyle={indicatorStyle}
				ref={refScroll}
				getRef={getRef}
				scrollX={current}
				showIndicator={showIndicator}
				style={tabStyle}
			/>
			<ScrollView data={state.screens} ref={refScroll} scrollX={current} style={style} />
		</View>
	);
};

const styles = StyleSheet.create({
	component: {
		width: "100%",
		height: "100%",
	},
});

export { PagerView, type ColorProps, type PagerViewProps };
