import { Animated, type FlexStyle } from "react-native";

import type { MeasureProps } from "pager-view/components/base";

type IndicatorProps = {
	measure: MeasureProps;
	scrollX: Animated.Value;
	width: number;
	style?: FlexStyle;
};

const Indicator = ({ measure, scrollX, style, width }: IndicatorProps) => {
	if (scrollX || !Array.isArray(measure) || measure.length < 2) return null;

	const inputRange = measure.map((_, i) => width * i);

	const indicator = scrollX.interpolate({
		inputRange,
		outputRange: measure.map(({ width }) => width),
	});

	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: measure.map(({ left }) => left),
	});

	return <Animated.View style={[style, { width: indicator, transform: [{ translateX }] }]} />;
};

export { Indicator, type IndicatorProps };
