import { Animated, Appearance, StyleSheet } from "react-native";

import type { MeasureProps } from "pager-view/components/base/bar";
import type { ColorProps } from "pager-view/types";

type IndicatorProps = {
	color?: ColorProps;
	measure: MeasureProps;
	scrollX: Animated.Value;
	show: boolean;
	width: number;
};

const Indicator = ({ color, measure, scrollX, width }: IndicatorProps) => {
	if (!scrollX || !Array.isArray(measure) || measure.length < 2) return null;

	const inputRange = measure?.map((_, i) => width * i);

	const indicator = scrollX?.interpolate({
		inputRange,
		outputRange: measure?.map(data => data.width),
	});

	const translateX = scrollX?.interpolate({
		inputRange,
		outputRange: measure.map(data => data.left),
	});

	return <Animated.View style={[styles.container, { backgroundColor: color, width: indicator, transform: [{ translateX }] }]} />;
};

const scheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
	container: {
		backgroundColor: scheme === "dark" ? "#fff" : "#475569",
		borderTopRightRadius: 4,
		borderTopLeftRadius: 4,
		height: 4,
		left: 0,
	},
});

export { Indicator, type IndicatorProps };
