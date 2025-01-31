import type { ReactElement } from "react";
import { Children, createRef, useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, type ViewProps } from "react-native";

import { ScrollView } from "pager-view/components/body";
import { TabBar } from "pager-view/components/tab/bar";
import type { ColorProps, ScreenProps, StyleProps, TabProps } from "pager-view/types";

type StateProps = {
	screens: { [key: number]: ScreenProps };
	tabs: { [key: number]: TabProps };
};

interface PagerViewProps extends ViewProps {
	index?: number;
	showIndicator?: boolean;
	setPage?: (index: number) => void;
	//-------------------------------------
	indicatorColor?: ColorProps;
	indicatorStyle?: StyleProps;
	tabBorderColor?: ColorProps;
	tabStyle?: StyleProps;
}

const PagerView = ({ children, index = 0, indicatorColor, showIndicator = true, style, tabStyle = {}, ...props }: PagerViewProps) => {
	const { current } = useRef(new Animated.Value(0));
	const refScroll = useRef(null);

	const [state, setState] = useState<StateProps>({
		screens: {},
		tabs: {},
	});

	useEffect(() => {
		const baseState = { screens: {}, tabs: {} };

		Children.map(children as ReactElement<{ element: ReactElement; title: string }>, (child, id) => {
			const { element, title } = child.props;

			const ref = createRef<View>();

			baseState.screens[id] = { id, element };
			baseState.tabs[id] = { id, ref, title };

			if (Object.keys(baseState.tabs).length === Children.count(children)) setState(baseState);
		});
	}, [children]);

	return (
		<View style={[styles.container, style]} {...props}>
			<TabBar
				data={state.tabs}
				index={index}
				indicatorColor={indicatorColor}
				ref={refScroll}
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

export { PagerView, type ColorProps, type PagerViewProps };
