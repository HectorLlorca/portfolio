<script>
	import Portfolio from '../components/portfolio/portfolio.svelte';
	import SectionButton from '../components/section_button/sectionButton.svelte';

	import { storeWidth } from '$lib/stores.js';
</script>

<div class="container">
	<Portfolio />
	{#if $storeWidth > 768}
		<SectionButton section="Food" />
		<SectionButton section="Music" />
		<SectionButton section="Pics" />
	{/if}
</div>

<style lang="scss">
</style>
