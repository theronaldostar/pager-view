import type { ForwardedRef, ReactElement, RefObject } from "react";
import type { Animated, StyleProp, ViewStyle, View } from "react-native";

type ScrollInstanceRef = ForwardedRef<Animated.FlatList>;

type ColorProps = `#${string}` | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hwb(${string})`;
type GetRefProps = (ref: ScrollInstanceRef, width: number) => void;
type ScreenProps = { id: number; element: ReactElement };
type ScrollRef = { ref: ScrollInstanceRef; width: number };
type StyleProps<T = ViewStyle> = StyleProp<T>;
type TabProps = { id: number; ref: RefObject<View>; title: string };

export type { ColorProps, GetRefProps, ScreenProps, ScrollRef, StyleProps, TabProps };
