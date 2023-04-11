<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';

	import AnimatedTitle from '../../components/animated_title/animatedTitle.svelte';
	import SectionButton from '../../components/section_button/sectionButton.svelte';
	import { page } from '$app/stores';
	import { load } from '$lib/stores.js';
	import { animate, stagger } from 'motion';
	import { storeWidth } from '$lib/stores.js';

	let url = $page.url.pathname;
	export let data: PageServerData;

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
		<AnimatedTitle title={'Pics That I Took'} />
	</section>
</div>

<style>
	section {
		background-color: var(--pics-bg-color);
	}
</style>
