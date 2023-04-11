<script lang="ts">
	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';
	import { page } from '$app/stores';
	import { load } from '$lib/stores.js';
	import { animate, stagger } from 'motion';
	import { onMount } from 'svelte';
	import { storeWidth } from '$lib/stores.js';
	import type { PageServerData } from './$types';

	let url = $page.url.pathname;
	export let data: PageServerData;

	const music = data.data;
	const generes = ['happy', 'sad', 'beach', 'party', 'chill'];

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
				<button class="btn rounded px-6 py-0">{generes}</button>
			{/each}
		</div>
		<div class="articles-section">
			{#each music as music (music.id)}
				<article>
					<iframe
						title={music.title}
						style="border-radius:12px"
						src={music.spotify}
						height="352"
						frameBorder="0"
						allowfullscreen=""
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy" />
					<div class="info">
						<button class="btn rounded">{music.mood}</button>
					</div>
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
		gap: 2rem;
		background-color: var(--music-bg-color);
	}
	.filter-mood {
		display: flex;
		justify-content: center;
		gap: 1rem;
		overflow-x: auto;
	}
	.articles-section {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		justify-items: center;
		gap: 0.5rem;
	}
	article {
		display: grid;
		gap: 0.5rem;
		align-content: start;
		justify-content: start;
		justify-items: center;
	}
	iframe {
		width: 350px;
	}
</style>
