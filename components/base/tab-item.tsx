import { forwardRef } from "react";
import { Appearance, Pressable, StyleSheet, Text } from "react-native";

import { useScroll, type ScrollRef } from "pager-view/hooks";

type TabItemProps = {
	index: number;
	scrollRef: ScrollRef;
	text: string;
	width: number;
};

const TabItem = forwardRef<Text, TabItemProps>(({ index, scrollRef, text, width }, ref) => {
	const handlePress = useScroll(scrollRef, width);

	return (
		<Pressable onPress={() => handlePress(index)}>
			<Text ref={ref} style={styles.label} ellipsizeMode="middle" numberOfLines={1}>
				{text}
			</Text>
		</Pressable>
	);
});

const scheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
	label: {
		color: scheme === "dark" ? "#fff" : "#475569",
		fontSize: 20,
		fontWeight: "600",
		padding: 4,
		textAlign: "center",
	},
});

export { TabItem, type TabItemProps };
