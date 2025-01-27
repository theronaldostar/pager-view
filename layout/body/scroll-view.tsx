import { forwardRef, useState, type ReactElement } from "react";
import { Animated, Dimensions, View, type LayoutChangeEvent, type FlexStyle } from "react-native";

type ScrollProps = Animated.FlatList;

type SliderProps = {
	data: { [id: number]: { element: ReactElement; id: number } };
	scrollX: Animated.Value;
	style?: FlexStyle;
};

const Slider = forwardRef<ScrollProps, SliderProps>((props, ref) => {
	const { data, scrollX, style = {}, ...rest } = props;

	const { width, height } = Dimensions.get("window");

	const [state, setState] = useState({ width, height });

	const handleLayout = (event: LayoutChangeEvent) => {
		const { height, width } = event.nativeEvent.layout;
		setState({ width, height });
	};

	return (
		<Animated.FlatList
			data={Object.values(data)}
			onLayout={handleLayout}
			keyExtractor={({ id }) => id.toString()}
			horizontal
			ref={ref}
			pagingEnabled
			onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
			bounces={false}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => <View style={[{ width: state.width, height: state.height }, style]}>{item.element}</View>}
			{...rest}
		/>
	);
});

export { Slider, type SliderProps };
