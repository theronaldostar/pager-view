import { Children, createRef, ReactNode, useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, StyleSheet, View, type FlatList, type TextStyle, type ViewProps } from "react-native";

import { ScrollView } from "pager-view/components/container";
import { TabBar } from "pager-view/components/header";
import type { PagerProps } from "pager-view/components/pager";
import type { ColorProps, GetRefProps, ScreenProps, StyleProps, TabProps } from "pager-view/types";

type StateProps = {
	index: number;
	screens: Record<number, ScreenProps>;
	tabs: Record<number, TabProps>;
};

export interface PagerViewProps extends ViewProps {
	before?: ReactNode;
	indicatorStyle?: StyleProps;
	getRef?: GetRefProps;
	tabItemsColor?: ColorProps;
	showIndicator?: boolean;
	tabStyle?: StyleProps;
	titleColor?: ColorProps;
	titleStyle?: StyleProps<TextStyle>;
}

export const PagerView = ({ before, children, indicatorStyle, getRef, showIndicator, style, ...props }: PagerViewProps) => {
	if (!children) return null;

	const { current } = useRef(new Animated.Value(0));
	const refScroll = useRef<FlatList<ScreenProps>>(null);

	const [state, setState] = useState<StateProps>({
		index: 0,
		screens: {},
		tabs: {},
	});

	useEffect(() => {
		const screens = {};
		const tabs = {};

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
				tabItemsColor={props.tabItemsColor}
				scrollX={current}
				showIndicator={showIndicator}
				style={props.tabStyle}
				titleColor={props.titleColor}
				titleStyle={props.titleStyle}
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
