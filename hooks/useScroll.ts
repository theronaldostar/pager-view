import { useCallback } from "react";

const useScroll = (ref, width: number) =>
	useCallback(
		(index: number) => {
			ref?.current?.scrollToOffset({
				animated: true,
				offset: index * width,
			});
		},
		[ref, width],
	);

export { useScroll };
