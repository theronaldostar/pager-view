import { Animated, Appearance, StyleSheet } from "react-native";

import type { ColorProps } from "pager-view/types";
import type { MeasureProps } from "pager-view/components/private/base/bar";

type IndicatorProps = {
	color?: ColorProps;
	scrollX: Animated.Value;
	measure: MeasureProps;
	width: number;
	show?: boolean;
};

const Indicator = ({ color, measure, scrollX, width, show }: IndicatorProps) => {
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

	return (
		<Animated.View
			style={[
				{
					backgroundColor: color ?? (scheme === "dark" ? "#fff" : "#475569"),
					transform: [{ translateX }],
					width: indicator,
					display: show ? "flex" : "none",
				},
				styles.container,
			]}
		/>
	);
};

const scheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
	container: {
		height: 4,
		left: 0,
		borderTopRightRadius: 4,
		borderTopLeftRadius: 4,
	},
});

export { Indicator, type IndicatorProps };
