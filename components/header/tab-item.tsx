import { forwardRef } from "react";
import { Pressable, StyleSheet, Text, useColorScheme, type TextStyle } from "react-native";

import { useScroll, type UseScrollRef } from "pager-view/hooks";
import type { StyleProps } from "pager-view/types";

interface TabItemProps {
	index: number;
	scrollRef: UseScrollRef;
	text: string;
	width: number;
	style?: StyleProps<TextStyle>;
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
		lineHeight: 24,
		paddingVertical: 0,
		textAlign: "center",
	},
});

export { TabItem, type TabItemProps };
