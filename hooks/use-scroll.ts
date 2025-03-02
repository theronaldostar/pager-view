import { useCallback, type ForwardedRef } from "react";
import type { Animated, View } from "react-native";

type UseScrollRef = ForwardedRef<Animated.FlatList<View>>;

const useScroll = (ref: UseScrollRef, width: number) =>
	useCallback(
		(index: number) => {
			if ("current" in ref) ref.current?.scrollToOffset({ animated: true, offset: index * width });
		},
		[ref, width],
	);

export { useScroll, type UseScrollRef };
