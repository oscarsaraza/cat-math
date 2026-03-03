import { describe, it, expect } from 'vitest';
import { addNumber, deleteLastChar } from './keyboard';

describe('keyboard logic', () => {
	describe('addNumber', () => {
		it('should append a number to an empty string', () => {
			expect(addNumber('', 5)).toBe('5');
		});

		it('should append a number to an existing string', () => {
			expect(addNumber('1', 2)).toBe('12');
		});

		it('should allow up to 3 digits (length 2 + 1)', () => {
			expect(addNumber('12', 3)).toBe('123');
		});

		it('should not allow more than 3 digits', () => {
			expect(addNumber('123', 4)).toBe('123');
		});
	});

	describe('deleteLastChar', () => {
		it('should remove the last character from a string', () => {
			expect(deleteLastChar('123')).toBe('12');
		});

		it('should handle an empty string', () => {
			expect(deleteLastChar('')).toBe('');
		});

		it('should handle a single character string', () => {
			expect(deleteLastChar('1')).toBe('');
		});
	});
});
