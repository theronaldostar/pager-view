import { forwardRef } from "react";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";

import { useScroll, type UseScrollRef } from "pager-view/hooks";
import type { StyleProps } from "pager-view/types";

interface TabItemProps {
	index: number;
	scrollRef: UseScrollRef;
	text: string;
	width: number;
	style?: StyleProps;
}

const TabItem = forwardRef<Text, TabItemProps>(({ index, scrollRef, text, style = {}, width }, ref) => {
	const scheme = useColorScheme() ?? "light";
	const color = scheme === "dark" ? "#fff" : "#475569";

	const handlePress = useScroll(scrollRef, width);

	return (
		<Pressable onPress={() => handlePress(index)}>
			<Text children={text} ellipsizeMode="middle" numberOfLines={1} ref={ref} style={[styles.text, style, { color }]} />
		</Pressable>
	);
});

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
		lineHeight: 16,
		padding: 4,
		textAlign: "center",
	},
});

export { TabItem, type TabItemProps };
