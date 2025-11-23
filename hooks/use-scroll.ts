import { useCallback, type ForwardedRef } from "react";
import type { Animated, View } from "react-native";

export type UseScrollRef = ForwardedRef<Animated.FlatList<View>>;

export const useScroll = (ref: UseScrollRef, width: number) =>
	useCallback(
		(index: number) => {
			if ("current" in ref && ref.current)
				ref.current.scrollToOffset({
					animated: true,
					offset: index * width,
				});
		},
		[ref, width],
	);
