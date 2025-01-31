import { forwardRef, useState } from "react";
import { Animated, Dimensions, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from "react-native";

import type { RefScrollProps, ScreenProps } from "pager-view/types";

type ScrollViewProps = {
	data: { [key: number]: ScreenProps };
	scrollX: Animated.Value;
	style?: StyleProp<ViewStyle>;
};

const ScrollView = forwardRef<RefScrollProps, ScrollViewProps>((props, ref) => {
	const { data, scrollX, style = {}, ...rest } = props;

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
			renderItem={({ item: { element } }) => <View style={[style, { width: state.width, height: state.height }]}>{element}</View>}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			keyExtractor={({ id }) => id.toString()}
			{...rest}
		/>
	);
});

export { ScrollView, type ScrollViewProps };
