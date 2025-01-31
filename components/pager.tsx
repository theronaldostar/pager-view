import { Fragment, type ReactNode } from "react";

type PagerProps = { element: ReactNode; index?: boolean; title: string };

const Pager = ({ ...props }: PagerProps) => {
	return <Fragment children={null} {...props} />;
};

export { Pager, type PagerProps };
