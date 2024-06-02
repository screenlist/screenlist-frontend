<script>
  import { writable } from 'svelte/store'
	import { page } from '$app/stores'
	import Typesense from 'typesense'
	import { PUBLIC_TYPESENSE_HOST, PUBLIC_TYPESENSE_PORT, PUBLIC_TYPESENSE_PROTOCOL, PUBLIC_TYPESENSE_KEY } from '$env/static/public'
	import EmptyState from '$lib/EmptyState.svelte'
	import LoadingState from '$lib/LoadingState.svelte'
	import ErrorState from '$lib/ErrorState.svelte'
	import { selected } from '$lib/index.js'

	export let collection = ''
	// export let selected = {
	// 	name: '', id: ''
	// }

	const client = new Typesense.Client({
		'nodes': [{
			'host': PUBLIC_TYPESENSE_HOST, // For Typesense Cloud use xxx.a1.typesense.net
			'port': PUBLIC_TYPESENSE_PORT,      // For Typesense Cloud use 443
			'protocol': PUBLIC_TYPESENSE_PROTOCOL   // For Typesense Cloud use https
		}],
		'apiKey': PUBLIC_TYPESENSE_KEY,
		'connectionTimeoutSeconds': 2
	})

	const results = writable([])

	const query = writable('')
	let loading = false
	let error = ''

	$: $query, search($query)

	async function search(text){
		loading = true
		error = ''
		try {
			const response = await client.collections(collection).documents().search({ 
				'q': text, 
				'query_by': 'name',
				'limit': 15
			})

			loading = false
			results.set(response.hits)
		} catch (err){ 
			error = err.message
			loading = false
		}
	}
</script>

<div class="page">

	{#if error && !loading}
		<ErrorState message={error} />
	{/if}

	<form on:submit|preventDefault class="form2">
		<label class="formInputLabel">
			<!-- <span>Search</span> -->
			<!-- svelte-ignore a11y-autofocus -->
			<input autofocus="true" name="q" type="search" bind:value={$query} placeholder={"Type to search for "+collection} />
		</label>
	</form>

	{#if loading}
		<div style="width: 100%; height: 15rem; display: flex; justify-content: center; align-items: center; margin: 1rem 0" >
			<LoadingState />
		</div>		
	{/if}

	{#if $results.length === 0 && !loading }
		<EmptyState text="We tried but found nothing, sorry I guess?" height="20rem" />
	{/if}

	<div class={$results.length === 0 || loading ? 'hide' : 'results'} >
		{#if $results.length > 0 }
			<section class="searchRoles">
				<ul>
					{#each $results as val (val.document.id) }
						<li>
							<button on:click={() => { selected.set({
								name: val.document.name,
								id: val.document.id
							}) }} >
								<figure>
									<img 
										src={val.document.photoUrl ? val.document.photoUrl : '/photos/picture.png'} 
										alt={val.document.photoUrl ? `${val.document.name}`: 'Placeholder'}
										width="200px"
										height="200px"
										loading="lazy"
									/>
								</figure>
								<div>
									{#if collection === 'people'}
										<h3>{val.document.name}</h3>
										<span>{val.document.occupation}</span>
									{:else if collection === 'companies'}
										<h3>{val.document.name}</h3>
										{#if val.document.city && val.document.country}
											<span>Based in {`${val.document.city}, ${val.document.country}`}</span>
										{:else if val.document.city && !val.document.country}
											<span>Based in {val.document.city}</span>
										{:else if !val.document.city && val.document.country}
											<span>Based in {val.document.country}</span>
										{/if}
									{/if}
									
								</div>
							</button>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>

	{#if $results.length < 15 && !loading}
		<div class="newEntity">
			<a href={`/${collection}/new?redirect_url=${encodeURIComponent($page.url.pathname)}${collection === 'people' ? `&redirect_category=${$page.url.searchParams.get('category')}` : ''}`} class="button-regular">
				Add a new {`${collection === 'people' ? 'person' : collection === 'companies' ? 'company' : ''}`}
			</a>
		</div>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding: 0.5rem;
	}

	.form2 {
		width: 100%;
	}

	.formInputLabel {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	/* .formInputLabel > span {
		display: inline-flex;
		font-weight: normal;
		font-size: 2rem;
		margin: 0.5rem 0;
		color: var(--brand-color);
	} */

	.formInputLabel > input {
		width: 100%;
		max-width: 600px;
		padding: 0.8rem;
		font-size: 1.3rem;
		background: var(--base-color);
		color: var(--brand-color);
		border-bottom: 0.1rem solid var(--brand-color);
	}

	.formInputLabel > input:focus {
		border-bottom: 0.2rem solid var(--brand-color);
	}

	.results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
	}

	/* For roles search pop up */

	.searchRoles {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	/* .searchRoles > h2 {
		color: var(--brand-color);
		width: 100%;
	} */

	.searchRoles > ul {
		list-style: none;
		padding: 0;
		width: 100%;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.searchRoles > ul > li {
		margin: 0.5rem 0;
	}

	.searchRoles > ul > li > button {
		width: 100%;
		display:  flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		border-right: 0.2rem solid var(--brand-color);
		border-top: none;
		border-left: none;
		border-bottom: none;
		background: var(--base-color);
		padding: 0.5rem;
	}

	.searchRoles > ul > li > button:focus {
		background: var(--base-color-alt);
	}

	.searchRoles > ul > li > button:hover {
		background: var(--base-color-alt);
	}

	.searchRoles > ul > li > button > figure {
		margin: 0;
		width: 10%;
	}

	.searchRoles > ul > li > button > figure > img {
		height: 100%;
		width: 100%;
	}

	.searchRoles > ul > li > button > div {
		width: 88%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
	}

	.searchRoles > ul > li > button > div > h3 {
		text-wrap: wrap;
		font-size: 1rem;
		font-weight: 400;
		margin: 0;
		color: var(--brand-color);
	}

	.searchRoles > ul > li > button > div > span {
		margin-top: 0.8rem;
		font-size: 0.8rem;
		color: var(--accent-color-alt);
	}

	.newEntity {
		padding: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>