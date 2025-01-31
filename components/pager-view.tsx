import type { ReactElement } from "react";
import { Children, createRef, useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, type ViewProps } from "react-native";

import { ScrollView } from "pager-view/components/private/container";
import { TabBar } from "pager-view/components/private/base";
import type { ColorProps, ScreenProps, StyleProps, TabProps } from "pager-view/types";

type StateProps = {
	index: number;
	screens: { [key: number]: ScreenProps };
	tabs: { [key: number]: TabProps };
};

interface PagerViewProps extends ViewProps {
	showIndicator?: boolean;
	setPage?: (index: number) => void;
	//-------------------------------------
	indicatorColor?: ColorProps;
	indicatorStyle?: StyleProps;
	tabBorderColor?: ColorProps;
	tabStyle?: StyleProps;
}

const PagerView = ({ children, indicatorColor, showIndicator = true, style, tabStyle = {}, ...props }: PagerViewProps) => {
	const { current } = useRef(new Animated.Value(0));
	const refScroll = useRef(null);

	const [state, setState] = useState({} as StateProps);

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
			<TabBar
				data={state.tabs}
				index={state.index}
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
