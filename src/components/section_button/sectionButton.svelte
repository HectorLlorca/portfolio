<script lang="ts">
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores.js';

	import camara from '$lib/assets/camara.png';
	import music from '$lib/assets/music.png';
	import food from '$lib/assets/food.png';
	import cv from '$lib/assets/cv.png';
	import wcv from '$lib/assets/wcv.png';
	import { onMount } from 'svelte';
	import { animate, stagger } from 'motion';

	const handleRoute = async (url: string, e) => {
		let current = document.querySelector('.current');

		animate(current.children, { display: 'none' }, { duration: 0 });
		await animate(
			e.target,
			{ width: `calc(${current.offsetWidth}px - 4px)`, opacity: 1 },
			{ duration: 1, easing: 'ease' }
		).finished;
		goto(url);
	};
	let { section } = $$props;
	let bgColors = {
		'/': `var(--${$theme}-bg-color)`,
		'/Food': 'var(--food-bg-color)',
		'/Music': 'var(--music-bg-color)',
		'/Pics': 'var(--pics-bg-color)'
	};
	let img = {
		'/': $theme == 'corporate' ? cv : wcv,
		'/Food': food,
		'/Music': music,
		'/Pics': camara
	};
	$: h1Color = $theme == 'corporate' ? 'black' : '#d3d3d3';
	onMount(() => {});
</script>

<button
	on:click|once={(e) => handleRoute('/' + section.toLowerCase(), e)}
	class="btn sec-btn"
	style={`background-color:${bgColors['/' + section]}`}>
	<img src={img['/' + section]} alt="cv-icon" />
	<h1 style={`color:${!section ? h1Color : 'black'}`}>{section || 'Portfolio'}</h1>
</button>

<style>
	.sec-btn {
		position: sticky;
		top: 0;
		display: grid;
		width: 60px;
		min-height: 100vh;
		border: none;
		border-radius: 0;
		z-index: 99;
	}
	.sec-btn img {
		position: absolute;
		width: 30px;
		height: 30px;
		top: 100px;
		left: 0;
		right: 0;
		margin: 0 auto;
		aspect-ratio: 1/1;
	}
	.sec-btn h1 {
		transform: rotate(90deg);
	}
</style>
