<script>
	import iso3311a2 from 'iso-3166-1-alpha-2'
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import LoadingState from './LoadingState.svelte'

	export let data
	export let form

	const initialData = data?.details ? JSON.stringify(data.details) : JSON.stringify({})

	const values = writable({
		init: initialData,
		name: data?.details?.name ?? '',
		occupation: data?.details?.occupation ?? '',
		cityOfOrigin: data?.details?.cityOfOrigin ?? '',
		provinceOfOrigin: data?.details?.provinceOfOrigin ?? '',
		countryOfOrigin: data?.details?.countryOfOrigin ?? '',
		yearOfBirth: data?.details?.yearOfBirth ?? '',
		dateMonthOfBirth: data?.details?.dateMonthOfBirth ? data.details.dateMonthOfBirth.split('T')[0] : '',
		deathDate: data?.details?.deathDate ? data.details.deathDate.split('T')[0] : '',
		nationality: data?.details?.nationality ?? ['South Africa'],
		gender: data?.details?.gender ?? '',
		pronouns: data?.details?.pronouns ?? '',
		twitterUsername: data?.details?.twitterUsername ?? '',
		instagramUsername: data?.details?.instagramUsername ?? '',
		description: data?.details?.description ?? '',
		website: data?.details?.website ?? ''
	})

	if(form){
		values.set({
			init: initialData,
			name: form.name ?? $values.name,
			occupation: form.occupation ?? $values.occupation,
			cityOfOrigin: form.cityOfOrigin ?? $values.cityOfOrigin,
			provinceOfOrigin: form.provinceOfOrigin ?? $values.provinceOfOrigin,
			countryOfOrigin: form.countryOfOrigin ?? $values.countryOfOrigin,
			yearOfBirth: form.yearOfBirth ?? $values.yearOfBirth,
			dateMonthOfBirth: form.dateMonthOfBirth ?? $values.dateMonthOfBirth,
			deathDate: form.deathDate ?? $values.deathDate,
			nationality: form.nationality ?? $values.nationality,
			gender: form.gender ?? $values.gender,
			pronouns: form.pronouns ?? $values.pronouns,
			twitterUsername: form.twitterUsername ?? $values.twitterUsername,
			instagramUsername: form.instagramUsername ?? $values.instagramUsername,
			description: form.description ?? $values.description,
			website: form.website ?? $values.website
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
</script>

<section class="form-with-bar">
	<form method="POST" action={data?.details ? `?/update` : '?/create'} class="form" use:enhance={() => {
		loading = true
		return async ({update}) => {
			await update()
			loading = false
		}
	}}>
		{#if loading}
			<LoadingState pop={true} />
		{/if}

		<h2 class="h4">{data.details ? `Edit ${data.details.name}` : 'Add a new person'}</h2>

		<p><span class="form-field-required"></span> Indicates a required field.</p>

		<div class="form-field">					
			<label for="name">Name <span aria-label='required field' class="form-field-required"></span></label>
			<input required="true" bind:value={$values.name} disabled={loading} id="name" name="name" type="text" />
			<span class="form-field-counter">{`${$values.name.length}/60 characters`}</span>
		</div>

		<div class="form-field">					
			<label for="occupation">Occupation <span aria-label='required field' class="form-field-required"></span></label>
			<input required="true" bind:value={$values.occupation} disabled={loading} id="occupation" name="occupation" type="text" />
		</div>

		<div class="form-field" >
			<label for="yearOfBirth">Birth Year</label>
			<select bind:value={$values.yearOfBirth} name="yearOfBirth" id="yearOfBirth" >
				{#each years as item (item) }
					<option value={item}>{item}</option>
				{/each}
				<option value='' disabled={true}>No Selection</option>
			</select>
		</div>

		<div class="form-field">
			<label for="dateMonthOfBirth">Date of Birth</label>
			<input bind:value={$values.dateMonthOfBirth} disabled={loading} id="dateMonthOfBirth" name="dateMonthOfBirth" type="date" />
		</div>

		<div class="form-field">
			<label for="cityOfOrigin">City/Town of Origin</label>
			<input bind:value={$values.cityOfOrigin} disabled={loading} id="cityOfOrigin" name="cityOfOrigin" type="text" />
		</div>

		<div class="form-field">
			<label for="provinceOfOrigin">Province of Origin</label>
			<input bind:value={$values.provinceOfOrigin} disabled={loading} id="provinceOfOrigin" name="provinceOfOrigin" type="text" />
		</div>

		<div class="form-field">
			<label for="countryOfOrigin">Country of Origin</label>
			<input bind:value={$values.countryOfOrigin} disabled={loading} id="countryOfOrigin" name="countryOfOrigin" type="text" />
		</div>
		
		<div class="form-field">
			<label for="description">Biography</label>
			<textarea bind:value={$values.description} class="form-field-texter" on:input={autoResize} disabled={loading} id="description" name="description" ></textarea>
			<span class="form-field-counter">{`${$values.description.length}/800 characters`}</span>
		</div>

		<div class="form-field" >
			<div class="just-bold">Nationality <span aria-label='required field' class="form-field-required"></span></div>
			<div class="form-checkbox-label-container">
				{#each countries as country (country)}
					<label class="form-checkbox-label">
						<input bind:group={$values.nationality} type="checkbox" name="nationality" disabled={loading} value={country} />
						<span>{country}</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="form-field">
			<label for="gender">Gender</label>
			<input bind:value={$values.gender} disabled={loading} id="gender" name="gender" type="text" />
		</div>

		<div class="form-field">
			<label for="pronouns">Pronouns</label>
			<input bind:value={$values.pronouns} disabled={loading} id="pronouns" name="pronouns" type="text" />
		</div>
		
		<div class="form-field">
			<label for="website">Website</label>
			<input bind:value={$values.website} disabled={loading} id="website" name="website" type="text" />
		</div>

		<div class="form-field">					
			<label for="twitterUsername">Twitter Username</label>
			<input bind:value={$values.twitterUsername} disabled={loading} id="twitterUsername" name="twitterUsername" type="text" />
		</div>

		<div class="form-field">					
			<label for="instagramUsername">Instagram Username</label>
			<input bind:value={$values.instagramUsername} disabled={loading} id="instagramUsername" name="instagramUsername" type="text" />
		</div>

		<div class="form-field">					
			<label for="deathDate">Death Date</label>
			<input bind:value={$values.deathDate} disabled={loading} id="deathDate" name="deathDate" type="date" />
		</div>

		<div class="hide">					
			<label for="init">Initial Values</label>
			<input aria-hidden="true" bind:value={$values.init} disabled={true} id="init" name="init" type="text" />
		</div>

		<button disabled={loading} type="submit" class="form-submit">{data?.details ? 'Edit' : 'Create'}</button>
	</form>
</section>