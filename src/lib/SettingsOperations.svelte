<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import LoadingState from './LoadingState.svelte'
	import ErrorState from './ErrorState.svelte'
	
	export let form
	export let isHidden
	export let editVerified
	export let editLocked

	let loading = false
</script>




<section class="settings">
	{#if form?.error && loading === false}
		<ErrorState message={form.error} />
	{/if}

	{#if loading}
		<LoadingState context="pop" />
	{/if}

	<h2 class="h3">Settings</h2>
	<div class="buttons">
		{#if editVerified === false}
			<form method="POST" action={`?/verify`} use:enhance={({formData}) => {
				formData.append('id', $page.params.id)
				loading = true
				return async ({update}) => {
					await update()
					loading = false
				}
			}}> <button disabled={loading} class="buttonOn" type="submit">Approve</button> </form>
		{/if}
		<form method="POST" action={`?/${isHidden ? 'unhide' : 'hide'}`} use:enhance={({formData}) => {
			formData.append('id', $page.params.id)
			loading = true
			return async ({update}) => {
				await update()
				loading = false
			}
		}}> <button disabled={loading} class={ isHidden ? 'buttonOn' : 'buttonOff'} type="submit">{isHidden ? 'Unhide' : 'Hide'}</button> </form>
		<form method="POST" action={`?/${editLocked ? 'unlock' : 'lock'}`} use:enhance={({formData}) => {
			formData.append('id', $page.params.id)
			loading = true
			return async ({update}) => {
				await update()
				loading = false
			}
		}}> <button disabled={loading} class={ editLocked ? 'buttonOn' : 'buttonOff'} type="submit">{editLocked ? 'Unlock' : 'Lock'}</button> </form>
	</div>
</section>

<style>
	.settings {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		margin: 0.5rem 0;
		min-width: 100%;
	}

	.buttons {
		display: flex;
		flex-direction: column;
	}

	.buttons > form > button {
		margin-top: 0.5rem;
		font-weight: 600;
		font-size: 0.9rem;
		border-radius: 0.25rem;
		min-width: 100%;
		padding: 0.5rem;
	}

	.buttonOn {
		background: var(--brand-color);
		color: var(--base-color);	
		border: none;
	}

	.buttonOff {
		background: var(--base-color);
		color: var(--accent-color-alt);	
		border: 0.15rem solid var(--accent-color-alt);	
	}

	@media(min-width: 600px){
		.settings { 
			padding: 0;
		}
	}
</style>