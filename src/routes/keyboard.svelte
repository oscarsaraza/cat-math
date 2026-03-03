<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { addNumber, deleteLastChar } from './keyboard';

	const dispatch = createEventDispatcher<{ okClick: null }>();
	export let value: string = '';

	function addNumberToAnswer(number: number) {
		value = addNumber(value, number);
	}

	const onNumberClick = (number: number) => () => addNumberToAnswer(number);

	const handleKeydown = ({ key }: KeyboardEvent) => {
		const number = parseInt(key, 10);
		if (!Number.isNaN(number)) addNumberToAnswer(number);
		else if (key === 'Enter') onOkButtonClick();
		else if (key === 'Backspace') onDelButtonClick();
	};

	function onOkButtonClick() {
		dispatch('okClick');
	}

	function onDelButtonClick() {
		value = deleteLastChar(value);
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div id="keyboard">
	{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
		<button class="btn" on:click={onNumberClick(n)}>{n}</button>
	{/each}
	<button class="btn" on:click={onOkButtonClick}>✔</button>
	<button class="btn" on:click={onNumberClick(0)}>0</button>
	<button class="btn" on:click={onDelButtonClick}>←</button>
</div>

<style>
	#keyboard {
		display: flex;
		flex-wrap: wrap;
		font-size: 2em;
		column-gap: 5%;
		row-gap: 10px;
	}
	.btn {
		width: 30%;
		font-size: 1em;
		border: none;
	}
</style>
