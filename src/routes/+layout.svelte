<script lang="ts">
	import '../global.css';
	import Mobile from '../components/mobile/mobile.svelte';
	import { storeWidth } from '$lib/stores.js';
	import { onMount } from 'svelte';
	import { animate, stagger } from 'motion';
	import { theme } from '$lib/stores.js';
	import { page } from '$app/stores';

	let width: number;
	$: storeWidth.set(width);

	let bgColors = {
		'/': `var(--${$theme}-bg-color)`,
		'/food': 'var(--food-bg-color)',
		'/music': 'var(--music-bg-color)',
		'/pics': 'var(--pics-bg-color)'
	};
</script>

<svelte:window bind:innerWidth={width} />

{#if width}
	{#if width > 768}
		<main style={`background-color:${bgColors[$page.url.pathname]}`}>
			<slot />
		</main>
	{:else}
		<Mobile />
		<slot />
	{/if}
{/if}

<style>
	.main {
	}
	:global(.container) {
		display: flex;
		min-width: 100%;
		min-height: 100%;
	}

	:global(.current) {
		width: 100%;
	}
	:global(section) {
		padding: 2rem;
		width: 60px;
	}

	@media (max-width: 768px) {
		:global(section) {
			padding: 1rem;
		}
	}
</style>
