<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, timeline, stagger } from 'motion';
	import SplitType from 'split-type';

	import AnimatedTitle from '../animated_title/animatedTitle.svelte';
	import { theme } from '$lib/stores.js';
	import { load } from '$lib/stores.js';
	import { page } from '$app/stores';
	import { storeWidth } from '$lib/stores.js';

	let toogleTheme: HTMLInputElement;
	let url = $page.url.pathname;

	const handleTheme = () => {
		theme.set(!toogleTheme.checked ? 'lofi' : 'halloween');
		localStorage.setItem('theme', $theme);
	};

	onMount(() => {
		if (!$load && $storeWidth > 768) {
			animate(
				'.sec-btn',
				{ y: [-1000, 0] },
				{ duration: 1, delay: stagger(0.2, { from: 'last' }) }
			);
			load.set(true);
		}
		if ($theme === 'halloween') {
			toogleTheme.checked = true;
		} else {
			toogleTheme.checked = false;
		}

		const info = document.querySelector('.info');
		let infoChildren = info?.children;

		const split = new SplitType([...infoChildren], {
			types: 'lines'
		});
		const sequence = [
			[
				split?.lines,
				{ y: [30, 0], opacity: [0, 1] },
				{ duration: 1, delay: stagger(0.2), at: '+0.8' }
			],
			['path', { opacity: [0, 1] }, { duration: 1, at: '-1.8' }],
			[
				'.tools-icons img',
				{ y: [-500, 0], opacity: [0, 1] },
				{ duration: 1, delay: stagger(0.05, { easing: 'ease' }), at: '-0.5' }
			]
		];
		timeline(sequence);
	});
</script>

<section data-theme={$theme} class:current={url === '/'}>
	<div class="hero">
		<AnimatedTitle title={'This Is Me'} />
	</div>
	<div class="toogle">
		<label class="swap swap-rotate">
			<!-- this hidden checkbox controls the state -->
			<input bind:this={toogleTheme} on:click={handleTheme} type="checkbox" />

			<!-- sun icon -->
			<svg
				class="swap-on fill-current w-10 h-10"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				><path
					d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

			<!-- moon icon -->
			<svg
				class="swap-off fill-current w-10 h-10"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				><path
					d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
		</label>
	</div>

	<div class="info">
		<div class="me">
			<p>Im Héctor, a junior front-end developer, this is my portfolio and "blog".</p>
		</div>

		<div class="studies">
			<h4>Studies</h4>
			<div>
				<p>- DAW, Insitut tecnològic Barcelona, 2019-2021.</p>
				<p />
				<p>
					- Fullstack bootcamp, <a
						class="underline hover:font-bold"
						href="https://fullstackopen.com/en/">
						https://fullstackopen.com/en/ .
					</a>
				</p>
				<p />
				<p>- Learning Svelte, this site's built with Svelte.</p>
				<p />
				<p>- Learning animations, Gsap, Motion.</p>
				<p />
				<p>- I would like start with Threejs, Blender.</p>
			</div>
		</div>

		<div class="experience">
			<h4>Experience</h4>
			<div>
				<p>- Front-end developer (Internship), Grupo Hostienda, 2021-2021</p>
				<p />
				<p>- (Current) Waiter, Maitea, 2019-Current</p>
				<p />
				<p>- More waiter jobs</p>
			</div>
		</div>

		<div class="tools">
			<h4>Tools</h4>
			<div class="tools-icons">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"
					alt="svelte" />
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
					alt="react" />
				<img src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" alt="javascript" />
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png"
					alt="css3" />
				<img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" alt="figma" />
				<img
					src="https://cdn.iconscout.com/icon/free/png-256/mongodb-5-1175140.png"
					alt="mongodb" />
			</div>
		</div>
	</div>

	<div class="proyectos">
		<h4>Projects</h4>
		<!-- //https://hectorllorca.github.io/aerolab-challenge-vite/ -->
		<!-- //https://layuvi.vercel.app/ -->
		<!-- //https://level-one-abelton-about-copy.vercel.app/ -->
		<!-- //https://hectorllorca.github.io/carta-interactiva/  -->
	</div>
</section>

<style>
	section {
		display: grid;
		gap: 3rem;
	}
	h4 {
		font-weight: 600;
	}
	.info {
		display: grid;
		gap: 2rem;
		justify-content: center;
	}
	.info div {
		display: grid;
		gap: 0.5rem;
	}
	.toogle {
		display: flex;
		justify-self: center;
		width: fit-content;
	}

	.tools-icons {
		display: flex !important;
		flex-wrap: wrap;
	}
	.tools img {
		display: flex;
		width: 60px;
		object-fit: contain;
		border: 1px solid #ccc;
		padding: 0.5rem;
		aspect-ratio: 3/3;
	}
	.tools img:hover {
		transform: scale(1.1);
	}
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}
	}
</style>
