<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let operations;
	let operation;
	let answer = '';
	let answerInput;
	let finished;

	onMount(() => {
		operations = data.operations;
		loadOperation();
		answerInput.focus();
	});

	function loadOperation() {
		if (operations.length) {
			operation = operations.pop();
			operations = operations; // Force reactivity
		} else {
			finished = operations.length === 0;
			operation = '';
		}
	}

	function keyDown(event) {
		const { code } = event;
		if (code === 'Enter') {
			event.preventDefault();
			const { n1, n2 } = operation;
			console.log(+answer, operation);
			if (+answer === n1 * n2) {
				loadOperation();
				// console.log("ok")
			} else {
				// console.log("wrong")
			}
			answer = '';
		}
	}
</script>

<div class="main-container">
	<div class="card">
		<span class="operation">{operation?.text || ''}</span>
		<form action="">
			<input type="text" bind:value={answer} on:keydown={keyDown} bind:this={answerInput} />
		</form>
	</div>
	{#if finished}
		<div>Finalizado!!!</div>
	{:else if operations}
		<div>Faltan {operations.length + 1} operaciones</div>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}
	.main-container {
		height: 100vh;
		background: cadetblue;
		text-align: center;
		padding: 2em;
	}
	.main-container > .card {
		background: #ddd;
		width: 15em;
		margin: 2em auto;
		padding: 2em;
		box-shadow: 1px 1px 4px #333;
	}
	.card > .operation {
		width: 100%;
		font-size: 2em;
	}
	.card > form {
		display: inline;
	}
	form > input {
		width: 2em;
		text-align: center;
		font-size: 2em;
		border: none;
		background: none;
		box-shadow: 1px 1px 4px #333;
	}
</style>
