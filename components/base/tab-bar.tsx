import { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, Appearance, StyleSheet, View, type LayoutChangeEvent } from "react-native";

import { Indicator } from "pager-view/components/base/indicator";
import { TabItem } from "pager-view/components/base/tab-item";
import { useScroll } from "pager-view/hooks";
import type { GetRefProps, StyleProps, TabProps } from "pager-view/types";

type MeasureProps = { left: number; top: number; width: number; height: number }[];

type StateProps = { measure: MeasureProps; width: number };

type TabBarProps = {
	data: { [id: number]: TabProps };
	index?: number;
	indicatorStyle?: StyleProps;
	getRef?: GetRefProps;
	scrollX: Animated.Value;
	showIndicator?: boolean;
	style?: StyleProps;
};

const TabBar = forwardRef<Animated.FlatList, TabBarProps>(({ data, index, indicatorStyle, getRef, scrollX, showIndicator, style }, tabRef) => {
	const groupRef = useRef<View>(null);

	const [state, setState] = useState<StateProps>({
		width: 0,
		measure: [],
	});

	useEffect(() => {
		if (getRef) getRef(tabRef, state.width);
		return () => {};
	}, [tabRef, state.width]);

	const handleEffect = () => {
		const measure = [];

		Object.values(data).map(({ ref }) => {
			ref?.current?.measureLayout(groupRef.current!, (left, top, width, height) => {
				measure.push({ left, top, width, height });
				if (measure.length === Object.keys(data).length) setState(prev => ({ ...prev, measure }));
			});
		});
	};

	const handleScroll = useScroll(tabRef, state.width);

	const handleLayout = async ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
		const { width } = layout;

		await setState(prev => ({ ...prev, width }));
		await handleEffect();
		handleScroll(index);
	};

	return (
		<View onLayout={handleLayout} style={[styles.component, style]}>
			<View ref={groupRef} style={styles.container}>
				{Object.values(data).map(({ id, ref, title }) => (
					<TabItem index={id} ref={ref} key={id} scrollRef={tabRef} text={title} width={state.width} />
				))}
			</View>
			<Indicator measure={state.measure} scrollX={scrollX} show={showIndicator} style={indicatorStyle} width={state.width} />
		</View>
	);
});

const scheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
	component: {
		backgroundColor: "#fff0",
		borderBottomColor: scheme === "dark" ? "#fff" : "#475569",
		borderBottomWidth: 1,
		borderStyle: "solid",
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		overflow: "hidden",
	},
});

export { TabBar, type MeasureProps, type TabBarProps };
