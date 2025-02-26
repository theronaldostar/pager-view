import { forwardRef } from "react";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";

import { useScroll, type ScrollRef } from "pager-view/hooks";

type TabItemProps = {
	index: number;
	scrollRef: ScrollRef;
	text: string;
	width: number;
};

const TabItem = forwardRef<Text, TabItemProps>(({ index, scrollRef, text, width }, ref) => {
	const scheme = useColorScheme();

	const handlePress = useScroll(scrollRef, width);

	const styles = StyleSheet.create({
		label: {
			color: scheme === "dark" ? "#fff" : "#475569",
			fontSize: 20,
			fontWeight: "600",
			padding: 4,
			textAlign: "center",
		},
	});

	return (
		<Pressable onPress={() => handlePress(index)}>
			<Text ref={ref} style={styles.label} ellipsizeMode="middle" numberOfLines={1}>
				{text}
			</Text>
		</Pressable>
	);
});

export { TabItem, type TabItemProps };
