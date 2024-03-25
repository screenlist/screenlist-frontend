<script>
	import { page } from '$app/stores'
	export let object
	console.log(object)
	let mode = object ? 'update' : 'new'
</script>

<div class="topButtonBand uni-pad">
	<a href={`/films/${$page.params.id}`} class="button-icon">
		<img src="/back-icon.svg" alt="Back icon" width="35px" height="35px">
	</a>
	<nav>

		{#if object}
			<label class={`button-icon ${mode === 'update' ? 'selectedMode' : ''}`} for="update">
				<img src="/edit-box-icon.svg" alt="Edit icon" width="30px" height="30px">
			</label>
			<input id="update" checked={mode === 'update'} class="hide" type="radio" name="mode" value="update" bind:group={mode} />

			<label class={`button-icon ${mode === 'delete' ? 'selectedMode' : ''}`} for="delete">
				<img src="/delete-icon.svg" alt="Delete icon" width="30px" height="30px">
			</label>
			<input id="delete" checked={mode === 'delete'}  class="hide" type="radio" name="mode" value="delete" bind:group={mode} />
		{:else}
			<label class={`button-icon ${mode === 'new' ? 'selectedMode' : ''}`} for="new">
				<img src="/add-photo-icon.svg" alt="Add new icon" width="30px" height="30px">
			</label>
			<input id="new" checked={mode === 'new'}  class="hide" type="radio" name="mode" value="new" bind:group={mode} />
		{/if}	
		
	</nav>	
</div>

<section class="form-page">
	{#if mode === 'new'}
		<form class="form" action="?/new">
			<h2>Add new photo</h2>
		</form>
	{:else if mode === 'update'}
		<p>Update photo information</p>
	{:else if mode === 'delete'}
		<p>Delete photo altogether</p>
	{/if}
</section>



<style>
	.topButtonBand {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 1.5rem 0 0.5rem 0;
	}

	.topButtonBand > a {
		width: 30%;
	}

	.topButtonBand > nav {
		width: 70%;
	}

	.topButtonBand > nav > label {
		margin: 0 10%;
		width: fit-content;
		height: fit-content;
		display: inline-block;
		padding: 0.5rem;
		border-radius: 30px;
	}

	.selectedMode {
		background: var(--base-color-alt);
	}
</style>