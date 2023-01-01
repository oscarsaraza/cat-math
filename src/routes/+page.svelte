<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Keyboard from './keyboard.svelte';
	import party from 'party-js';

	export let data: PageData;
	let operations: typeof data.operations;
	let operation: typeof data.operations[0] | null;
	let answer = '';
	let finished: boolean;
	$: operationsLeft = (operations?.length || 0) + 1;

	onMount(() => {
		operations = data.operations;
		loadOperation();
	});

	function loadOperation() {
		if (operations.length) {
			const [first, ...rest] = operations;
			operation = first || null;
			operations = rest;
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
			const operationDiv = document.getElementById('operation');
			if (operationDiv) party.confetti(operationDiv, { count: 50, spread: 10 });
		} else {
			// Wrong answer
		}
		answer = '';
	}
</script>

<div class="main-container">
	<div class="card">
		<div id="operation" class="operation">
			{#if finished}
				<a href="/" target="_self">
					<button class="btn">Reiniciar</button>
				</a>
			{:else}
				<span>{operation?.text || ''} {answer}</span>
			{/if}
		</div>
		<Keyboard bind:value={answer} on:okClick={onOk} />
	</div>
	<div class="message">
		{#if finished}
			<span>Finalizado!!!</span>
		{:else if operations}
			<span>
				{#if operationsLeft !== 1}
					Faltan {operationsLeft} operaciones
				{:else}
					Falta 1 operación
				{/if}
			</span>
		{/if}
	</div>
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
		margin: auto;
		padding: 2em;
		box-shadow: 1px 1px 4px #333;
	}
	.card > .operation {
		width: 100%;
		font-size: 2em;
		height: 2em;
	}
	.btn {
		width: 100%;
		font-size: inherit;
		border: none;
	}
	.message {
		margin: 2em;
		font-size: 2em;
	}
</style>
