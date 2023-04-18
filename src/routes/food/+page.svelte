<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { animate, stagger } from 'motion';
	import { load } from '$lib/stores.js';
	import { storeWidth } from '$lib/stores.js';

	import Map from '../../components/map/map.svelte';
	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';

	import brunch from '$lib/assets/mapicons/brunch.png';
	import pizza from '$lib/assets/mapicons/pizza.png';
	import sushi from '$lib/assets/mapicons/sushi.png';
	import burguer from '$lib/assets/mapicons/burguer.png';
	import tapas from '$lib/assets/mapicons/tapas.png';

	let url = $page.url.pathname;
	export let data;
	let food = data.data;

	let filtros = ['all', 'tapas', 'sushi', 'brunch', 'burguer', 'pizza'];
	const icons = {
		tapas,
		brunch,
		pizza,
		sushi,
		burguer
	};

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
			<Map locations={food} />
			<div class="filtros">
				{#each filtros as filtro}
					<button class="btn rounded btn-sm gap-2" on:click={(e) => handleMarker(e)}>
						{#if icons[filtro]}
							<img src={icons[filtro]} alt="" />
						{/if}
						{filtro}
					</button>
				{/each}
			</div>
		</div>
		<div class="food-articles-section">
			{#each food as food}
				<article>
					<div class="card lg:card-side bg-primary-content shadow-xl">
						<div class="carousel w-60">
							{#each food.dishes as food, i}
								<div id={'slide' + i} class="carousel-item relative w-full">
									<img src="https://picsum.photos/200" alt="" />
								</div>
							{/each}
						</div>
						<div class="card-body">
							<h2 class="card-title">{food.name}</h2>
							<p>{food.description}</p>
							<div class="dishes">
								<h1 class="text-lg font-semibold">Platos recomendados:</h1>
								<p>{food.dishes.join(', ')}</p>
							</div>

							<div class="card-actions justify-end">
								<button class="btn btn-primary">Map</button>
							</div>
						</div>
					</div>
				</article>
			{/each}
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
			img {
				width: 25px;
				height: 25px;
			}
		}
		.dishes {
			display: flex;
		}
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			.filtros {
				display: flex;
				overflow-x: auto;
				padding: 0.3rem 0;
			}
		}
	}
</style>
