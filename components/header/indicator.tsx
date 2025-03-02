import { Animated, StyleSheet } from "react-native";

import type { MeasureProps } from "pager-view/components/header";
import type { ColorProps, StyleProps } from "pager-view/types";

interface IndicatorProps {
	color?: ColorProps;
	measure: MeasureProps;
	scrollX: Animated.Value;
	show?: boolean;
	style?: StyleProps;
	width: number;
}

const Indicator = ({ color, measure, scrollX, show = true, style = {}, width = 0 }: IndicatorProps) => {
	console.log("Indicator(before):", { color, measure, scrollX, show, style, width });
	if (!show || !scrollX || !Array.isArray(measure) || measure.length < 2 || measure.some(value => typeof value !== "object")) return null;
	console.log({ measure, scrollX, width });

	const backgroundColor = color ?? "#336aea";

	const inputRange = measure.map((_, i) => width * i);

	const indicator = scrollX.interpolate({
		inputRange,
		outputRange: measure.map(({ width = 0 }) => width),
	});

	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: measure.map(({ left = 0 }) => left),
	});

	return <Animated.View style={[styles.main, { backgroundColor }, style, { width: indicator, transform: [{ translateX }] }]} />;
};

const styles = StyleSheet.create({
	main: {
		borderTopRightRadius: 4,
		borderTopLeftRadius: 4,
		height: 4,
		left: 0,
	},
});

export { Indicator, type IndicatorProps };
