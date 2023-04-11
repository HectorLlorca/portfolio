<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';

	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';
	import { page } from '$app/stores';
	import { load } from '$lib/stores.js';
	import { animate, stagger } from 'motion';
	import { storeWidth } from '$lib/stores.js';
	import { fade } from 'svelte/transition';

	let url = $page.url.pathname;
	export let data: PageServerData;
	const pics = data.data;

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
		<SectionButton section="Music" />
	{/if}

	<section class:current={url == '/pics'}>
		<div class="hero">
			<AnimatedTitle title={'Pics That I Took'} />
		</div>
		<div in:fade={{ duration: 1200 }} class="articles-section">
			{#each pics as pic (pic.id)}
				<article>
					<label for={'my-modal-img' + pic.id} class="modal-img">
						<ion-icon name="scan-outline" />
					</label>

					<input type="checkbox" id={'my-modal-img' + pic.id} class="modal-toggle" />
					<label for={'my-modal-img' + pic.id} class="modal my-modal-img cursor-pointer">
						<label class="modal-box modal-box-img relative" for="">
							<img class="img-full" src={pic.img} alt="" />
							<h1 class="font-bold text-2xl">{pic.title}</h1>
							<p>{pic.description}</p>
						</label>
					</label>
					<img src={pic.img} alt="pic" class="rounded-box" />
				</article>
			{/each}
		</div>
	</section>
</div>

<style lang="scss">
	section {
		display: grid;
		gap: 3rem;
		background-color: var(--pics-bg-color);
	}
	.articles-section {
		display: grid;
		gap: 2rem;
		justify-items: center;
		justify-content: center;
		grid-template-columns: repeat(auto-fit, minmax(300px, 500px));

		article {
			position: relative;
			display: grid;
			place-self: center;
			img {
				-webkit-box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
				-moz-box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
				box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
			}
		}
	}
	article {
	}

	.modal-box-img {
		display: grid;
		align-content: start;
		gap: 0.5rem;
		min-height: fit-content;
		min-width: 70dvw;

		img {
			width: 100%;
			height: 100%;
		}
	}

	ion-icon {
		padding: 1rem;
		font-size: 30px;
	}
	ion-icon:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	.modal-img {
		position: absolute;
		top: 0;
		right: 0;
		color: greenyellow;
	}
	@media (max-width: 768px) {
		.modal-box-img {
			min-width: 100vw;
		}
	}
</style>
