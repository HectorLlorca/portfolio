<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	import { PUBLIC_MAPS_KEY } from '$env/static/public';

	let map;
	let currentIcon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
	export let locations: Object = [];
	let mapElement: HTMLDivElement;
	let apiKey = PUBLIC_MAPS_KEY; // Reemplaza con tu propia API Key de Google Maps

	onMount(async () => {
		const loader = new Loader({
			apiKey: apiKey,
			version: 'weekly'
		});
		try {
			await loader.load();
			map = new google.maps.Map(mapElement, {
				center: { lat: 41.396, lng: 2.175 },
				zoom: 12
			});
			locations.forEach((location) => {
				const marker = new google.maps.Marker({
					position: { lat: location.coord[0], lng: location.coord[1] },
					map: map,
					icon: currentIcon
				});
			});
		} catch (error) {
			console.error('Error al cargar Google Maps:', error);
		}
	});
</script>

<div class="map-container" bind:this={mapElement} />

<style>
	.map-container {
		width: 100%;
		height: 400px;
	}
</style>
