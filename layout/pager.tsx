import { Fragment, type ReactNode } from "react";

type PagerProps = {
	title: string;
	element: ReactNode;
};

const Pager = (props: PagerProps) => {
	const { ...rest } = props;
	return <Fragment children {...rest} />;
};

export { Pager, type PagerProps };
