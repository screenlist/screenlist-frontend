<script>
	import { PUBLIC_SERVER } from '$env/static/public'
	import LoadingState from './LoadingState.svelte'
	import EmptyState from './EmptyState.svelte'

	export let path = ''

	let loading = false
	let hasError = null
	let data = []
	let open = false

	$: open, getHistory(path)

	async function getHistory(path){
		if(open){
			data = []
			hasError = null
			loading = true
			try {
				const res = await fetch(`${PUBLIC_SERVER}${path}`)
				const results = await res.json()

				if(!res.ok){ throw new Error(results.message) }
				loading = false
				data = results
			} catch (err) {
				hasError = err.message
				loading = false
			}
		}		
	}
</script>

<div class="block">
	<button class="button" on:click={() => open = !open} >{open === true ? 'Hide History' : 'Show History'}</button>
	{#if open === true}
		<section class="container">
			{#if loading}
				<LoadingState />
			{/if}
			{#if hasError}
				<EmptyState text="Could not load" height="10rem" fill="var(--base-color-alt)" /> 
			{/if}
			{#if data.length === 0 && !hasError && !loading}
				<EmptyState text="Nothing to see here, yet!" height="10rem" fill="var(--base-color-alt)" />
			{/if}
			{#if data.length > 0 && !hasError && !loading}
				{#each data as item, index (index)}
					<article class={`history ${item.message === 'create' ? 'create' : item.message === 'update' ? 'update' : 'delete'}`} >
						<ul>
							<li><a href={`/users/${item.username}`} class="internalLink">{item.username}</a></li>
							<li>{item.message}d</li>
							<li>{item.property}{item.message === 'create' || item.message === 'delete' ? ':' : ''}</li>
							
							{#if item.message === 'update'}
								<li>From: 
									{#if item.property.toLowerCase().slice(-3) === 'url'}
										<a href={item.before} target="_blank" rel="noreferrer" class="externalLink">{item.before}</a>
									{:else}
										{item.before}
									{/if}
								</li>
								<li>To: 
									{#if item.property.toLowerCase().slice(-3) === 'url'}
										<a href={item.after} target="_blank" rel="noreferrer" class="externalLink">{item.after}</a>
									{:else}
										{item.after}
									{/if}
								</li>
							{/if}

							{#if item.message === 'create'}
								<li>
									{#if item.property.toLowerCase().slice(-3) === 'url'}
										<a href={item.after} target="_blank" rel="noreferrer" class="externalLink">{item.after}</a>+','
									{:else}
										{item.after+','}
									{/if}
								</li>
							{/if}

							{#if item.message === 'delete'}
								<li>
									{#if item.property.toLowerCase().slice(-3) === 'url'}
										<a href={item.before} target="_blank" rel="noreferrer" class="externalLink">{item.before}</a>+','
									{:else}
										{item.before+','}
									{/if}
								</li>
							{/if}

							<li>on {new Date(item.time).toLocaleString('en-za')}</li>
						</ul>
					</article>
					{/each}
			{/if}
		</section>
	{/if}
</div>

<style>
	.block {
		width: 100%;
		padding: 0.5rem 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.button {
		background: transparent;
		color: var(--brand-color);
		height: 6rem;
		width: 6rem;
		text-align: center;
		font-size: 1.125rem;
		font-weight: bold;
		padding: 0.5rem;
		border-radius: 6rem;
		border: 0.2rem solid var(--brand-color);
	}

	.button:focus {
		background: var(--good-color);
		color: var(--base-color);
	}

	.button:hover {
		background: var(--good-color);
		color: var(--base-color);
	}

	.container {
		margin: 0.5rem 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		min-width: 100%;
	}

	.create {
		background: var(--brand-color);
		color: var(--base-color);
	}

	.update {
		background: var(--good-color);
		color: var(--base-color);
	}

	.delete {
		background: var(--danger-color);
		color: var(--base-color);
	}

	.history {
		padding: 0.5rem;
		margin: 0.25rem 0;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
	}

	.history > ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.history > ul > li {
		flex: 0 1 fit-content;
		margin: 0.15rem 0.5rem 0.15rem 0;
	}

	.internalLink {
		font-weight: 600;
	}

	.externalLink {
		text-decoration: underline;
	}
</style>