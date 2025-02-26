import {} from "react-native";

///  <reference types="@types/react" />
///  <reference types="react-native/types" />

declare module "react-native" {
	interface ViewProps {
		className?: string;
		cssInterop?: boolean;
	}
}
