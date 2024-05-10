<script>
	import { writable } from 'svelte/store'
	import { enhance } from '$app/forms'
	import LoadingState from './LoadingState.svelte'
	import ErrorState from './ErrorState.svelte'

	// export let intend = 'new'
	export let data
	export let form

	const initialData = data?.details ? JSON.stringify(data.details) : JSON.stringify({})

	const values =  writable({
		init: initialData,
		name: data?.details?.name ?? '',
		description: data?.details?.description ?? '',
		founded: data?.details?.founded ?? new Date().getFullYear(),
		city: data?.details?.city ?? '',
		country: data?.details?.country ?? '',
		director: data?.details?.director ?? '',
		founder: data?.details?.founder ?? '',
		website: data?.details?.website ?? '',
		dateMonthFounded: data?.details?.dateMonthFounded ? data.details.dateMonthFounded.split('T')[0] : ''
	})

	if(form){
		values.set({
			init: initialData,
			name: form.name ?? $values.name,
			description: form.description ?? $values.description,
			founded: form.founded ?? $values.founded,
			city: form.city ?? $values.city,
			country: form.country ?? $values.country,
			director: form.director ?? $values.director,
			founder: form.founder ?? $values.founder,
			website: form.website ?? $values.website,
			dateMonthFounded: form.dateMonthFounded ?? $values.dateMonthFounded
		})
	}

	const currentDate = new Date()
	const startYear = 1900
	const currentYear = currentDate.getFullYear()	
	const allYears = currentYear - startYear
	const years = []
	for(let i = 0; i <= allYears; i++){years.push(startYear+i)}

	let loading = false

	function autoResize(event){
		const textarea = event.target
		textarea.style.height = 'auto'
		textarea.style.height = textarea.scrollHeight + 'px'
	}
</script>

<section>
	<form method="POST" action={data?.details ? `?/update` : '?/create'} class="form" use:enhance={({formData}) => {
		if(data?.details){
			formData.append('init', $values.init)
		}
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

		<h2 class="h4">{data.details ? `Edit ${data.details.name}` : 'Add a new company'}</h2>

		<p><span class="form-field-required"></span> Indicates a required field.</p>

		<div class="form-field">
			<label for="name">Name <span aria-label='required field' class="form-field-required"></span></label>
			<input bind:value={$values.name} id="name" name="name" type="text" />
			<span class="form-field-counter">{`${$values.name.length}/60 characters`}</span>
		</div>

		<div class="form-field">
			<label for="description">Description</label>
			<textarea bind:value={$values.description} class="form-field-texter" on:input={autoResize} disabled={loading} id="description" name="description" ></textarea>
			<span class="form-field-counter">{`${$values.description.length}/800 characters`}</span>
		</div>

		<div class="form-field" >
			<label for="founded">Year Founded</label>
			<select bind:value={$values.founded} id="founded" name="founded" >
				{#each years as item (item) }
					<option key={item} value={item}>{item}</option>
				{/each}
				<option value='' disabled={true}>No Selection</option>
			</select>
		</div>

		<div class="form-field" >
			<label for="dateMonthFounded">Founding Date</label>
			<input bind:value={$values.dateMonthFounded} id="dateMonthFounded" disabled={loading} name="dateMonthFounded" type="date" />
		</div>

		<div class="form-field">
			<label for="founder">Founder</label>
			<input bind:value={$values.founder} id="founder" disabled={loading} name="founder" type="text" />
		</div>

		<div class="form-field">
			<label for="city">City</label>
			<input bind:value={$values.city} id="city" disabled={loading} name="city" type="text" />
		</div>

		<div class="form-field">
			<label for="country">Country</label>
			<input bind:value={$values.country} id="country" disabled={loading} name="country" type="text" />
		</div>

		<div class="form-field">
			<label for="director">Director/CEO</label>
			<input bind:value={$values.director} id="director" disabled={loading} name="director" type="text" />
		</div>

		<div class="form-field">
			<label for="website">Website</label>
			<input bind:value={$values.website} id="website" disabled={loading} name="website" type="text" />
		</div>

		<button disabled={loading} class="form-submit" type="submit">{data?.details ? 'Edit' : 'Create'}</button>
	</form>
</section>