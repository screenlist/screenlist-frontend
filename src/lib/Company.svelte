<script>
	import iso3311a2 from 'iso-3166-1-alpha-2'
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import { onMount, onDestroy } from 'svelte'
	import LoadingState from './LoadingState.svelte'
	import ErrorState from './ErrorState.svelte'
	import SearchWidget from './SearchWidget.svelte'
	import { selected, continueOn } from './index.js'

	// export let intend = 'new'
	export let data
	export let form

	onMount(() => { continueOn.set(false) })
	onDestroy(() => { continueOn.set(false) })

	const initialData = data?.details ? JSON.stringify(data.details) : JSON.stringify({})

	const values =  writable({
		init: initialData,
		name: data?.details?.name ?? '',
		description: data?.details?.description ?? '',
		founded: data?.details?.founded ?? '',
		city: data?.details?.city ?? '',
		country: data?.details?.country ?? 'South Africa',
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

	const countries = iso3311a2.getCountries()

	function autoResize(event){
		const textarea = event.target
		textarea.style.height = 'auto'
		textarea.style.height = textarea.scrollHeight + 'px'
	}
	const elsewhere = $page.url.searchParams.get('redirect_url')
</script>

<section class="form-page">
	{#if $continueOn === false && !data.details}
		<div style="min-width: 100%; min-height: 100vh; padding: 0 1rem; text-align: center;">
			<div>
				<h2 class="h3" style="color: var(--brand-color);">Search for if a company is already available</h2>
			</div>
			<SearchWidget collection="companies" isJustForSearch={true} />
		</div>
	{:else}
		<form method="POST" action={data?.details ? `?/update` : `?/create`} class="form" use:enhance={({formData}) => {
			if(data?.details){
				formData.append('init', $values.init)
			}
			if(elsewhere){ 
				formData.append('redirectUrl', elsewhere)
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
					<option value='' disabled={loading}>No Selection</option>
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
				<p class="form-field-info">South Africa is selected by default for convenience but make sure to select approriately if the company is based in a foreign country.</p>
				<select bind:value={$values.country} id="country" name="country">
					{#each countries as country (country)}
						<option value={country}>{country}</option>
					{/each}
				</select>
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
	{/if}
</section>