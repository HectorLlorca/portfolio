import yuvi from '$lib/assets/yuvi.png';
import aerolab from '$lib/assets/aerolab.png';
import ableton from '$lib/assets/ableton.png';
import csspatternmaker from '$lib/assets/csspatternmaker.png';
import ranksball from '$lib/assets/ranksball.png';

export const projects = [
	{
		name: 'Css pattern maker',
		tools: 'Sveltekit, Tailwindcss',
		img: csspatternmaker,
		link: 'https://css-patterns-maker.vercel.app/'
	},
	{
		name: 'RanksBall',
		tools: 'Sveltekit, Tailwindcss, supabase, realtime',
		img: ranksball,
		link: 'https://ranksball.vercel.app/app/home'
	},

	{
		name: 'Aerolab Challenge',
		tools: 'React',
		img: aerolab,
		link: 'https://hectorllorca.github.io/aerolab-challenge-vite/'
	},
	{
		name: 'Ableton copy',
		tools: 'Svelte',
		img: ableton,
		link: 'https://level-one-abelton-about-copy.vercel.app/'
	},
	{
		name: 'La Yuvi',
		tools: 'Sveltekit',
		img: yuvi,
		link: 'https://layuvi.vercel.app/'
	}
];
