import { forwardRef, useRef, useState, type RefObject } from "react";
import { Animated, StyleSheet, View, type FlexStyle, type LayoutChangeEvent, type Text } from "react-native";

import { Indicator } from "layout/tab/indicator";
import { TabItem } from "layout/tab/item";
import { useScroll } from "hooks";

type ScrollProps = Animated.FlatList<View>;

type TabBarData = {
	[id: number]: {
		id: number;
		ref: RefObject<Text>;
		title: string;
	};
};

type TabBarProps = {
	data: TabBarData;
	index?: number;
	scrollX: Animated.Value;
	style?: FlexStyle;
};

type MeasureProps = { left: number; top: number; width: number; height: number }[];

type StateProps = {
	width: number;
	measure: MeasureProps;
};

const TabBar = forwardRef<ScrollProps, TabBarProps>((props, scrollRef) => {
	const { data, index, scrollX, style = {} } = props;

	const [state, setState] = useState<StateProps>({
		width: 0,
		measure: [],
	});

	const groupRef = useRef<View>(null);

	const handleScroll = useScroll(scrollRef, state.width);

	const handleEffect = () => {
		const measure: MeasureProps = [];

		Object.values(data).map(({ ref }) => {
			ref.current?.measureLayout(groupRef.current!, (left, top, width, height) => {
				measure.push({ left, top, width, height });
				if (measure.length === Object.keys(data).length) setState(prev => ({ ...prev, measure }));
			});
		});
	};

	const handleLayout = async (event: LayoutChangeEvent) => {
		const { width } = event.nativeEvent.layout;

		await setState(prev => ({ ...prev, width }));
		await handleEffect();
		handleScroll(index);
	};

	return (
		<View onLayout={handleLayout} style={[styles.container, style]}>
			<View ref={groupRef} style={styles.group}>
				{Object.values(data).map(({ id, ref, title }) => (
					<TabItem index={id} key={id} text={title} width={state.width} ref={ref} scrollRef={scrollRef} />
				))}
			</View>
			<Indicator measure={state.measure} scrollX={scrollX} width={state.width} />
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff0",
		borderBottomColor: "#a78bfa",
		borderBottomWidth: 1,
		borderStyle: "solid",
	},
	group: {
		flexDirection: "row",
		justifyContent: "space-around",
		overflow: "hidden",
	},
});

export { TabBar, type MeasureProps, type ScrollProps, type TabBarData, type TabBarProps };
