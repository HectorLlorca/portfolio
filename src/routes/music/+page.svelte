<script lang="ts">
	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';
	import { page } from '$app/stores';
	import { load } from '$lib/stores.js';
	import { animate, stagger } from 'motion';
	import { onMount } from 'svelte';
	import { storeWidth } from '$lib/stores.js';
	import type { PageServerData } from './$types';
	import { getMood } from './helpers.ts';

	let url = $page.url.pathname;
	export let data: PageServerData;

	const music = data.data;
	const generes = ['happy', 'sad', 'beach', 'party', 'chill'];
	let filter = music;

	const setFilter = async (e) => {
		let mood = e.target.innerText.toLowerCase();

		const { data } = await getMood(mood);

		filter = data;
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
		<SectionButton section="Food" />
	{/if}
	<section class:current={url == '/music'}>
		<div class="hero">
			<AnimatedTitle title={'Music Moods'} />
		</div>
		<div class="filter-mood">
			{#each generes as generes}
				<button on:click={(e) => setFilter(e)} class="btn rounded-2xl px-8">{generes}</button>
			{/each}
		</div>
		<div class="articles-section">
			{#each filter as filter (filter.id)}
				<article>
					<button on:click={(e) => setFilter(e)} class="article-btn">{filter.mood}</button>
					<iframe
						title={filter.title}
						style="border-radius:12px"
						src={filter.spotify}
						height="352"
						frameBorder="0"
						allowfullscreen=""
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy" />
				</article>
			{/each}
		</div>
	</section>
	{#if $storeWidth > 768}
		<SectionButton section="Pics" />
	{/if}
</div>

<style lang="scss">
	section {
		display: grid;
		align-content: start;
		gap: 2rem;
		background-color: var(--music-bg-color);
	}
	.hero {
		margin-bottom: 2rem;
	}
	.filter-mood {
		display: flex;
		gap: 1rem;
		justify-content: center;
		padding-bottom: 0.5rem;
		@media (max-width: 768px) {
			justify-content: start;
			overflow-x: auto;
		}
	}
	.articles-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 450px));
		justify-content: center;
		gap: 1rem;
	}
	article {
		position: relative;

		button {
			position: absolute;
			color: #fff;
			text-decoration: overline;
			top: 20px;
			left: 20px;
			z-index: 2;
			text-transform: capitalize;
			padding: 0.2rem;
			height: fit-content;
			font-weight: 600;
			&:hover {
				transform: scale(1.1);
			}
		}
	}
	iframe {
		position: relative;
		z-index: 1;
		width: 100%;
	}
</style>
