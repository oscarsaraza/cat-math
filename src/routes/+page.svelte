<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Keyboard from './keyboard.svelte';

	type Operation = { n1: number; n2: number; text: string };

	export let data: PageData;
	let operations: Array<Operation>;
	let operation: Operation | null;
	let answer = '';
	let finished: boolean;

	onMount(() => {
		operations = data.operations;
		loadOperation();
	});

	function loadOperation() {
		if (operations.length) {
			operation = operations.pop() || null;
			operations = operations; // Force reactivity
		} else {
			finished = operations.length === 0;
			operation = null;
		}
	}

	function onOk() {
		if (!operation) return;
		const { n1, n2 } = operation;
		if (+answer === n1 * n2) {
			// Correct answer
			loadOperation();
		} else {
			// Wrong answer
		}
		answer = '';
	}
</script>

<div class="main-container">
	<div class="card">
		<span class="operation">{operation?.text || ''} {answer}</span>
		<Keyboard bind:value={answer} on:okClick={onOk} />
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
</style>
