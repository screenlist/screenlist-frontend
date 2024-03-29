<script>
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import LoadingState from './LoadingState.svelte'

	// export let intend = 'new'
	export let data

	const name = writable('')
	const description = writable('')
	const initialData = JSON.stringify(data.details ?? '')

	const currentDate = new Date()
	const startYear = 1900
	const currentYear = currentDate.getFullYear()	
	const allYears = currentYear - startYear
	const years = []
	for(let i = 0; i <= allYears; i++){years.push(startYear+i)}

	let loading = false

	function autoResize(){
		const textarea = event.target
		textarea.style.height = 'auto'
		textarea.style.height = textarea.scrollHeight + 'px'
	}
</script>
<!-- Needs to fix the input value conflict fixed -->
<section>
	<form method="POST" action={data.details ? `/companies/${$page.params.id}/edit?/update` : '/companies/new?/create'} class="form" use:enhance={() => {
		loading = true
		return async ({update}) => {
			await update()
			loading = false
		}
	}}>
		{#if loading}
			<LoadingState pop={true} />
		{/if}

		<h2 class="h4">{data.details ? `Edit ${data.details.name}` : 'Add a new company'}</h2>

		<p><span class="form-field-required"></span> Indicates a required field.</p>

		<div class="form-field">
			<label for="name">Name <span aria-label='required field' class="form-field-required"></span></label>
			<input bind:value={$name} id="name" name="name" type="text" />
			<span class="form-field-counter">{`${name.length}/60 characters`}</span>
		</div>

		<div class="form-field">
			<label for="description">Description</label>
			<textarea bind:value={$description} class="form-field-texter" on:input={autoResize} disabled={loading} id="description" name="description" as="textarea" ></textarea>
			<span class="form-field-counter">{`${description.length}/800 characters`}</span>
		</div>

		<div class="form-field" >
			<label for="founded">Year Founded</label>
			<select id="founded" name="founded" as="select" >
				{#each years as item (item) }
					<option key={item} value={item}>{item}</option>
				{/each}
				<option value=''>No Selection</option>
			</select>
		</div>

		<div class="form-field" >
			<label for="dateMonthFounded">Founding Date</label>
			<input id="dateMonthFounded" disabled={loading} name="dateMonthFounded" type="date" />
		</div>

		<div class="form-field">
			<label for="founder">City</label>
			<input id="founder" disabled={loading} name="founder" type="text" />
		</div>

		<div class="form-field">
			<label for="city">City</label>
			<input id="city" disabled={loading} name="city" type="text" />
		</div>

		<div class="form-field">
			<label for="country">Country</label>
			<input id="country" disabled={loading} name="country" type="text" />
		</div>

		<div class="form-field">
			<label for="director">Director/CEO</label>
			<input id="director" disabled={loading} name="director" type="text" />
		</div>

		<div class="form-field">
			<label for="website">Website</label>
			<input id="website" disabled={loading} name="website" type="text" />
		</div>

		<button disabled={loading} class="form-submit" type="submit">Create</button>
	</form>
</section>