import { forwardRef, useMemo } from "react";
import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";

import { useScroll, type ScrollRef } from "pager-view/hooks";

type TabItemProps = { index: number; scrollRef: ScrollRef; text: string; width: number };

const TabItem = forwardRef<Text, TabItemProps>(({ index, scrollRef, text, width }, ref) => {
	const scheme = useColorScheme();

	const handlePress = useScroll(scrollRef, width);

	const color = useMemo(() => (scheme === "dark" ? "#fff" : "#475569"), [scheme]);

	return (
		<Pressable onPress={() => handlePress(index)}>
			<Text children={text} ref={ref} style={[styles.label, { color }]} ellipsizeMode="middle" numberOfLines={1} />
		</Pressable>
	);
});

const styles = StyleSheet.create({
	label: {
		fontSize: 20,
		fontWeight: "600",
		padding: 4,
		textAlign: "center",
	},
});

export { TabItem, type TabItemProps };
