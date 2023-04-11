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
					<label for={`my-modal-info` + pic.id} class="modal-info">
						<ion-icon name="information-circle-outline" />
					</label>
					<input type="checkbox" id={'my-modal-info' + pic.id} class="modal-toggle" />
					<div class="modal">
						<div class="modal-box relative">
							<label
								for={'my-modal-info' + pic.id}
								class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
							<h3 class="text-lg font-bold">{pic.title}</h3>
							<p class="py-4">
								{pic.description}
							</p>
						</div>
					</div>

					<label for={'my-modal-img' + pic.id} class="modal-img">
						<ion-icon name="scan-outline" />
					</label>

					<input type="checkbox" id={'my-modal-img' + pic.id} class="modal-toggle" />
					<label for={'my-modal-img' + pic.id} class="modal my-modal-img cursor-pointer">
						<label class="modal-box modal-box-img relative" for="">
							<img class="img-full" src={pic.img} alt="" />
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
		grid-template-rows: minmax(400px, 1fr);
		article {
			position: relative;
			img {
				-webkit-box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
				-moz-box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
				box-shadow: 0px 0px 36px -2px rgba(0, 0, 0, 0.87);
			}
		}
	}
	.img-full {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}

	ion-icon {
		padding: 1rem;
		font-size: 30px;
	}
	ion-icon:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	.modal-info {
		position: absolute;
		top: 0;
		color: greenyellow;
	}
	.modal-img {
		position: absolute;
		top: 0;
		right: 0;
		color: greenyellow;
	}
</style>
