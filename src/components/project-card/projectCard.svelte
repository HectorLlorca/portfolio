<script lang="ts">
	import { theme } from '$lib/stores.js';
	let { project } = $$props;
	$: bg = $theme == 'corporate' ? 'bg-primary-content' : 'glass';
</script>

<div class={'card shadow-2xl ' + bg}>
	<figure>
		<img src={project.img} alt={project.name} />
	</figure>
	<div class="card-body">
		<h2 class="card-title font-bold text-lg">{project.name}</h2>
		<p>{project.tools}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary">Live</button>
		</div>
	</div>
</div>

<style lang="scss">
	.card-body {
		display: grid;
		align-items: start;
		padding: 0.3rem 4rem;
		@media (max-width: 768px) {
			padding: 0.3rem 1rem;
		}
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		aspect-ratio: 16/9;
	}
</style>
