import { forwardRef, useState } from "react";
import { Animated, Dimensions, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from "react-native";

import type { ScreenProps } from "pager-view/types";

type ScrollViewProps = {
	data: { [key: number]: ScreenProps };
	scrollX: Animated.Value;
	style?: StyleProp<ViewStyle>;
};

const ScrollView = forwardRef<Animated.FlatList<ScreenProps>, ScrollViewProps>((props, ref) => {
	const { data, scrollX: x, style = {}, ...rest } = props;

	const [state, setState] = useState(() => {
		const { width, height } = Dimensions.get("window");
		return { width, height };
	});

	const handleLayout = (event: LayoutChangeEvent) => {
		const { height, width } = event.nativeEvent.layout;
		setState({ width, height });
	};

	const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x } } }], { useNativeDriver: false });

	return (
		<Animated.FlatList
			bounces={false}
			data={Object.values(data)}
			keyExtractor={({ id }) => id.toString()}
			horizontal
			ref={ref}
			pagingEnabled
			onLayout={handleLayout}
			onScroll={handleScroll}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			renderItem={({ item: { element } }) => <View style={[{ width: state.width, height: state.height }, style]}>{element}</View>}
			{...rest}
		/>
	);
});

export { ScrollView, type ScrollViewProps };
