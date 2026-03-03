export function addNumber(currentValue: string, number: number): string {
	if (currentValue.length <= 2) {
		return `${currentValue}${number}`;
	}
	return currentValue;
}

export function deleteLastChar(currentValue: string): string {
	if (currentValue) {
		return currentValue.slice(0, -1);
	}
	return currentValue;
}
