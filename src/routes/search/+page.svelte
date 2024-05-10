<script>
	import { replaceState, goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { writable } from 'svelte/store'
	import Typesense from 'typesense'
	import { PUBLIC_TYPESENSE_HOST, PUBLIC_TYPESENSE_PORT, PUBLIC_TYPESENSE_PROTOCOL, PUBLIC_TYPESENSE_KEY, PUBLIC_HOST_URL } from '$env/static/public'
	import EmptyState from '$lib/EmptyState.svelte'
	

	const client = new Typesense.Client({
		'nodes': [{
			'host': PUBLIC_TYPESENSE_HOST, // For Typesense Cloud use xxx.a1.typesense.net
			'port': PUBLIC_TYPESENSE_PORT,      // For Typesense Cloud use 443
			'protocol': PUBLIC_TYPESENSE_PROTOCOL   // For Typesense Cloud use https
		}],
		'apiKey': PUBLIC_TYPESENSE_KEY,
		'connectionTimeoutSeconds': 2
	})

	const results = writable({
		films: [],
		people: [],
		companies: []
	})

	const query = writable('')

	$: $query, search($query), updateUrl($query)

	function updateUrl(text){
		const url = text.length > 0 ? `${$page.url.pathname}?q=${encodeURIComponent(text)}` : $page.url.pathname
		goto(url, {replaceState: true, noScroll: true})
	}

	async function search(text){
		try {
			const films = await client.collections('films').documents().search({ 
				'q': text, 
				'query_by': 'name',
				'limit': 15
			})

			const companies = await client.collections('companies').documents().search({ 
				'q': text, 
				'query_by': 'name',
				'limit': 15
			})

			const people = await client.collections('people').documents().search({ 
				'q': text, 
				'query_by': 'name',
				'limit': 15
			})

			results.set({
				films: films.hits,
				companies: companies.hits,
				people: people.hits
			})
		} catch (err){ console.log(err)}
	}

	if($page.url.searchParams.get('q')){
		query.set(decodeURIComponent($page.url.searchParams.get('q')))
	}
</script>

<svelte:head>
	<title>Search - Screen List</title>
	<meta name="description" content="Search for films, people and companies on Screen List" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@OnScreenList" />
	<meta property="og:title" content="Search - Screen List" />
	<meta property="og:description" content="Search for films, people and companies on Screen List" />
	<meta property="og:image" content="/photos/display-art.webp" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/search`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<div class="page">
	<form on:submit|preventDefault class="form2">
		<label class="formInputLabel">
			<span>Search</span>
			<!-- svelte-ignore a11y-autofocus -->
			<input autofocus="true" name="q" type="search" bind:value={$query} placeholder="Type to search for films, people & companies" />
		</label>
	</form>

	{#if $results.films.length === 0 && $results.companies.length === 0 && $results.people.length === 0}
		<EmptyState text="We tried but found nothing, sorry I guess?" height="20rem" />
	{/if}

	<div data-sveltekit-reload class={$results.films.length === 0 && $results.people.length === 0 && $results.companies.length === 0 ? 'hide' : 'results'} >
		{#if $results.films.length > 0 }
			<section class="films">
				<h2 class="just-bold">Films</h2>
				<ul>
					{#each $results.films as val (val.document.id) }
						<li>
							<a href={`/films/${val.document.id}`}>
								<figure>
									<img 
										src={val.document.posterUrl ? val.document.posterUrl : '/photos/poster.png'} 
										alt={val.document.posterUrl ? `${val.document.name} poster`: 'Poster placeholder'}
										width="200px"
										height="300px"
										loading="lazy"
									/>
								</figure>
								<div>
									<h3>{val.document.name} {`(${val.document.year})`}</h3>
									{#if val.document.directors?.length > 0}
										<span>
											Directed by {val.document.directors.join(', ')}
										</span> 
									{/if}
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
		{#if $results.people.length > 0 }
			<section class="films">
				<h2 class="just-bold">People</h2>
				<ul>
					{#each $results.people as val (val.document.id) }
						<li>
							<a href={`/people/${val.document.id}`}>
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
									<h3>{val.document.name}</h3>
									<span>{val.document.occupation}</span>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
		{#if $results.companies.length > 0 }
			<section class="films">
				<h2 class="just-bold">Companies</h2>
				<ul>
					{#each $results.companies as val (val.document.id) }
						<li>
							<a href={`/companies/${val.document.id}`}>
								<figure>
									<img 
										src={val.document.photoUrl ? val.document.photoUrl : '/photos/picture.png'} 
										alt={val.document.photoUrl ? `${val.document.name} logo`: 'Placeholder'}
										width="200px"
										height="200px"
										loading="lazy"
									/>
								</figure>
								<div>
									<h3>{val.document.name}</h3>
									{#if val.document.city && val.document.country}
										<span>Based in {`${val.document.city}, ${val.document.country}`}</span>
									{:else if val.document.city && !val.document.country}
										<span>Based in {val.document.city}</span>
									{:else if !val.document.city && val.document.country}
										<span>Based in {val.document.country}</span>
									{/if}
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>
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

	.formInputLabel > span {
		display: inline-flex;
		font-weight: normal;
		font-size: 2rem;
		margin: 0.5rem 0;
		color: var(--brand-color);
	}

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

	/* For the main search page */

	.films {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.films > h2 {
		color: var(--brand-color);
		width: 100%;
	}

	.films > ul {
		list-style: none;
		padding: 0;
		width: 100%;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.films > ul > li {
		margin: 0.5rem 0;
	}

	.films > ul > li > a {
		width: 100%;
		display:  flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		border-right: 0.2rem solid var(--brand-color);
		background: var(--base-color);
		padding: 0.5rem;
	}

	.films > ul > li > a:focus {
		background: var(--base-color-alt);
	}

	.films > ul > li > a:hover {
		background: var(--base-color-alt);
	}

	.films > ul > li > a > figure {
		margin: 0;
		width: 10%;
	}

	.films > ul > li > a > figure > img {
		height: 100%;
		width: 100%;
	}

	.films > ul > li > a > div {
		width: 88%;
	}

	.films > ul > li > a > div > h3 {
		text-wrap: wrap;
		font-size: 1rem;
		font-weight: 400;
		margin: 0;
		color: var(--brand-color);
	}

	.films > ul > li > a > div > span {
		margin-top: 0.8rem;
		font-size: 0.8rem;
		color: var(--accent-color-alt);
	}

	/* For roles search pop up */

	/* .searchRoles {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.searchRoles > h2 {
		color: var(--brand-color);
		width: 100%;
	}

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

	.searchRoles > ul > li > span {
		width: 100%;
		display:  flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		border-right: 0.2rem solid var(--brand-color);
		background: var(--base-color);
		padding: 0.5rem;
	}

	.searchRoles > ul > li > span:focus {
		background: var(--base-color-alt);
	}

	.searchRoles > ul > li > span:hover {
		background: var(--base-color-alt);
	}

	.searchRoles > ul > li > span > figure {
		margin: 0;
		width: 10%;
	}

	.searchRoles > ul > li > span > div {
		width: 88%;
	}

	.searchRoles > ul > li > span > div > h3 {
		text-wrap: wrap;
		font-size: 1rem;
		font-weight: 400;
		margin: 0;
		color: var(--brand-color);
	}

	.searchRoles > ul > li > span > div > span {
		margin-top: 0.8rem;
		font-size: 0.8rem;
		color: var(--accent-color-alt);
	} */
</style>