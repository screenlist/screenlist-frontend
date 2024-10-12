<script>
	import iso3311a2 from 'iso-3166-1-alpha-2'
	import { writable, derived } from 'svelte/store'
	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import LoadingState from './LoadingState.svelte'
	import ErrorState from './ErrorState.svelte'
	import SearchWidget from './SearchWidget.svelte'
	import { continueOn } from './index.js'
	import { onMount, onDestroy } from 'svelte'

	export let data
	export let form

	const onSearch = $page.url.searchParams.get('on_search')

	onMount(() => { continueOn.set(false) })
	onDestroy(() => { continueOn.set(false) })

	const initialData = data?.details ? JSON.stringify(data.details) : JSON.stringify({})

	const values = writable({
		init: initialData,
		name: data?.details?.name ?? '',
		occupation: data?.details?.occupation ?? '',
		cityOfOrigin: data?.details?.cityOfOrigin ?? '',
		provinceOfOrigin: data?.details?.provinceOfOrigin ?? '',
		countryOfOrigin: data?.details?.countryOfOrigin ?? 'South Africa',
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
	let otherNationalities = false

	const allCountries = iso3311a2.getCountries()
	const searchCountries = writable('')
	const countries = derived(
		[searchCountries],
		([$searchCountries]) => allCountries.filter(val => val.toLowerCase().includes($searchCountries.toLowerCase()))
	)

	const updateCountries = (selected, forRemoval) => {
		values.update((val) => {
			let newCountries
			if(forRemoval){
				newCountries = val.nationality.filter(item => item !== selected)
			} else {
			 	if (!val.nationality.includes(selected)) {
					newCountries = [...val.nationality, selected];
				} else {
					newCountries = val.nationality;
				}
			}
			return {
				...val,
				nationality: newCountries
			}
		})
	}

	function autoResize(event){
		const textarea = event.target
		textarea.style.height = 'auto'
		textarea.style.height = textarea.scrollHeight + 'px'
	}

	const elsewhere = $page.url.searchParams.get('redirect_url')
	const elsewhereCategory = $page.url.searchParams.get('redirect_category')
</script>

<section style="width: 100%; max-width: 100%;" class="form-page">
	{#if $continueOn === false && !data.details && onSearch !== 'skip'}
		<div style="min-width: 100%; min-height: 100vh; text-align: center;">
			<div>
				<h2 class="h3" style="color: var(--brand-color);">Search for if a person is already available</h2>
			</div>
			<SearchWidget collection="people" isJustForSearch={true} />
		</div>
	{:else}
		<form method="POST" action={data?.details ? `?/update` :  `?/create` } class="form" use:enhance={({formData}) => {
			if(data?.details){
				formData.append('init', $values.init)
			}
			if(elsewhere && elsewhereCategory){ 
				formData.append('redirectUrl', elsewhere)
				formData.append('redirectCategory', elsewhereCategory)
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
					<option value='' disabled={loading}>No Selection</option>
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
				<p class="form-field-info">South Africa is selected by default for convenience but make sure to select approriately if the person was born in a foreign country.</p>
				<select bind:value={$values.countryOfOrigin} name="countryOfOrigin" id="countryOfOrigin">
					{#each allCountries as country (country)}
						<option value={country}>{country}</option>
					{/each}
				</select>
			</div>
			
			<div class="form-field">
				<label for="description">Biography</label>
				<textarea bind:value={$values.description} class="form-field-texter" on:input={autoResize} disabled={loading} id="description" name="description" ></textarea>
				<span class="form-field-counter">{`${$values.description.length}/800 characters`}</span>
			</div>

			<div class="form-field" >
				<div class="just-bold">Nationality <span aria-label='required field' class="form-field-required"></span></div>
				<p class="form-field-info">South Africa is selected by default for convenience but make sure to select approriately for people of other nationalities.</p>
				<ul class="form-field-list">
					{#each $values.nationality as country (country) }
						<li>
							<span >{country}</span>
							<button on:click={() => updateCountries(country, true)} type="button" class="button-icon">
								<img 
									src='/close-icon.svg'
									alt='Remove icon'
									width="25px"
									height="25px"
								/>
								<span class="hide">Remove country</span>
							</button>
						</li>
					{/each}
				</ul>
				<button on:click={() => otherNationalities = !otherNationalities} type="button" class="button-regular">{otherNationalities === false ? 'Show' : 'Hide'} other nationalities</button>

				<input type="hidden" name="nationality" id="nationality" value={JSON.stringify($values.nationality)} />
				{#if otherNationalities ===  true}
					<input bind:value={$searchCountries} placeholder="Search for a country" autocomplete="off" id="search-countries" type="search" />
				{/if}

				<div class={otherNationalities === true  ? "form-checkbox-label-container" : "hide"}>
					{#each $countries as item (item) }
						<label class="form-checkbox-label">
							<button on:click={() => updateCountries(item, false)} disabled={loading} class="button-regular" name="countries" type="button" value={item}>
								{item}
							</button>
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
				<p class="form-field-info">It goes without saying that you should only fill this if the person has, factually, passed on as confirmed by reputable media outlets.</p>
				<input bind:value={$values.deathDate} disabled={loading} id="deathDate" name="deathDate" type="date" />
			</div>

			<button disabled={loading} type="submit" class="form-submit">{data?.details ? 'Edit' : 'Create'}</button>
		</form>
	{/if}
</section>