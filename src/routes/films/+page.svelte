<script>
	import { PUBLIC_HOST_URL } from '$env/static/public'
	import FilmsCard from '$lib/FilmsCard.svelte'
	import { page } from '$app/stores'

	export let data
	const films = data.data
	let limit = $page.url.searchParams.get('limit')
	let batch = $page.url.searchParams.get('page')
</script>

<svelte:head>
	<title>Films - Screen List</title>
	<meta name="description" content="A list of South African films - dramas, thrillers, sci-fi, documetaries, short films, features films and more" />
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@OnScreenList">
	<meta property="og:title" content="Films - Screen List" />
	<meta property="og:description" content="A list of South African films - dramas, thrillers, sci-fi, documetaries, short films, features films and more" />
	<meta property="og:image" content="/photos/display-art.webp" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/films`} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<FilmsCard {films} heading="Films" />

<section class="paging" data-sveltekit-reload>
	{#if data.hasPrevPage}
		<a class="button-regular" href={`/films?page=${(batch ? +batch : 1)-1}&limit=${limit ? limit : 50}`}>Previous</a>
	{/if}

	{#if data.hasNextPage}
		<a class="button-regular" href={`/films?page=${(batch ? +batch : 1)+1}&limit=${limit ? limit : 50}`}>Next</a>
	{:else}
		<span class="button-regular">The end</span>
	{/if}
</section>

<style>
	.paging {
		width: 100%;
		margin: 0.5rem 0;
		background: var(--base-color);
		padding: 0.5rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.paging > a {
		margin: 0 1rem;
	}

	.paging > span {
		margin: 0 1rem;
	}
</style>