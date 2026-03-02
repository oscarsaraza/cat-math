import { describe, it, expect } from 'vitest';
import { load } from './+page.server';
import type { PageServerLoad } from './$types';

describe('load function', () => {
	const mockEvent = {} as Parameters<PageServerLoad>[0];

	it('should return exactly 36 operations', () => {
		const result = load(mockEvent);
		expect(result.operations).toHaveLength(36);
	});

	it('should return operations with correct structure and content', () => {
		const result = load(mockEvent);
		const firstOp = result.operations[0];

		expect(firstOp).toHaveProperty('n1');
		expect(firstOp).toHaveProperty('n2');
		expect(firstOp).toHaveProperty('text');
		expect(typeof firstOp.n1).toBe('number');
		expect(typeof firstOp.n2).toBe('number');
		expect(firstOp.text).toBe(`${firstOp.n1} x ${firstOp.n2} =`);
	});

	it('should return randomized operations', () => {
		const result1 = load(mockEvent);
		const result2 = load(mockEvent);

		// We compare the text sequence to ensure it's not just the random 'order' property that differs
		const sequence1 = result1.operations.map(op => op.text);
		const sequence2 = result2.operations.map(op => op.text);

		expect(sequence1).not.toEqual(sequence2);
	});

	it('should only contain numbers between 2 and 9 and follow order n1 <= n2', () => {
		const result = load(mockEvent);
		result.operations.forEach((op) => {
			expect(op.n1).toBeGreaterThanOrEqual(2);
			expect(op.n1).toBeLessThanOrEqual(9);
			expect(op.n2).toBeGreaterThanOrEqual(2);
			expect(op.n2).toBeLessThanOrEqual(9);
			expect(op.n2).toBeGreaterThanOrEqual(op.n1);
		});
	});
});
