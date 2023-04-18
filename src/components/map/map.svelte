<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	import { PUBLIC_MAPS_KEY } from '$env/static/public';
	import brunch from '$lib/assets/mapicons/brunch.png';
	import pizza from '$lib/assets/mapicons/pizza.png';
	import sushi from '$lib/assets/mapicons/sushi.png';
	import tapas from '$lib/assets/mapicons/tapas.png';
	import burguer from '$lib/assets/mapicons/burguer.png';

	export let locations: Object = [];
	let apiKey = PUBLIC_MAPS_KEY; // Reemplaza con tu propia API Key de Google Maps
	let map;
	let mapElement: HTMLDivElement;
	const icons = {
		tapas,
		brunch,
		pizza,
		sushi,
		burguer
	};

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
				const infoWindowContent = `
					<div>
						<h2>${location.name}</h2>
						
					</div>
					`;
				const icon = {
					url: icons[location.cocina], // url
					scaledSize: new google.maps.Size(35, 35), // scaled size
					origin: new google.maps.Point(0, 0), // origin
					anchor: new google.maps.Point(0, 0) // anchor
				};
				const marker = new google.maps.Marker({
					position: { lat: location.coord[0], lng: location.coord[1] },
					map: map,
					icon: icon
				});
				const infoWindow = new google.maps.InfoWindow({
					content: infoWindowContent
				});

				marker.addListener('click', () => {
					infoWindow.open(map, marker);
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
