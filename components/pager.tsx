import { Fragment, type ReactNode } from "react";

type PagerProps = { element: ReactNode; index?: boolean; title: string };

const Pager = ({ ...props }: PagerProps) => {
	return <Fragment children {...props} />;
};

export { Pager, type PagerProps };
