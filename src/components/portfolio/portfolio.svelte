<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, timeline, stagger } from 'motion';
	import SplitType from 'split-type';

	import AnimatedTitle from '../animated_title/animatedTitle.svelte';
	import { theme } from '$lib/stores.js';
	import { load } from '$lib/stores.js';
	import { page } from '$app/stores';
	import { storeWidth } from '$lib/stores.js';
	import { projects } from '$lib/projects-data.js';

	import wgithub from '$lib/assets/wgithub.png';
	import github from '$lib/assets/github.png';
	import gmail from '$lib/assets/gmail.png';
	import linkedin from '$lib/assets/linkedin.png';

	let toogleTheme: HTMLInputElement;
	let url = $page.url.pathname;

	const handleTheme = () => {
		theme.set(!toogleTheme.checked ? 'lofi' : 'black');
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
		if ($theme === 'black') {
			toogleTheme.checked = true;
		} else {
			toogleTheme.checked = false;
		}

		const me = document.querySelector('.me >div');
		const h4 = document.querySelectorAll('h4');
		const border = document.querySelectorAll('.info > div ');
		const studies = document.querySelector('.studies>div');
		const experience = document.querySelector('.experience>div');
		let infoChildren = [h4, me, studies, experience];

		const split = new SplitType(infoChildren, {
			types: 'lines'
		});
		const sequence = [
			[split.lines, { y: [30, 0], opacity: [0, 1] }, { delay: stagger(0.1), at: '<' }],
			['path', { opacity: [0, 1] }, { duration: 1 }]
		];
		timeline(sequence);
	});
</script>

<section data-theme={$theme} class:current={url === '/'} class={$theme}>
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

	<h1 class="font-semibold text-2xl flex justify-center">(Work in progress)</h1>

	<div class="info">
		<div class="me">
			<h4>About me</h4>
			<div>
				<p>
					Hello, Im <strong class="font-black">Hector</strong>, a junior front-end developer, this
					is my portfolio and "blog".
				</p>
			</div>
		</div>

		<div class="studies">
			<h4>Studies</h4>
			<div>
				<p>- DAW, Insitut tecnològic Barcelona, 2019-2021.</p>
				<p>
					- Fullstack bootcamp, <a
						class="underline hover:font-bold"
						href="https://fullstackopen.com/en/">
						https://fullstackopen.com/en/ .
					</a>
				</p>
				<p>- Learning Svelte, this site's built with Svelte.</p>
				<p>- Learning animations: Gsap, Motion.</p>
				<p>- I would like start with Threejs, Blender.</p>
			</div>
		</div>

		<div class="experience">
			<h4>Experience</h4>
			<div>
				<p>- Front-end developer (Internship), Grupo Hostienda, 2021-2021</p>
				<p>- (Current) Waiter, Maitea, 2019-Current</p>
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

		<div class="projects">
			<h4>Projects</h4>
			<div class="projects-grid">
				{#each projects as project}
					<article>
						<img src={project.img} alt="" />
						<div class="project-info">
							<div>
								<h1>{project.name}</h1>
								<p>{project.tools}</p>
							</div>
							<a target="_blank" href={project.link}><button class="btn rounded">live</button></a>
						</div>
					</article>
				{/each}
			</div>
		</div>
		<div>
			<footer class="footer items-center p-4">
				<div class="items-center grid-flow-col">
					<p>
						Contact me: <strong class="font-bold">hectorllorca7@gmail.com</strong>
					</p>
				</div>
				<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
					<a href="https://github.com/HectorLlorca">
						<img src={`${$theme == 'black' ? wgithub : github}`} alt="github" />
					</a>
					<a href="https://www.linkedin.com/in/hector-llorca/">
						<img src={linkedin} alt="linkedin" /></a>
					<a href="mailto: hectorllorca7@gmail.com"> <img src={gmail} alt="gmail" /></a>
				</div>
			</footer>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		display: grid;
		gap: 3rem;
		p {
		}
	}
	h4 {
		font-weight: 700;
	}
	.info {
		display: grid;
		gap: 5rem;
		h4 {
			font-size: 1.8rem;
		}
	}
	.info > div {
		display: grid;
		gap: 2rem;
		padding: 0.5rem 0;

		border-top: 1px solid hsl(var(--pf));
	}
	.me > div,
	.studies > div,
	.experience > div {
		display: grid;
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

	.projects-grid {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
		gap: 1rem;

		article {
			display: grid;
			gap: 0.2rem;
			.project-info {
				display: flex;
				justify-content: space-between;
				padding: 0 0.3rem;
				.btn {
					text-transform: capitalize;
					&:hover {
						transform: scale(1.1);
					}
				}
			}
			h1 {
				font-weight: 700;
				font-size: 1.1rem;
			}
			p {
				font-weight: 500;
			}
		}
	}
	footer {
		img {
			width: 30px;
			vertical-align: top;
			object-fit: contain;
			aspect-ratio: 3/3;
		}
	}
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}
	}
</style>
