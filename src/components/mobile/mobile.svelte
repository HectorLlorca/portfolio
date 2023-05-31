<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores.js';

	import camara from '$lib/assets/camara.png';
	import music from '$lib/assets/music.png';
	import food from '$lib/assets/food.png';
	import cv from '$lib/assets/cv.png';
	import wcv from '$lib/assets/wcv.png';

	let modOpen: boolean = false;
	let input: HTMLInputElement;
	let bg = `var(--${$theme}-bg-color)`;

	$: if ($theme) {
		setStroke();
		bg = `background-color: var(--${$theme}-bg-color)`;
	}
	const setStroke = () => {
		if ($theme === 'black') {
			document.querySelectorAll('.burger').forEach((path) => {
				path.style.stroke = 'white';
			});
		} else {
			document.querySelectorAll('.burger').forEach((path) => {
				path.style.stroke = 'black';
			});
		}
	};

	const handleRoute = async (url: string) => {
		await goto(url);
		//trigger animation
		input.checked = !input.checked;
		modOpen = !modOpen;
		document.body.style.overflowY = 'auto';
	};
	const handleMod = () => {
		modOpen = !modOpen;
		if (modOpen) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'auto';
		}
	};
	onMount(() => {
		setStroke();
	});
</script>

<nav>
	<div class="menu cross menu--2 z-90">
		<label>
			<input bind:this={input} on:click={handleMod} type="checkbox" />
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<path class="line--1 burger" d="M0 70l28-28c2-2 2-2 7-2h64" />
				<path class="line--2 burger" d="M0 50h99" />
				<path class="line--3 burger" d="M0 30l28 28c2 2 2 2 7 2h64" />
			</svg>
		</label>
	</div>
</nav>
<div class="mod z-99" class:close={!modOpen} style={bg}>
	<button on:click={() => handleRoute('/')}>
		<img src={$theme == 'lofi' ? cv : wcv} alt="cv-icon" />
	</button>
	<button on:click={() => handleRoute('/food')}>
		<img src={food} alt="food-icon" />
	</button>
	<button on:click={() => handleRoute('/music')}>
		<img src={music} alt="music-icon" />
	</button>
	<button on:click={() => handleRoute('/pics')}>
		<img src={camara} alt="camara-icon" />
	</button>
</div>

<style lang="scss">
	nav {
		position: absolute;
		display: flex;
		min-width: 100%;
		height: 50px;
		justify-content: flex-end;
		background-color: none;
	}

	.mod {
		display: grid;
		position: fixed;
		visibility: visible;
		opacity: 1;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		transition: visibility 0s, opacity 0.3s linear;
		z-index: 10;
	}
	.close {
		visibility: hidden;
		opacity: 0;
	}
	.mod button {
		display: grid;
		align-items: start;
		align-content: center;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
	}
	.mod img {
		height: 50px;
		margin: 0 auto;
		width: 50px;
		aspect-ratio: 1/1;
	}
	.mod button:nth-of-type(2) {
		background-color: var(--food-bg-color);
	}
	.mod button:nth-of-type(3) {
		background-color: var(--music-bg-color);
	}
	.mod button:nth-of-type(4) {
		background-color: var(--pics-bg-color);
	}

	// Burguer menu
	input {
		display: none;
	}

	svg {
		height: 70px;
		width: 70px;
	}

	path {
		color: black;
		fill: none;
		stroke: black;
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
		--length: 30;
		--offset: -38;
		stroke-dasharray: var(--length) var(--total-length);
		stroke-dashoffset: var(--offset);
		transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	.cross input:checked + svg {
		.line--1,
		.line--3 {
			--length: 22.627416998;
		}
		.line--2 {
			--length: 0;
		}
	}

	.back input:checked + svg {
		.line--1,
		.line--3 {
			--length: 8.602325267;
		}
	}
	.menu--2 {
		position: fixed;
		z-index: 20;

		.line--1,
		.line--3 {
			--total-length: 111.22813415527344;
			--offset: -50.22813415527344;
		}
		.line--2 {
			--total-length: 99;
		}
		input:checked + svg {
			path {
				transform: translateX(30px);
			}
			.line--1,
			.line--3 {
				--offset: -16.9705627485;
			}
			.line--2 {
				--offset: -20;
			}
		}
	}
</style>
