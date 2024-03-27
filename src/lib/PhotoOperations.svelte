<script>
	import { enhance } from '$app/forms'
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { PUBLIC_SERVER } from '$env/static/public'
	import LoadingState from '$lib/LoadingState.svelte'
	
	export let object
	export let form

	// Get user session token
	function getCookie(name) {
    const cookieArray = document.cookie.split('; ');
    const cookie = cookieArray.find(row => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }

	let token

	onMount(() => { token = getCookie('__session') })

	// Image preview
	const image = writable(null)
	const source = writable('device')
	const placeholderImage = '/photos/picture.png'

	function updateImageWithFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        image.set(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      image.set(null);
    }
  }

	async function updateImageWithLink(event) {
		const url = event.target.value
		if(url){
			const res = await fetch(`${PUBLIC_SERVER}/extract?path=${url}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			if(!res.ok){ 
				image.set(null) 
			} else {
				const blob = await res.blob()
				const objectURL = URL.createObjectURL(blob)
				image.set(objectURL)
				source.set(url)
			}

		} else {
			image.set(null)
		}
	}

	// Choose image upload source
	let mode = object ? 'update' : 'new'
	let uploadSource = 'link'

	// Loading state
	let loading = false
</script>

<div class="topButtonBand uni-pad">
	<div>
		<a href={`/films/${$page.params.id}`} class="button-icon">
			<img src="/back-icon.svg" alt="Back icon" width="35px" height="35px">
		</a>
	</div>
	
	<nav>

		{#if object}
			<label class={`button-icon ${mode === 'update' ? 'selectedMode' : ''}`} for="update">
				<img src="/edit-box-icon.svg" alt="Edit icon" width="30px" height="30px">
			</label>
			<input id="update" checked={mode === 'update'} class="hide" type="radio" name="update" value="update" bind:group={mode} />

			<label class={`button-icon ${mode === 'delete' ? 'selectedMode' : ''}`} for="delete">
				<img src="/delete-icon.svg" alt="Delete icon" width="30px" height="30px">
			</label>
			<input id="delete" checked={mode === 'delete'}  class="hide" type="radio" name="delete" value="delete" bind:group={mode} />
		{:else}
			<label class={`button-icon ${mode === 'new' ? 'selectedMode' : ''}`} for="new">
				<img src="/add-photo-icon.svg" alt="Add new icon" width="30px" height="30px">
			</label>
			<input id="new" checked={mode === 'new'}  class="hide" type="radio" name="new" value="new" bind:group={mode} />
		{/if}
	
	</nav>
</div>

<section class="form-page-new">
	{#if mode === 'new'}
		<form class="form" method="POST" action="?/create" use:enhance={() => {
			loading = true
			return async ({update}) => {
				await update()
				loading = false
			}
		}}>
			<h2 class="h4">Add new photo</h2>

			{#if form?.error}
				<p class="error">{form.error}</p>
			{/if}

			<p><span class="form-field-required"></span> Indicates a required field.</p>
			<p class="form-field-info">Only files of type png, jpeg or webp are allowed.</p>
			<nav class="uploadSourceNav">
				<button type="button" class={uploadSource === 'device' ? 'selectedSource' : 'unselectedSource'} on:click={() => {uploadSource = 'device'}}>From device</button>
				<button type="button" class={uploadSource === 'link' ? 'selectedSource' : 'unselectedSource'} on:click={() => {uploadSource = 'link'}}>From link</button>
			</nav>

			{#if uploadSource === 'device'}
				<div class="form-field">
					<label for= "poster">Open file <span aria-label='required field' class="form-field-required"></span></label>
					<input type="file" required name="poster" id="poster" accept="image/png, image/jpeg, image/webp" on:change={updateImageWithFile}/>
				</div>
			{:else}
				<div class="form-field">
					<label for= "poster">Paste link <span aria-label='required field' class="form-field-required"></span></label>
					<input type="text" required name="poster" id="poster" accept="image/png, image/jpeg, image/webp" on:input={(e) => {
						token = getCookie('__session')
						updateImageWithLink(e)
					}}/>
				</div>
			{/if}

			<div class="hide">
				<label aria-hidden="true" for="source">Source <span aria-label='required field' class="form-field-required"></span></label>
				<input aria-hidden="true" value={$image} name="source" required type="text" />
			</div>

			<p class="bold">Preview</p>
			{#if !$image}
				<p class="form-field-info">Note, If you have pasted a link, give it a few seconds to extract the image. I am lazy to create a loading spinner. You can do this, I believe in you!</p>
			{/if}
			<img id="image-preview" alt="preview" src={$image || placeholderImage} />
			
			<div class="form-field">
				<label for= "attribution">Copyright holder <span aria-label='required field' class="form-field-required"></span></label>
				<p class="form-field-info">Attribution is important, not only for legal reasons but also ethically.</p>
				<input name="attribution" required type="text" />
			</div>

			<div class="form-field">
				<label for= "description">Content description <span aria-label='required field' class="form-field-required"></span></label>
				<p class="form-field-info">Describe the content of the image for people who use screen readers, it is important for accessibilty.</p>
				<input name= "description" required type="text" />
			</div>

			<button type="submit" class="button-good">Upload</button>
		</form>
	{:else if mode === 'update'}
		<form class="form" method="POST" action="?/update" use:enhance={() => {
			loading = true
			return async ({update}) => {
				await update()
				loading = false
			}
		}}>
			<h2 class="h4">Edit Information</h2>

			<p><span class="form-field-required"></span> Indicates a required field.</p>

			<div class="form-field">
				<label for= "attribution">Copyright Owner <span aria-label='required field' class="form-field-required"></span></label>
				<p class="form-field-info">Attribution is important, not only for legal reasons but also ethically.</p>
				<input name="attribution" required type="text" value={object?.credit ?? ''} />
			</div>

			<div class="form-field">
				<label for= "description">Content Description <span aria-label='required field' class="form-field-required"></span></label>
				<p class="form-field-info">Attribution is important, not only for legal reasons but also for ethics.</p>
				<input name= "description" required type="text" value={object?.altText ?? ''} />
			</div>

			<button type="submit" class="button-good">Submit</button>
		</form>
	{:else if mode === 'delete'}
		<form class="form" method="POST" action="?/delete" use:enhance={() => {
			loading = true
			return async ({update}) => {
				await update()
				loading = false
			}
		}}>
			<h2 class="h4">Are you sure you want to delete the image? This is a destructive action, it cannot be undone, do you still want to continue?</h2>
			<div class="hide">
				<label aria-hidden="true" for="index">Source <span aria-label='required field' class="form-field-required"></span></label>
				<input aria-hidden="true" value={object?.index ?? '0'} name="index" required type="number" />
			</div>
			<button type="submit" class="button-danger">Delete, anyway!</button>
		</form>
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

	.topButtonBand > div {
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

	.uploadSourceNav {
		width: 100%;
		max-width: 700px;
		margin: 0.5rem 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.uploadSourceNav > button {
		width: 50%;
		border: none;
		font-weight: 600;
		padding: 0.5rem 1rem;
	}

	.selectedSource {
		background: var(--brand-color);
		color: var(--base-color);
	}

	.unselectedSource {
		background: var(--base-color);
		color: var(--dark);
	}
</style>