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
	let foodImg;

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
	const handleScrollImg = () => {
		foodImg.classlist.add('scrolled');
		//
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
					<div
						on:scroll={handleScrollImg}
						bind:this={foodImg}
						class={`carousel rounded-box ${
							$storeWidth > 768 ? 'carousel-vertical h-96' : 'carousel-start w-full'
						} `}>
						{#each food.dishes as food, i}
							<div class={`carousel-item h-96 `}>
								<img src="https://picsum.photos/800" alt="" />
							</div>
						{/each}
					</div>
					<div class="food-info rounded">
						<div>
							<h2 class="text-xl font-bold">{food.name}</h2>
							<p>{food.description}</p>
						</div>
						<div class="dishes">
							<h1 class="text-lg font-semibold">Platos recomendados:</h1>
							<p>{food.dishes.join(', ')}</p>
						</div>

						<div class="card-actions justify-end align-bottom">
							<button class="btn btn-primary btn-sm rounded">Map</button>
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
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			.filtros {
				display: flex;
				overflow-x: auto;
				padding: 0.3rem 0;
			}
		}
	}
	.carousel {
		position: relative;
	}
	.carousel-item:first-of-type::before {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		content: 'Scroll';
		position: absolute;
		font-size: 1.2rem;
		font-weight: 600;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 1;
	}
	.carousel-item:first-of-type:hover::before {
		content: '';
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.5s ease;
	}
	.carousel-item {
	}

	.food-articles-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
		gap: 0.5rem;
		align-items: start;
		justify-content: center;
		article {
			display: grid;
			padding: 0.3rem;
			align-items: center;
			.food-info {
				position: relative;
				display: grid;
				padding: 1rem;
				padding-left: 2rem;
				height: 100%;
				justify-items: space-between;
				align-items: end;
				background-color: rgba(255, 255, 255, 0.7);
				-webkit-box-shadow: 0px 0px 43px -5px rgba(0, 0, 0, 0.75);
				-moz-box-shadow: 0px 0px 43px -5px rgba(0, 0, 0, 0.75);
				box-shadow: 0px 0px 43px -5px rgba(0, 0, 0, 0.75);
			}

			img {
				height: 100%;
				width: 100%;
			}
			@media (max-width: 768px) {
				grid-template-columns: 1fr;
			}
		}
	}
</style>
