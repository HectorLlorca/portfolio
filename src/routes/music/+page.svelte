<script lang="ts">
	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';
	import { page } from '$app/stores';
	let url = $page.url.pathname;
	import { load } from '$lib/stores.js';
	import { animate, stagger } from 'motion';
	import { onMount } from 'svelte';
	import { storeWidth } from '$lib/stores.js';

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
		<AnimatedTitle title={'Music Moods'} />
	</section>
	{#if $storeWidth > 768}
		<SectionButton section="Pics" />
	{/if}
</div>

<style>
	section {
		background-color: var(--music-bg-color);
	}
</style>
