<script lang="ts">
	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { animate, stagger } from 'motion';
	import { load } from '$lib/stores.js';
	import { storeWidth } from '$lib/stores.js';
	import Map from '../../components/map/map.svelte';

	let url = $page.url.pathname;
	let filtros = ['tapas', 'sushi', 'brunch', 'burguer', 'pizza'];

	const handleMarker = (e) => {
		console.log(e.target.innerText);
	};
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
		<div class="map-section">
			<Map locations={''} />
			<div class="filtros">
				{#each filtros as filtro}
					<button class="btn" on:click={(e) => handleMarker(e)}>{filtro}</button>
				{/each}
			</div>
		</div>
	</section>
	{#if $storeWidth > 768}
		<SectionButton section="Music" />
		<SectionButton section="Pics" />
	{/if}
</div>

<style lang="scss">
	section {
		display: grid;
		align-content: start;
		gap: 2rem;
		background-color: var(--food-bg-color);
	}
	.map-section {
		display: grid;
		grid-template-columns: 1fr 150px;
		gap: 2rem;
		.filtros {
			display: grid;
			align-content: center;
			gap: 0.5rem;
		}
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			.filtros {
				display: flex;
			}
		}
	}
</style>
