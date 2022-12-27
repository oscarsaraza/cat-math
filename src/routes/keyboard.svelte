<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let value: string = '';

	function onButtonClick(number: number) {
		return () => {
			if (value.length <= 2) value = `${value}${number}`;
		};
	}

	function onOkButtonClick() {
		dispatch('okClick');
	}

	function onDelButtonClick() {
		if (value) value = value.slice(0, -1);
	}
</script>

<div id="keyboard">
	<button class="btn" on:click={onButtonClick(1)}>1</button>
	<button class="btn" on:click={onButtonClick(2)}>2</button>
	<button class="btn" on:click={onButtonClick(3)}>3</button>
	<button class="btn" on:click={onButtonClick(4)}>4</button>
	<button class="btn" on:click={onButtonClick(5)}>5</button>
	<button class="btn" on:click={onButtonClick(6)}>6</button>
	<button class="btn" on:click={onButtonClick(7)}>7</button>
	<button class="btn" on:click={onButtonClick(8)}>8</button>
	<button class="btn" on:click={onButtonClick(9)}>9</button>
	<button class="btn" on:click={onOkButtonClick}>✔</button>
	<button class="btn" on:click={onButtonClick(0)}>0</button>
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
