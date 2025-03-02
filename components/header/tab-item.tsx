import { forwardRef } from "react";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";

import { useScroll, type UseScrollRef } from "pager-view/hooks";

interface TabItemProps {
	index: number;
	scrollRef: UseScrollRef;
	text: string;
	width: number;
}

const TabItem = forwardRef<Text, TabItemProps>(({ index, scrollRef, text, width }, ref) => {
	const scheme = useColorScheme() ?? "light";
	const color = scheme === "dark" ? "#fff" : "#475569";

	const handlePress = useScroll(scrollRef, width);

	return (
		<Pressable onPress={() => handlePress(index)}>
			<Text children={text} ellipsizeMode="middle" numberOfLines={1} ref={ref} style={[styles.text, { color }]} />
		</Pressable>
	);
});

const styles = StyleSheet.create({
	text: { fontSize: 20, fontWeight: 600, padding: 4, textAlign: "center" },
});

export { TabItem, type TabItemProps };
