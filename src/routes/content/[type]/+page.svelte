<script>
	import EmptyState from '$lib/EmptyState.svelte'
	import { PUBLIC_HOST_URL } from '$env/static/public'
	import { page } from '$app/stores'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SvelteMarkdown from 'svelte-markdown'

	export let data

	let type = $page.params.type
</script>

<svelte:head>
	<title>{data?.content ? data.content.headline : 'Contribute'}</title>
	<meta name="description" content={data?.content ? data.content.summary : 'Contribute to the knowledge of South African cinema'} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@OnScreenList" />
	<meta property="og:title" content={data?.content ? data.content.headline : 'Contribute'} />
	<meta property="og:description" content={data?.content ? data.content.summary : 'Contribute to the knowledge of South African cinema'} />
	<meta property="og:image" content="/photos/display-art.webp" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/${type}`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<section class="content-page">
	{#if type === 'contributions'}
		<ul class="links">
			<li>
				<a href='/films/new' title="Add film">
					<figure>
						<img 
							src='/photos/figure-one.svg'
							alt='Abstract red square with a short white stripe'
							width="400px"
							height="400px"
						/>
						<p>Add <br/> Film</p>
					</figure>
				</a>
			</li>
			<li>
				<a href='/people/new' title="Add person">
					<figure>
						<img 
							src='/photos/figure-one.svg'
							alt='Abstract red square with a short white stripe'
							width="400px"
							height="400px"
						/>
						<p>Add <br/> Person</p>
					</figure>
				</a>
			</li>
			<li>
				<a href='/companies/new' title="Add company">
					<figure>
						<img 
							src='/photos/figure-one.svg'
							alt='Abstract red square with a short white stripe'
							width="400px"
							height="400px"
						/>
						<p>Add <br/> Company</p>
					</figure>
				</a>
			</li>
		</ul>
	{/if}
	{#if data.content}
		<div class="content-page">
			<article class="content-wrap">
				<h1>{data.content.headline}</h1>
				<SignedIn>
					{#if data.user?.role === 'admin'}
						<a href={`/dashboard/content/${type}/edit`} class="button-good">{data.content ? 'Edit Content' : 'Add Content'}</a>
					{/if}
				</SignedIn>
				<div class="content-body"><SvelteMarkdown source={data.content.body} /></div>
			</article>
		</div>
	{:else}
		<EmptyState text="Resource is empty..." height="40vh" />
	{/if}
</section>

<style>
	.links {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-flow: row;
		grid-gap: 0.5rem;
		width: 100%;
		max-width: 900px;
		list-style: none;
		padding: 0;
	}

	.links > li {
		width: 100%;
	}

	.links > li > a > figure {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0;
	}

	.links > li > a > figure > img {
		width: 100%;
		height: 100%;
	}

	.links > li > a > figure > p {
		position: absolute;
		color: var(--base-color);
		bottom: 0;
		right: 0;
		z-index: 5;
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
		font-size: 2rem;
		font-weight: 600;
		margin: 0;
		padding: 1rem;
	}


	@media(min-width: 600px){
		.links {
			grid-template-columns: repeat(3, 1fr);
			grid-auto-flow: unset;
		}
	}

	@media(min-width: 1000px){}

	@media(min-width: 1200px){}
</style>