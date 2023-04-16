<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';

	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';
	import { page } from '$app/stores';
	import { load } from '$lib/stores.js';
	import { animate, stagger } from 'motion';
	import { storeWidth } from '$lib/stores.js';
	import Masonry from '../../components/masonry/masonry.svelte';

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
		<Masonry stretchFirst={true} gridGap={'0.75rem'} colWidth={'minmax(300px, 450px)'} items={pics}>
			{#each pics as pic (pic.id)}
				<article>
					<label for={'my-modal-img' + pic.id} class="modal-img-icon">
						<ion-icon name="scan-outline" />
					</label>

					<input type="checkbox" id={'my-modal-img' + pic.id} class="modal-toggle" />
					<label for={'my-modal-img' + pic.id} class="modal my-modal-img cursor-pointer">
						<label class={'modal-box modal-box-img relative ' + pic.position} for="">
							<img class={'img-full img-' + pic.id} src={pic.img} alt="" />
							<h1 class="font-bold text-2xl">{pic.title}</h1>
							<p>{pic.description}</p>
						</label>
					</label>
					<img src={pic.img} alt="pic" class="rounded-box grid-img" />
				</article>
			{/each}
		</Masonry>
	</section>
</div>

<style lang="scss">
	section {
		display: grid;
		align-content: start;
		gap: 3rem;
		background-color: var(--pics-bg-color);
	}
	article {
		position: relative;
		display: grid;
		width: fit-content;
	}
	.modal-box-img {
		display: grid;
		align-content: start;
		gap: 0.5rem;
		min-height: fit-content;
		min-width: 80dvw;
	}
	img {
		width: 100%;
		height: 100%;
		-webkit-box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
		-moz-box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
		box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
	}
	ion-icon {
		padding: 1rem;
		font-size: 30px;
	}
	ion-icon:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	.modal-img-icon {
		position: absolute;
		top: 0;
		right: 0;
		color: greenyellow;
	}
	@media (max-width: 768px) {
		.modal-box-img {
			min-width: 100vw;
			min-height: 40vh;
			padding: 0.2rem;
			img {
				min-width: 100%;
				height: 100%;
			}
		}
		.horizontal {
			min-width: 100dvw;
		}
		.vertical {
			min-height: 70dvh;
		}
	}
</style>
