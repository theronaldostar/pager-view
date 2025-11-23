import { Fragment, type ReactNode } from "react";

export interface PagerProps {
	index?: boolean;
	title: string;
	element: ReactNode;
}

export const Pager = ({ ...props }: PagerProps) => <Fragment children={null} {...props} />;
