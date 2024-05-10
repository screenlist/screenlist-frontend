<script>
	import SvelteMarkdown from 'svelte-markdown'
	import { writable } from 'svelte/store'
	import { enhance } from '$app/forms'
	import LoadingState from './LoadingState.svelte'
	import ErrorState from './ErrorState.svelte'
	
	export let type
	export let data
	export let form

	const values = writable({
		headline: data?.headline ?? '',
		summary: data?.summary ?? '',
		body: data?.body ?? '',
		tags: data?.tags ?? '',
		slug: data?.slug ?? ''
	})

	if(form){
		values.set({
			headline: form.headline ?? $values.headline,
			summary: form.summary ?? $values.summary,
			body: form.body ?? $values.body,
			tags: form.tags ?? $values.tags,
			slug: form.slug ?? $values.slug
		})
	}

	let readableType;
	if(type == 'about'){
		readableType = 'About Platform'
	} else if(type == 'privacy'){
		readableType = 'Privacy Policy'
	} else if(type == 'tos'){
		readableType = 'Terms of Service'
	} else if(type == 'contributions'){
		readableType = 'Contributions Policy'
	}

	let view = 'write'
	let loading = false
	let cheatSheet = false

	function autoResize(event){
		const textarea = event.target
		textarea.style.height = 'auto'
		textarea.style.height = textarea.scrollHeight + 'px'
	}
</script>

<div class="form-page">
	<div class="popupContainer">
		<div class="titleBand">
			<h2 class="h4">{data.slug ? 'Edit' : 'Add'} {readableType}</h2>
		</div>
		<nav class="viewNav">
			<button class={view == 'write' ? 'buttonInFocus' : 'buttonOutFocus'} on:click={() => view = 'write'} type="button">Write</button>
			<button class={view == 'preview' ? 'buttonInFocus' : 'buttonOutFocus'} on:click={() => view = 'preview'} type="button">Preview</button>
		</nav>
	</div>
	<div class={view === 'write' ? 'shown' : 'hidden'} >
		<form method="POST" action={data.slug ? '?/update' : '?/create'} class="form--stretch" use:enhance={({formData}) => {
			loading = true
			return async ({update}) => {
				await update()
				loading = false
			}
		}}>
			{#if loading}
				<LoadingState context="pop" />
			{/if}

			{#if form?.error && !loading}
				<ErrorState message={form.error} />
			{/if}

			<p><span class="form-field-required"></span> Indicates a required field.</p>

			<div class="form-field">
				<label for="headline">Headline <span aria-label='required field' class="form-field-required"></span></label>
				<input bind:value={$values.headline} name="headline" type="text" required />
			</div>

			<div class="form-field">
				<label for="summary">Summary <span aria-label='required field' class="form-field-required"></span></label>
				<textarea bind:value={$values.summary} class="form-field-texter" on:input={autoResize} name="summary" required ></textarea>
			</div>

			<div class="form-field">
				<label for="body">Body <span aria-label='required field' class="form-field-required"></span></label>
				<div class="form-field-info">
					<p>Write in markdown</p>
					{#if !cheatSheet}
						<button on:click={() => cheatSheet = true} class="button-regular" type="button">Show Instructions</button>
					{:else if cheatSheet}
						<p># is for headings, always start at ##, which is a H2.</p>
						<p>**text** is for bold text.</p>
						<p>*text* is for italic text.</p>
						<p>- text is for unordered list.</p>
						<p>1. text is for ordered list.</p>
						<p>--- is for a content division line </p>
						<p>&gt; &quot;text&quot; is for blockquote </p>
						<button onClick={() => cheatSheet = false} class="button-regular" type="button">Hide Instructions</button>
					{/if}
				</div>
				<textarea bind:value={$values.body} name="body" class="textarea--large editor" required ></textarea>
			</div>

			<div class="form-field">
				<label for="tags">KTags</label>
				<div class="form-field-info">
					<p>Place commas between words to separete them.</p>
				</div>
				<input bind:value={$values.tags} name="tags" type="text" />
			</div>

			<button class="form-submit" type="submit">Submit</button>
		</form>
	</div>
	<div class={view === 'preview' ? 'shown' : 'hidden'}>
		<article class="previewContainer">
			<div>
				<h3 class="h2">{$values.headline ?? 'Write a cool headline'}</h3>
			<p>by <a href={`/users/${data.user.username}`} class="link">{data.user.username}</a></p>
			</div>			
			<div>
				{#if $values.body}
					<SvelteMarkdown source={$values.body} />
				{:else}
					Write something great
				{/if}
			</div>
		</article>
	</div>
</div>

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

	.popupContainer {
		width: 100%;
		height: 100%;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: baseline;
	}


	.titleBand {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 700px;
		padding: 0;
	}

	.hidden {
		display: none;
	}

	.shown {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
	}

	.viewNav {
		width: 100%;
		max-width: 700px;
		margin: 0.5rem 0;
		display: flex;
	}

	.viewNav > button {
		width: 50%;
		border: none;
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0.5rem 1rem;
	}

	.buttonInFocus {
		background: var(--accent-color);
		color: var(--base-color);
	}

	.buttonOutFocus {
		background: var(--base-color-alt);
		color: var(--dark);
	}

	.previewContainer {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		width: 100%;
		min-height: 70vh;
		max-width: 700px;
		background: var(--base-color-alt);
		color: var(--dark);
		padding: 1rem;
		/*border: 0.2rem solid var(--brand-color);
		border-radius: 0.2rem;*/
	}
</style>