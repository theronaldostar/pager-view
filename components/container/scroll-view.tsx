import { forwardRef, useState } from "react";
import { Animated, Dimensions, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from "react-native";

import type { RefScrollProps, ScreenProps } from "pager-view/types";

type ScrollViewProps = {
	data: Record<number, ScreenProps>;
	scrollX: Animated.Value;
	style?: StyleProp<ViewStyle>;
};

const ScrollView = forwardRef<RefScrollProps, ScrollViewProps>(({ data, scrollX, style, ...props }, ref) => {
	const [state, setState] = useState(() => {
		const { width, height } = Dimensions.get("window");
		return { width, height };
	});

	const handleLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
		const { height, width } = layout;
		setState({ width, height });
	};

	const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false });

	return (
		<Animated.FlatList
			bounces={false}
			data={Object.values(data)}
			horizontal
			onLayout={handleLayout}
			onScroll={handleScroll}
			pagingEnabled
			ref={ref}
			renderItem={({ item: { element } }) => <View children={element} style={[{ width: state.width, height: state.height }, style]} />}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			keyExtractor={({ id }) => id.toString()}
			{...props}
		/>
	);
});

export { ScrollView, type ScrollViewProps };
