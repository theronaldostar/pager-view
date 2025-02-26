import { forwardRef, useState } from "react";
import { Animated, Dimensions, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from "react-native";

import type { RefScrollProps, ScreenProps } from "pager-view/types";

type ScrollViewProps = {
	className?: string;
	data: { [key: number]: ScreenProps };
	scrollX: Animated.Value;
	style?: StyleProp<ViewStyle> & { $$css?: boolean; test?: string };
};

const ScrollView = forwardRef<RefScrollProps, ScrollViewProps>(({ className, data, scrollX, style, ...props }, ref) => {
	const [state, setState] = useState(() => {
		const { width, height } = Dimensions.get("window");
		return { width, height };
	});

	const handleLayout = (event: LayoutChangeEvent) => {
		const { height, width } = event.nativeEvent.layout;
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
			renderItem={({ item: { element } }) => (
				<View children={element} style={[{ width: state.width, height: state.height, $$css: true, test: className }, style]} />
			)}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			keyExtractor={({ id }) => id.toString()}
			{...props}
		/>
	);
});

export { ScrollView, type ScrollViewProps };
