import { forwardRef } from "react";
import { Appearance, Pressable, StyleSheet, Text } from "react-native";

import { useScroll, type ScrollRef } from "pager-view/hooks";

type TabItemProps = {
	index: number;
	scrollRef: ScrollRef;
	text: string;
	width: number;
};

const TabItem = forwardRef<unknown, TabItemProps>(({ index, scrollRef, text, width }) => {
	const handlePress = useScroll(scrollRef, width);

	return (
		<Pressable onPress={() => handlePress(index)}>
			<Text style={styles.label} ellipsizeMode="middle" numberOfLines={1}>
				{text}
			</Text>
		</Pressable>
	);
});

const scheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
	label: {
		fontSize: 20,
		fontWeight: "600",
		padding: 4,
		textAlign: "center",
		color: scheme === "dark" ? "#fff" : "#475569",
	},
});

export { TabItem, type TabItemProps };
