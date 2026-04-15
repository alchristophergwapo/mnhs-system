'use client';

import { useRouter } from 'next/navigation';

/**
 * A hook that returns a function to navigate to a given URL.
 * The function takes a single argument, which can be a string or a number.
 * If the argument is a string, it will be used as the URL to navigate to.
 * If the argument is -1, it will navigate back in the browser history.
 * If the argument is 1, it will navigate forward in the browser history.
 * @returns {function} A function that takes a URL or a number and navigates to it.
 */
function useNavigate(): (url: string | number) => void {
	const router = useRouter();

	return (url) => {
		if (typeof url === 'string') {
			router.push(url);
		}

		if (url === -1) {
			router.back();
		}

		if (url === 1) {
			router.forward();
		}
	};
}

export default useNavigate;
