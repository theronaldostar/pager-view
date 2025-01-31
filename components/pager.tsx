import { Fragment, type ReactNode } from "react";

type PagerProps = { element: ReactNode; title: string };

const Pager = ({ ...props }: PagerProps) => {
	return <Fragment children={null} {...props} />;
};

export { Pager, type PagerProps };
