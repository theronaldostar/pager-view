import type { ForwardedRef, ReactElement, RefObject } from "react";
import type { Animated, StyleProp, ViewStyle, View } from "react-native";

type ColorProps = `#${string}` | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hwb(${string})`;
type GetRefProps = (ref: ForwardedRef<Animated.FlatList>, width: number) => void;
type ScreenProps = { id: number; element: ReactElement };
type RefScrollProps = Animated.FlatList<ScreenProps>;
type StyleProps<T = ViewStyle> = StyleProp<T>;
type TabProps = { id: number; ref: RefObject<View>; title: string };

export type { ColorProps, GetRefProps, RefScrollProps, ScreenProps, StyleProps, TabProps };
