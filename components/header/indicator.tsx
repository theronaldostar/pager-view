import { Animated, StyleSheet, useColorScheme } from "react-native";

import type { MeasureProps } from "pager-view/components/header";
import type { StyleProps } from "pager-view/types";

type IndicatorProps = {
	measure: MeasureProps;
	scrollX: Animated.Value;
	show?: boolean;
	style?: StyleProps;
	width: number;
};

const Indicator = ({ measure, scrollX, show = true, style = {}, width = 0 }: IndicatorProps) => {
	console.log("Indicator(Before `if`):", { measure, scrollX, show, style, width });
	if (!show || !Array.isArray(measure) || measure.length < 2 || measure.some(value => typeof value !== "object")) return null;
	if (!scrollX || !(scrollX instanceof Animated.Value)) return null;
	console.log("Indicator(After `if`):", { measure, scrollX, show, style, width });

	const scheme = useColorScheme() ?? "light";
	const backgroundColor = scheme === "dark" ? "#fff" : "#475569";

	const inputRange = measure.map((_, i) => width * i);

	const indicator = scrollX?.interpolate({
		inputRange,
		outputRange: measure.map(({ width }) => width || 0),
	});

	const translateX = scrollX?.interpolate({
		inputRange,
		outputRange: measure.map(({ left }) => left || 0),
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
