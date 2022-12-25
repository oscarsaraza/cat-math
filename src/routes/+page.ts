import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const csr = true;

export const load: PageLoad = ({ params }) => {
	const numbers = [2, 3, 4, 5, 6, 7, 8, 9];

	return {
		operations: numbers
			.flatMap((n1) => numbers.map((n2) => ({ n1, n2, text: `${n1} x ${n2} =` })))
			.map((item) => ({ item, order: Math.random() }))
			.sort((a, b) => a.order - b.order)
			.map(({ item }) => item)
	};
};
