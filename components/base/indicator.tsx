import { Animated, StyleSheet, useColorScheme } from "react-native";

import type { MeasureProps } from "pager-view/components/base";
import type { StyleProps } from "pager-view/types";

type IndicatorProps = {
	measure: MeasureProps;
	scrollX: Animated.Value;
	show?: boolean;
	style?: StyleProps;
	width: number;
};

const Indicator = ({ measure, scrollX, show = true, style, width }: IndicatorProps) => {
	if (!show || !scrollX || !Array.isArray(measure) || measure.length < 2) return null;

	const scheme = useColorScheme();

	const inputRange = measure.map((_, i) => width * i);

	const indicator = scrollX.interpolate({
		inputRange,
		outputRange: measure.map(({ width = 0 }) => width),
	});

	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: measure.map(({ left = 0 }) => left),
	});

	const styles = StyleSheet.create({
		container: {
			backgroundColor: scheme === "dark" ? "#fff" : "#475569",
			borderTopRightRadius: 4,
			borderTopLeftRadius: 4,
			height: 4,
			left: 0,
		},
	});

	return <Animated.View style={[styles.container, style, { width: indicator, transform: [{ translateX }] }]} />;
};

export { Indicator, type IndicatorProps };
