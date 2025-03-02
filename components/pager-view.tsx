import { Children, createRef, ReactNode, useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, StyleSheet, View, type ViewProps } from "react-native";

import { ScrollView } from "pager-view/components/container";
import { TabBar } from "pager-view/components/header";
import type { PagerProps } from "pager-view/components/pager";
import type { ColorProps, GetRefProps, ScreenProps, StyleProps, TabProps } from "pager-view/types";

type StateProps = {
	index: number;
	screens: Record<number, ScreenProps>;
	tabs: Record<number, TabProps>;
};

interface PagerViewProps extends ViewProps {
	before?: ReactNode;
	indicatorStyle?: StyleProps;
	getRef?: GetRefProps;
	headerColor?: ColorProps;
	showIndicator?: boolean;
	tabStyle?: StyleProps;
}

const PagerView = ({ before, children, headerColor, indicatorStyle, getRef, showIndicator, style, tabStyle, ...props }: PagerViewProps) => {
	const { current } = useRef(new Animated.Value(0));
	const refScroll = useRef<Animated.FlatList>(null);

	const [state, setState] = useState<StateProps>({
		index: 0,
		screens: {},
		tabs: {},
	});

	useEffect(() => {
		const screens = {},
			tabs = {};

		if (!children) return null;

		Children.map(children as ReactElement<PagerProps>, (child, id) => {
			const { index, title, element } = child.props;
			screens[id] = { id, element };
			tabs[id] = { id, ref: createRef<View>(), title };
			if (index && id !== state.index) setState(prev => ({ ...prev, index: id }));
		});

		if (Object.keys(tabs).length === Children.count(children)) setState(prev => ({ ...prev, screens, tabs }));
	}, [before, children]);

	return (
		<View style={[styles.container, style]} {...props}>
			{before}
			<TabBar
				data={state.tabs}
				index={state.index}
				indicatorStyle={indicatorStyle}
				ref={refScroll}
				getRef={getRef}
				headerColor={headerColor}
				scrollX={current}
				showIndicator={showIndicator}
				style={tabStyle}
			/>
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

export default PagerView;
export { PagerView, type PagerViewProps };
