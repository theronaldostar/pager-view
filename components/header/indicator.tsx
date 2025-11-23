import { Animated, StyleSheet } from "react-native";

import type { MeasureProps } from "pager-view/components/header";
import type { ColorProps, StyleProps } from "pager-view/types";

export interface IndicatorProps {
	color?: ColorProps;
	measure: MeasureProps;
	scrollX: Animated.Value;
	show?: boolean;
	style?: StyleProps;
	width: number;
}

export const Indicator = ({ color, measure, scrollX, show = true, style = {}, width = 0 }: IndicatorProps) => {
	if (!show || !scrollX || !Array.isArray(measure) || measure.length < 2 || measure.some(value => typeof value !== "object")) return null;

	const backgroundColor = color ?? "#2196f3";

	const inputRange = measure.map((_, index) => width * index);

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
