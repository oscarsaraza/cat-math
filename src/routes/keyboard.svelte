<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let value: string = '';

	function addNumberToAnswer(number: number) {
		if (value.length <= 2) value = `${value}${number}`;
	}

	const onNumberClick = (number: number) => () => addNumberToAnswer(number);

	const handleKeydown = ({ key }: KeyboardEvent) => {
		const number = parseInt(key);
		if (!Number.isNaN(number)) addNumberToAnswer(number);
		else if (key === 'Enter') onOkButtonClick();
		else if (key === 'Backspace') onDelButtonClick();
	};

	function onOkButtonClick() {
		dispatch('okClick');
	}

	function onDelButtonClick() {
		if (value) value = value.slice(0, -1);
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div id="keyboard">
	<button class="btn" on:click={onNumberClick(1)}>1</button>
	<button class="btn" on:click={onNumberClick(2)}>2</button>
	<button class="btn" on:click={onNumberClick(3)}>3</button>
	<button class="btn" on:click={onNumberClick(4)}>4</button>
	<button class="btn" on:click={onNumberClick(5)}>5</button>
	<button class="btn" on:click={onNumberClick(6)}>6</button>
	<button class="btn" on:click={onNumberClick(7)}>7</button>
	<button class="btn" on:click={onNumberClick(8)}>8</button>
	<button class="btn" on:click={onNumberClick(9)}>9</button>
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
