<script lang="ts">
	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import Portfolio from '../../components/portfolio/portfolio.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { animate, stagger } from 'motion';
	import { load } from '$lib/stores.js';
	import { storeWidth } from '$lib/stores.js';
	import Map from '../../components/map/map.svelte';
	let url = $page.url.pathname;
	onMount(() => {
		if (!$load && $storeWidth > 768) {
			animate(
				'.sec-btn',
				{ y: [-1000, 0] },
				{ duration: 1, delay: stagger(0.2, { from: 'last' }) }
			);
			load.set(true);
		}
	});
</script>

<div class="container">
	{#if $storeWidth > 768}
		<SectionButton section="" />
	{/if}
	<section class:current={url == '/food'}>
		<div class="hero">
			<AnimatedTitle title={'Food & Restaurants'} />
		</div>
		<div>
			<Map locations={''} />
		</div>
	</section>
	{#if $storeWidth > 768}
		<SectionButton section="Music" />
		<SectionButton section="Pics" />
	{/if}
</div>

<style>
	section {
		display: grid;
		align-content: start;
		gap: 2rem;
		background-color: var(--food-bg-color);
	}
</style>
