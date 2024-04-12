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
	</div>
</section>