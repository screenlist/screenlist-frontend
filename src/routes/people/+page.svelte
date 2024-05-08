<script>
	import EntitiesCard from '$lib/EntitiesCard.svelte'
	import { page } from '$app/stores'

	export let data
	let limit = $page.url.searchParams.get('limit')
	let batch = $page.url.searchParams.get('page')
</script>

<EntitiesCard data={data.data} itemsPathPrefix="people" heading="People" />

<section class="paging" data-sveltekit-reload>
	{#if data.hasPrevPage}
		<a class="button-regular" href={`/people?page=${(batch ? +batch : 1)-1}&limit=${limit ? limit : 50}`}>Previous</a>
	{/if}

	{#if data.hasNextPage}
		<a class="button-regular" href={`/people?page=${(batch ? +batch : 1)+1}&limit=${limit ? limit : 50}`}>Next</a>
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