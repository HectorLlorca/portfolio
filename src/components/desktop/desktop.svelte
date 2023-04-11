<script lang="ts">
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { animate, stagger, timeline } from 'motion';
	import { theme } from '$lib/stores.js';

	import Portfolio from '../portfolio/portfolio.svelte';
	import Food from '../../routes/food/+page.svelte';
	import Music from '../../routes/music/+page.svelte';
	import Pics from '../../routes/pics/+page.svelte';

	import camara from '$lib/assets/camara.png';
	import music from '$lib/assets/music.png';
	import food from '$lib/assets/food.png';
	import cv from '$lib/assets/cv.png';
	import wcv from '$lib/assets/wcv.png';

	let url = $page.url.pathname;
	let bgColors = {
		'/': `var(--${$theme}-bg-color)`,
		'/food': 'var(--food-bg-color)',
		'/music': 'var(--music-bg-color)',
		'/pics': 'var(--pics-bg-color)'
	};

	$: if ($theme) {
		bgColors['/'] = `var(--${$theme}-bg-color)`;
	}
	$: if ($page.url.pathname) {
		url = $page.url.pathname;
	}

	onMount(() => {
		const sequence = [
			['.current', { opacity: [0, 1] }, { duration: 0.8, at: '+0.2' }],
			['.notCurrent', { y: [-1000, 0] }, { delay: stagger(0.1, { from: 'last', start: 0.2 }) }]
		];
		timeline(sequence);
	});
</script>

<main style={`background-color:${bgColors[url]}`}>
	<div
		class="porfolio-container"
		style={`background-color:${bgColors['/']}`}
		class:current={url === '/'}
		class:notCurrent={url !== '/'}>
		{#if url === '/'}
			<Portfolio />
		{:else}
			<button
				on:click={() => handleRoute('/')}
				class="btn sec-btn portfolio-btn"
				style={`background-color:${bgColors['/']}`}>
				<img src={$theme === 'lofi' ? cv : wcv} alt="cv-icon" />
				<h1 style={`color:${$theme === 'lofi' ? 'black' : '#d3d3d3'}`}>Portfolio</h1></button>
		{/if}
	</div>

	<div class="food-container" class:current={url === '/food'} class:notCurrent={url !== '/food'}>
		{#if url === '/food'}
			<Food />
		{:else}
			<button on:click={() => handleRoute('/food')} class="btn sec-btn food-btn">
				<img src={food} alt="food-icon" />
				<h1>Food</h1></button>
		{/if}
	</div>

	<div class="music-container" class:current={url === '/music'} class:notCurrent={url !== '/music'}>
		{#if url === '/music'}
			<Music />
		{:else}
			<button on:click={() => handleRoute('/music')} class="btn sec-btn music-btn">
				<img src={music} alt="music-icon" />
				<h1>Music</h1></button>
		{/if}
	</div>

	<div class="pics-container" class:current={url === '/pics'} class:notCurrent={url !== '/pics'}>
		{#if url === '/pics'}
			<Pics />
		{:else}
			<button on:click={() => handleRoute('/pics')} class="btn sec-btn pics-btn">
				<img src={camara} alt="camera" />
				<h1>Pics</h1></button>
		{/if}
	</div>
	{#if $page.error}
		<h1>404</h1>
	{/if}
</main>

<style lang="postcss">
	main {
		display: flex;
	}
	main div {
	}

	.food-container {
		background-color: var(--food-bg-color);
	}
	.music-container {
		background-color: var(--music-bg-color);
	}
	.pics-container {
		background-color: var(--pics-bg-color);
	}

	.current {
		width: 100%;
		transition: width 0.5s;
	}
	.notCurrent {
		width: 60px;
		transition: width 0.5s;
	}
</style>
