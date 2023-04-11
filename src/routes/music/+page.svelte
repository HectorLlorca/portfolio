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
	const generes = ['happy', 'sad', 'angry', 'romantic', 'party', 'workout', 'chill'];

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
		<div class="articles-section">
			{#each music as music (music.id)}
				<article>
					<div class="info">
						<h1 class="text-xl font-bold p-2">{music.title}</h1>
						<p class="text-lg font-semibold">{music.artists}</p>
						<button>{music.mood}</button>
					</div>
					<iframe
						width="560"
						height="315"
						src={music.yt_url}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen />
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
	.articles-section {
		display: grid;
		place-content: center;
		gap: 1rem;
	}

	article {
		display: grid;
		justify-content: center;
		align-items: center;
		text-align: center;
		grid-template-columns: repeat(2, 1fr);
		button {
			text-transform: capitalize;
			font-weight: bold;
			&:hover {
				transform: scale(1.1);
			}
		}
	}
	iframe {
		border: none;
		background-color: #f8f8f8;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		transition: opacity 0.2s ease-in-out;
		overflow: hidden;
		border-radius: 5px;
	}
</style>
