import { Animated, StyleSheet, useColorScheme } from "react-native";

import type { MeasureProps } from "pager-view/components/header";
import type { ColorProps, StyleProps } from "pager-view/types";

type IndicatorProps = {
	color?: ColorProps;
	measure: MeasureProps;
	scrollX: Animated.Value;
	show?: boolean;
	style?: StyleProps;
	width: number;
};

const Indicator = ({ color, measure, scrollX, show = true, style = {}, width = 0 }: IndicatorProps) => {
	if (!show || !Array.isArray(measure) || measure.length < 2 || measure.some(value => typeof value !== "object")) return null;
	if (!scrollX || !(scrollX instanceof Animated.Value)) return null;

	const scheme = useColorScheme() || "light";
	const backgroundColor = color ?? (scheme === "dark" ? "#fff" : "#475569");

	const inputRange = measure.map((_, i) => width * i);

	const indicator = scrollX?.interpolate({
		inputRange,
		outputRange: measure.map(({ width = 0 }) => width),
	});

	const translateX = scrollX?.interpolate({
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
