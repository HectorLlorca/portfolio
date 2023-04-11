<script lang="ts">
	import { animate, stagger } from 'motion';
	import SplitType from 'split-type';

	let titleElement: HTMLElement;

	$: if (titleElement) {
		const split = new SplitType(titleElement, {
			types: 'chars lines words'
		});
		animate(
			split.chars,
			{ y: [20, 0], opacity: [0, 1] },
			{ duration: 0.8, delay: stagger(0.04, { start: 0.5 }) }
		);
	}
</script>

<h1 class="animated-title text-4xl" bind:this={titleElement}>{$$props.title}</h1>

<style>
	h1 {
		display: grid;
		place-self: start;
		font-weight: 700;
	}
</style>
