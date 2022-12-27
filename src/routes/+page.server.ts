import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const numbers = [2, 3, 4, 5, 6, 7, 8, 9];
	return {
		operations: numbers
			.flatMap((n1) =>
				numbers.filter((n2) => n2 >= n1).map((n2) => ({ n1, n2, text: `${n1} x ${n2} =` }))
			)
			.map((item) => ({ item, order: Math.random() }))
			.sort((a, b) => a.order - b.order)
			.map(({ item }) => item)
	};
};
