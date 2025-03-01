import { Fragment, type ReactNode } from "react";

type PagerProps = { index?: boolean; title: string; element: ReactNode };

const Pager = ({ ...props }: PagerProps) => <Fragment children={null} {...props} />;

export { Pager, type PagerProps };
