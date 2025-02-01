import { forwardRef, useEffect, useRef, useState, type RefObject } from "react";
import { Animated, Appearance, StyleSheet, View, type LayoutChangeEvent, type ViewStyle } from "react-native";

import { Indicator } from "pager-view/components/base/indicator";
import { TabItem } from "pager-view/components/base/tab-item";
import { useScroll } from "pager-view/hooks";
import type { GetRefProps, StyleProps, TabProps } from "pager-view/types";

type MeasureProps = { left: number; top: number; width: number; height: number }[];

type StateProps = { measure: MeasureProps; width: number };

type TabBarProps = {
	data: { [id: number]: TabProps };
	index?: number;
	getRef?: GetRefProps;
	scrollX: Animated.Value;
	showIndicator?: boolean;
	style?: StyleProps<ViewStyle>;
};

const TabBar = forwardRef<Animated.FlatList, TabBarProps>(({ data, index, getRef, scrollX, showIndicator, style }, tabRef) => {
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
		const measure: MeasureProps = [];

		Object.values(data).map(({ ref }) => {
			console.info("tab-bar(handleEffect):", ref);
			(ref as unknown as RefObject<View>)?.current?.measureLayout(groupRef.current!, (left, top, width, height) => {
				measure.push({ left, top, width, height });
				console.info("tab-bar(measure):", measure, { left, top, width, height });
				if (measure.length === Object.keys(data).length) {
					setState(prev => ({ ...prev, measure }));
				}
			});
		});
	};

	const handleScroll = useScroll(tabRef, state.width);

	const handleLayout = async ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
		const { width } = layout;

		console.info("tab-bar(handleLayout):", width, layout);

		await setState(prev => ({ ...prev, width }));
		await handleEffect();
		handleScroll(index);
	};

	return (
		<View onLayout={handleLayout} style={[style, styles.container]}>
			<View ref={groupRef} style={styles.group}>
				{Object.values(data).map(({ id, title }) => (
					<TabItem index={id} key={id} scrollRef={tabRef} text={title} width={state.width} />
				))}
			</View>
			<Indicator measure={state.measure} scrollX={scrollX} show={showIndicator} style={{}} width={state.width} />
		</View>
	);
});

const scheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff0",
		borderBottomColor: scheme === "dark" ? "#fff" : "#475569",
		borderBottomWidth: 1,
		borderStyle: "solid",
	},
	group: {
		flexDirection: "row",
		justifyContent: "space-around",
		overflow: "hidden",
	},
});

export { TabBar, type MeasureProps, type TabBarProps };
