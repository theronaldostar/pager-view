import { forwardRef, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, useColorScheme, View, type LayoutChangeEvent } from "react-native";

import { Indicator } from "pager-view/components/header/indicator";
import { TabItem } from "pager-view/components/header/tab-item";
import { useScroll } from "pager-view/hooks";
import type { ColorProps, GetRefProps, StyleProps, TabProps } from "pager-view/types";

type MeasureProps = { left: number; top: number; width: number; height: number }[];

type StateProps = { measure: MeasureProps; width: number };

interface TabBarProps {
	data: Record<number, TabProps>;
	index?: number;
	indicatorStyle?: StyleProps;
	getRef?: GetRefProps;
	headerColor?: ColorProps;
	scrollX: Animated.Value;
	showIndicator?: boolean;
	style?: StyleProps;
}

const TabBar = forwardRef<Animated.FlatList, TabBarProps>(
	({ data, index, indicatorStyle, getRef, headerColor, scrollX, showIndicator, style = {} }, tabRef) => {
		const scheme = useColorScheme() ?? "light";
		const borderBottomColor = headerColor ?? (scheme === "dark" ? "#fff" : "#475569");

		const groupRef = useRef<View>(null);

		const [state, setState] = useState<StateProps>({
			width: 0,
			measure: [],
		});

		useEffect(() => {
			getRef?.(tabRef, state.width);
			handleEffect();
		}, [tabRef, state.width]);

		const handleEffect = () => {
			const measure: MeasureProps = [];
			Object.values(data).map(({ ref }, i, array) => {
				ref?.current?.measureLayout(groupRef.current!, (left, top, width, height) => {
					measure.push({ left, top, width, height });
					if (measure.length === array.length) setState(prev => ({ ...prev, measure }));
				});
			});
		};

		const handleScroll = useScroll(tabRef, state.width);

		const handleLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
			const { width } = layout;
			setState(prev => ({ ...prev, width }));
			handleEffect();
			handleScroll(index);
		};

		return (
			<View onLayout={handleLayout} style={[styles.main, { borderBottomColor }, style]}>
				<View ref={groupRef} style={styles.container}>
					{Object.values(data).map(({ id, ref, title }) => (
						<TabItem index={id} ref={ref} key={id} scrollRef={tabRef} text={title} width={state.width} />
					))}
				</View>
				<Indicator color={headerColor} measure={state.measure} scrollX={scrollX} show={showIndicator} style={indicatorStyle} width={state.width} />
			</View>
		);
	},
);

const styles = StyleSheet.create({
	main: {
		backgroundColor: "rgba(255, 255, 255, 0)",
		borderBottomWidth: 1,
		borderStyle: "solid",
		justifyContent: "center",
		minHeight: 38,
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		overflow: "hidden",
	},
});

export { TabBar, type MeasureProps, type TabBarProps };
