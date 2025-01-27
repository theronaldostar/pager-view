import { Animated, StyleSheet } from "react-native";

import type { MeasureProps } from "layout/tab/bar";

type IndicatorProps = {
	scrollX: Animated.Value;
	measure: MeasureProps;
	width: number;
};

const Indicator = ({ measure, scrollX, width }: IndicatorProps) => {
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

	return <Animated.View style={[{ width: indicator, transform: [{ translateX }] }, styles.container]} />;
};

const styles = StyleSheet.create({
	container: {
		height: 4,
		left: 0,
		backgroundColor: "#a78bfa",
		borderTopRightRadius: 4,
		borderTopLeftRadius: 4,
	},
});

export { Indicator, type IndicatorProps };
