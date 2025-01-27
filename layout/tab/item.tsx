import { forwardRef, type ForwardedRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { useScroll } from "pager-view/hooks";

type TabItemProps = {
	index: number;
	scrollRef: ForwardedRef<Animated.FlatList<View>>;
	text: string;
	width: number;
};

const TabItem = forwardRef<Text, TabItemProps>((props, ref) => {
	const { index, scrollRef, text, width } = props;

	const handlePress = useScroll(scrollRef, width);

	return (
		<Pressable onPress={() => handlePress(index)}>
			<Text ref={ref} style={styles.label} ellipsizeMode="middle" numberOfLines={1}>
				{text}
			</Text>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	label: {
		fontSize: 20,
		fontWeight: "600",
		padding: 4,
		textAlign: "center",
		color: "#f472b6",
	},
});

export { TabItem, type TabItemProps };
