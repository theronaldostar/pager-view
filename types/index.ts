import type { ReactElement } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import type { ScrollRef } from "pager-view/hooks";

type ColorProps = `#${string}` | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hwb(${string})`;

type ScreenProps = { id: number; element: ReactElement };
type TabProps = { id: number; ref: ScrollRef; title: string };

type StyleProps<T = ViewStyle> = StyleProp<T>;

export type { ColorProps, ScreenProps, StyleProps, TabProps };
