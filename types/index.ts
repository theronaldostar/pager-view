import type { ReactElement } from "react";
import type { Animated, StyleProp, ViewStyle } from "react-native";

import type { ScrollRef } from "pager-view/hooks";

type ColorProps = `#${string}` | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hwb(${string})`;
type ScreenProps = { id: number; element: ReactElement };
type RefScrollProps = Animated.FlatList<ScreenProps>;
type StyleProps<T = ViewStyle> = StyleProp<T>;
type TabProps = { id: number; ref: ScrollRef; title: string };

export type { ColorProps, RefScrollProps, ScreenProps, StyleProps, TabProps };
