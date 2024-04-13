<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
  import LoadingState from '$lib/LoadingState.svelte';
	import EmptyState from '$lib/EmptyState.svelte';
	import HistoryView from '$lib/HistoryView.svelte';
	export let data
	export let form
	let loading = false
</script>

<section class="form-page--vertical">
	<div class="container">
		<div class="title-band">
			<a href="/dashboard" class="button-icon">
				<img src="/back-icon.svg" alt="Back icon" height="35px" width="35px" />
			</a>
			<h2>Moderation</h2>
		</div>
		<nav class="nav">
			<a class={$page.params.topic === 'films' ? 'buttonOn' : 'buttonOff'} href="/dashboard/moderation/films">Films <span>{data.length}</span></a>
			<a class={$page.params.topic === 'companies' ? 'buttonOn' : 'buttonOff'} href="/dashboard/moderation/companies">Companies <span>{data.length}</span></a>
			<a class={$page.params.topic === 'people' ? 'buttonOn' : 'buttonOff'} href="/dashboard/moderation/people">People <span>{data.length}</span></a>
			<a class={$page.params.topic === 'reviews' ? 'buttonOn' : 'buttonOff'} href="/dashboard/moderation/reviews">Reviews <span>{data.length}</span></a>
			<a class={$page.params.topic === 'critics' ? 'buttonOn' : 'buttonOff'} href="/dashboard/moderation/critics">Critics <span>{data.length}</span></a>
		</nav>
		{#if form?.error}
			<p class="danger">{form.error}</p>
		{/if}
		
		{#if $page.params.topic === 'films'}
			<section class="viewContainer">
				{#if loading}
					<LoadingState context="pop" />
				{/if}
				{#if data.length > 0}
					<ul class="contentContainer">
						{#each data as film (film.id) }
							<li class="film" >
								<h3 class="h4">{film.name}</h3>
								<p>{film.year}</p>
								<div class="grouped-buttons">
									<a href={`/films/${film.id}`} class="button-regular" >View</a>
									<form method="POST" action="/?approve-film" use:enhance={({formData}) => {
										formData.append('id', film.id)
										loading = true
										return async ({update}) => {
											await update()
											loading = false
										}
									}}>
										<button type="submit" class="button-good" >Approve</button>
									</form>									
								</div>
								<HistoryView path={`/films/${film.id}/history`} />
							</li>
						{/each}
					</ul>					
				{:else}
					<EmptyState text='No films' fill='var(--base-color-alt)' height='60vh' margins={true} />
				{/if}
			</section>
		{/if}

		{#if $page.params.topic === 'companies'}
			<section class="viewContainer">
				{#if loading}
					<LoadingState context="pop" />
				{/if}
				{#if data.length > 0}
					<ul class="contentContainer">
						{#each data as company (company.id) }
							<li class="film" >
								<h3 class="h4">{company.name}</h3>
								<div class="grouped-buttons">
									<a href={`/companies/${company.id}`} class="button-regular" >View</a>
									<form method="POST" action="/?approve-company" use:enhance={({formData}) => {
										formData.append('id', company.id)
										loading = true
										return async ({update}) => {
											await update()
											loading = false
										}
									}}>
										<button type="submit" class="button-good" >Approve</button>
									</form>									
								</div>
								<HistoryView path={`/companies/${company.id}/history`} />
							</li>
						{/each}
					</ul>					
				{:else}
					<EmptyState text='No companies' fill='var(--base-color-alt)' height='60vh' margins={true} />
				{/if}
			</section>
		{/if}

		{#if $page.params.topic === 'people'}
			<section class="viewContainer">
				{#if loading}
					<LoadingState context="pop" />
				{/if}
				{#if data.length > 0}
					<ul class="contentContainer">
						{#each data as person (person.id) }
							<li class="film" >
								<h3 class="h4">{person.name}</h3>
								<p>{person.occupation}</p>
								<div class="grouped-buttons">
									<a href={`/people/${person.id}`} class="button-regular" >View</a>
									<form method="POST" action="/?approve-person" use:enhance={({formData}) => {
										formData.append('id', person.id)
										loading = true
										return async ({update}) => {
											await update()
											loading = false
										}
									}}>
										<button type="submit" class="button-good" >Approve</button>
									</form>									
								</div>
								<HistoryView path={`/people/${person.id}/history`} />
							</li>
						{/each}
					</ul>					
				{:else}
					<EmptyState text='No people' fill='var(--base-color-alt)' height='60vh' margins={true} />
				{/if}
			</section>
		{/if}

		{#if $page.params.topic === 'reviews'}
			<section class="viewContainer">
				{#if loading}
					<LoadingState context="pop" />
				{/if}
				{#if data.length > 0}
					<ul class="contentContainer">
						{#each data as review (review.id) }
							<li class="film" >
								<a href={`/users/${review.author}`}>
									<h3 class="h4">{review.author}</h3>
								</a>
								<a href={`/${review.parentKind.toLowerCase()}/${review.parentId}`}>
									<h4 class="h4">{review.parentName}</h4>
								</a>								
								<p>{review.verdict}</p>
								<p>Link Text: {review.reviewLink}</p>
								<div class="grouped-buttons">
									<a class="button-regular" href={review.reviewLink} target="_blank" rel="noreferrer" >Full Review</a>
									<form method="POST" action="/?approve-review" use:enhance={({formData}) => {
										formData.append('id', review.id)
										formData.append('parentId', review.parentId)
										loading = true
										return async ({update}) => {
											await update()
											loading = false
										}
									}}>
										<button type="submit" class="button-good" >Approve</button>
									</form>									
								</div>
								<HistoryView path={`/films/${review.id}/history`} />
							</li>
						{/each}
					</ul>					
				{:else}
					<EmptyState text='No reviews' fill='var(--base-color-alt)' height='60vh' margins={true} />
				{/if}
			</section>
		{/if}

		{#if $page.params.topic === 'critics'}
			<section class="viewContainer">
				{#if loading}
					<LoadingState context="pop" />
				{/if}
				{#if data.length > 0}
					<ul class="contentContainer">
						{#each data as item (item.id) }
							<li class="film" >
								<a href={`/users/${item.displayName}`}>
									<h3 class="h4">{item.displayName}</h3>
								</a>								
								<p>{item.notes}</p>
								<div class="grouped-buttons">
									<form method="POST" action="/?reject-critic" use:enhance={({formData}) => {
										formData.append('id', item.id)
										loading = true
										return async ({update}) => {
											await update()
											loading = false
										}
									}}>
										<button type="submit" class="button-danger" >Reject</button>
									</form>
									<form method="POST" action="/?approve-critic" use:enhance={({formData}) => {
										formData.append('id', item.id)
										loading = true
										return async ({update}) => {
											await update()
											loading = false
										}
									}}>
										<button type="submit" class="button-awe" >Approve</button>
									</form>									
								</div>
								<HistoryView path={`/films/${item.id}/history`} />
							</li>
						{/each}
					</ul>					
				{:else}
					<EmptyState text='No critics' fill='var(--base-color-alt)' height='60vh' margins={true} />
				{/if}
			</section>
		{/if}
	</div>
</section>

<style>
	/* .button {
		width: 100%;
		background: var(--accent-color-alt);
		height: 15rem;
		color: var(--base-color);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		border: none;
		font-size: 1.8rem;
		text-align: left;
	} */

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 700px;
		padding: 0.5rem;
	}

	.contentContainer {
		min-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 0;
	}

	.film {
		list-style: none;
		padding: 0 0 0.5rem 0;
		min-width: 100%;
		border-bottom: 0.1rem solid var(--brand-color);
	}

	/* .hidden {
		display: none;
	} */

	.viewContainer {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		min-height: 60vh;
		min-width: 100%;
	}

	.nav {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-auto-flow: row;
		grid-gap: 0.1rem;
		width: 100%;
	}

	.buttonOn {
		width: 100%;
		border: 0.1rem solid var(--brand-color);
		padding: 1rem;
		font-size: 1.3rem;
		font-weight: bold;
		background: var(--brand-color);
		color: var(--base-color);
	}

	.buttonOn > span {
		padding: 0.5rem;
		display: inline-flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		border: 1px solid transparent;
		border-radius: 2rem;
		background: var(--base-color);
		color: var(--brand-color);
	}

	.buttonOff {
		width: 100%;
		border: 0.1rem solid var(--brand-color);
		padding: 1rem;
		font-size: 1.3rem;
		font-weight: bold;
		background: var(--base-color);
		color: var(--brand-color);
	}

	.buttonOff > span {
		padding: 0.5rem;
		display: inline-flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		border: 1px solid transparent;
		border-radius: 2rem;
		background: var(--brand-color);
		color: var(--base-color);
	}

	@media(min-width: 600px){
		.nav {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media(min-width: 1000px){
		.nav {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media(min-width: 1200px){}
</style>