import { forwardRef, useRef, useState, type RefObject } from "react";
import { Animated, Appearance, StyleSheet, View, type LayoutChangeEvent, type ViewStyle } from "react-native";

import { Indicator } from "pager-view/components/private/base/indicator";
import { TabItem } from "pager-view/components/private/base/item";
import { useScroll } from "pager-view/hooks";
import type { ColorProps, StyleProps, TabProps } from "pager-view/types";

type MeasureProps = { left: number; top: number; width: number; height: number }[];

type StateProps = {
	measure: MeasureProps;
	width: number;
};

type TabBarProps = {
	data: { [id: number]: TabProps };
	index?: number;
	indicatorColor?: ColorProps;
	scrollX: Animated.Value;
	showIndicator?: boolean;
	style?: StyleProps<ViewStyle>;
};

const TabBar = forwardRef<Animated.FlatList, TabBarProps>(({ data, index, indicatorColor, scrollX, showIndicator, style = {} }, ref) => {
	const groupRef = useRef<View>(null);

	const [state, setState] = useState<StateProps>({
		width: 0,
		measure: [],
	});

	const handleEffect = () => {
		const measure: MeasureProps = [];

		Object.values(data).map(({ ref }) => {
			(ref as unknown as RefObject<View>)?.current?.measureLayout(groupRef.current, (left: number, top: number, width: number, height: number) => {
				measure.push({ left, top, width, height });
				if (measure.length === Object.keys(data).length) setState(prev => ({ ...prev, measure }));
			});
		});
	};

	const handleScroll = useScroll(ref, state.width);

	const handleLayout = async (event: LayoutChangeEvent) => {
		const { width } = event.nativeEvent.layout;

		await setState(prev => ({ ...prev, width }));
		await handleEffect();
		handleScroll(index);
	};

	return (
		<View onLayout={handleLayout} style={[styles.container, style]}>
			<View ref={groupRef} style={styles.group}>
				{Object.values(data).map(({ id, ref, title }) => (
					<TabItem index={id} key={id} text={title} width={state.width} scrollRef={ref} />
				))}
			</View>
			<Indicator color={indicatorColor} measure={state.measure} scrollX={scrollX} show={showIndicator} width={state.width} />
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
