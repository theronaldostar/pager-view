import { StyleSheet, useColorScheme, View } from "react-native";

type SkeletonProps = {
	quantity?: number;
};

const Skeleton = ({ quantity = 3 }: SkeletonProps) => {
	const scheme = useColorScheme() || "light";
	const borderBottomColor = scheme === "dark" ? "#fff" : "#475569";

	return (
		<View style={styles.main}>
			{Array.from({ length: quantity }).map((_, index) => (
				<View key={index} style={[styles.item, { borderBottomColor }]} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	main: { flexDirection: "row", justifyContent: "space-around" },
	item: { width: 100, height: 20, alignSelf: "center", borderRadius: 14, backgroundColor: "#475569" },
});

export { Skeleton, type SkeletonProps };
