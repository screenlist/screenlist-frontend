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
		year: data?.details?.year ?? '',
		trailerUrl: data?.details?.trailerUrl ?? '',
		type: data?.details?.type ?? '',
		format: data?.details?.format ?? '',
		productionStage: data?.details?.productionStage ?? '',
		runtime: data?.details?.runtime ?? '',
		boxOffice: data?.details?.boxOffice ?? '',
		budget: data?.details?.budget ?? '',
		logline: data?.details?.logline ?? '',
		plotSummary: data?.details?.plotSummary ?? '',
		releaseDate: data?.details?.releaseDate ? data.details.releaseDate.split('T')[0] : '',
		initialPlatform: data?.details?.initialPlatform ?? '',
		countries: data?.details?.countries ?? ['South Africa'],
		languages: data?.details?.languages ?? '',
		additionalLanguages: data?.details?.additionalLanguages ?? '',
		genres: data?.details?.genres ?? ''
	})

	if(form){
		values.set({
			init: initialData,
			name: form.name ?? $values.name,
			year: form.year ?? $values.year,
			trailerUrl: form.trailerUrl ?? $values.trailerUrl,
			type: form.type ?? $values.type,
			format: form.format ?? $values.format,
			productionStage: form.productionStage ?? $values.format,
			runtime: form.runtime ?? $values.runtime,
			boxOffice: form.boxOffice ?? $values.boxOffice,
			budget: form.budget ?? $values.budget,
			logline: form.logline ?? $values.logline,
			plotSummary: form.plotSummary ?? $values.plotSummary,
			releaseDate: form.releaseDate ?? $values.releaseDate,
			initialPlatform: form.initialPlatform ?? $values.initialPlatform,
			countries: form.countries ?? $values.countries,
			languages: form.languages ?? $values.languages,
			additionalLanguages: form.additionalLanguages ?? $values.additionalLanguages,
			genres: form.genres ?? $values.genres
		})
	}

	const currentDate = new Date()
	const startYear = 1900
	const currentYear = currentDate.getFullYear()	
	const allYears = currentYear - startYear
	const years = []
	for(let i = 0; i <= allYears; i++){years.push(startYear+i)}

	let loading = false
	let coprod = false

	const countries = iso3311a2.getCountries()

	const languages = [
		'Sepedi', 'Tshivenda', 'Xitsonga', 
		'Setswana', 'Sesotho', 'isiZulu', 
		'isiNdebele', 'isiXhosa', 'isiSwati', 
		'English', 'Afrikaans', 'South African Sign Language'
	]

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
		
		<h2 class="h4">{data.details ? `Edit ${data.details.name}` : 'Add a new film'}</h2>

		<p><span class="form-field-required"></span> Indicates a required field.</p>

		<div class="form-field" >					
			<label for="name">Title <span aria-label='required field' class="form-field-required"></span></label>
			<p class="form-field-info">Strictly written in title case.</p>
			<input required id="name" name="name" type="text" />
			<span class="form-field-counter">{`${$values.name.length}/60 characters`}</span>
		</div>

		<div class="form-field" >
			<label for="year">Year <span aria-label='required field' class="form-field-required"></span></label>
			<select required="true" name="year" id="year" >
				{#each years as item (item) }
					<option key={item} value={item}>{item}</option>
				{/each}
			</select>
		</div>
		
		<div class="form-field" >
			<label for="trailerUrl">Trailer URL</label>
			<input id="trailerUrl" name="trailerUrl" type="text" />
		</div>

		<div class="form-field" >
			<label for="type">Type <span aria-label='required field' class="form-field-required"></span></label>
			<select required name="type" id="type" >
				<option value="">--Choose option--</option>
				<option value="fiction">Fiction</option>
				<option value="documentary">Documentary</option>
				<option value="animation">Animation</option>
			</select>
		</div>

		<div class="form-field" >
			<label for="format">Format <span aria-label='required field' class="form-field-required"></span></label>
			<select required name="format" id="format" >
				<option value="">--Choose option--</option>
				<option value="feature">Feature film</option>
				<option value="short">Short film</option>
			</select>
		</div>

		<div class="form-field" >
			<label for="productionStage">Stage <span aria-label='required field' class="form-field-required"></span></label>
			<select required name="productionStage" id="productionStage">
				<option value="">--Choose option--</option>
				<option value="development">Development</option>
				<option value="pre-production">Pre-production</option>
				<option value="production">Production</option>
				<option value="post-production">Post-production</option>
				<option value="finished">Finished</option>
			</select>
		</div>

		<div class="form-field" >
			<label for= "runtime">Runtime</label>
			<p class="form-field-info">A film&apos;s duration in minutes.</p>
			<input id="runtime" name= "runtime" type="number" />
		</div>

		<div class="form-field" >
			<label for= "budget">Budget</label>
			<p class="form-field-info">The amount of money {`(in South African Rands)`} it cost to produce the film.</p>
			<input id="budget" name= "budget" type="number" />
		</div>

		<div class="form-field" >
			<label for= "boxOffice">Box Office</label>
			<p class="form-field-info">The revenue {`(in South African Rands)`} that the film accumulated while playing in cinemas.</p>
			<input id="boxOffice" name= "boxOffice" type="number" />
		</div>

		<div class="form-field" >
			<label for="logline">Logline <span aria-label='required field' class="form-field-required"></span></label>
			<textarea required id="logline" class="form-field-texter" name="logline" on:input={autoResize}></textarea>
			<span class="form-field-counter">{`${$values.logline.length}/300 characters`}</span>
		</div>

		<div class="form-field" >
			<label for="plotSummary">Plot Summary</label>
			<textarea class="form-field-texter" on:input={autoResize} name="plotSummary" id="plotEummary"></textarea>
			<span class="form-field-counter">{`${$values.plotSummary.length}/1000 characters`}</span>
		</div>

		<div class="form-field" >
			<label for="releaseDate">Release Date</label>
			<input id="releaseDate" name="releaseDate" type="date" />
		</div>

		<div class="form-field" >
			<label for="initialPlatform">Initial Platform</label>
			<input id="initialPlatform" name="initialPlatform" type="text" />
		</div>

		<div class="form-field" >
			<div class="just-bold">Countries <span aria-label='required field' class="form-field-required"></span></div>
			<p class="form-field-info">By default, all films are required to be of South African origin, the option is pre selected, and if they are international {`co-productions`}, additional countries may be selected.</p>
			<ul class="form-field-list">
				{#each $values.countries as country (country) }
					<li><span >{country}</span></li>
				{/each}
			</ul>
			<button on:click={() => coprod = !coprod} type="button" class="button-regular">{coprod === false ? 'Show' : 'Hide'} {'Co-Production Countries'}</button>
			<div class={coprod === true  ? "form-checkbox-label-container" : "hide"}>	
				{#each countries as item (item) }
					{#if item === 'South African'}
						<label class="form-checkbox-label">
							<input bind:group={$values.countries} required name="countries" disabled={true} type="checkbox" value={item} />
							<span>{item}</span>
						</label>
					{:else}
						<label class="form-checkbox-label">
							<input bind:group={$values.countries} required name="countries" disabled={coprod === true ? false : true} type="checkbox" value={item} />
							<span>{item}</span>
						</label>
					{/if}
				{/each}					
			</div>
		</div>

		<div class="form-field" >
			<div class="just-bold">Languages <span aria-label='required field' class="form-field-required"></span></div>
			<div class="form-checkbox-label-container">
				{#each languages as item (item) }
					<label class="form-checkbox-label">
						<input bind:group={$values.languages} required name="languages" type="checkbox" value={item} />
						<span>{item}</span>
					</label>
				{/each}						
			</div>
		</div>

		<div class="form-field" >
			<label for="additionalLanguages">Additional Languages</label>
			<p class="form-field-info">Any other languages that are not part of the 12 official languages. If there are multiple languages, separate them by commas.</p>
			<textarea class="form-field-texter" name="additionalLanguages" id="additionalLanguages" onInput={autoResize} ></textarea>
		</div>

		<div class="form-field" >
			<div class="just-bold">Genres <span aria-label='required field' class="form-field-required"></span></div>
			<div class="form-checkbox-label-container">
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="science fiction" />
					<span>Science Fiction</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="romance" />
					<span>Romance</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="action" />
					<span>Action</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="comedy" />
					<span>Comedy</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="drama" />
					<span>Drama</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="fantasy" />
					<span>Fantasy</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="biography" />
					<span>Biography</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="thriller" />
					<span>Thriller</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="historical" />
					<span>Historical</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="musical" />
					<span>Musical</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="mystery" />
					<span>Mystery</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="adventure" />
					<span>Adventure</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="satire" />
					<span>Satire</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="western" />
					<span>Western</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="arthouse" />
					<span>Arthouse</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="experimental" />
					<span>Experimental</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="crime" />
					<span>Crime</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="horror" />
					<span>Horror</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="espionage" />
					<span>Espionage</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="animation" />
					<span>Animation</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="documentary" />
					<span>Documentary</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="psychological" />
					<span>Psychological</span>
				</label>
				<label class="form-checkbox-label">
					<input bind:group={$values.genres} disabled={loading} required name="genres" type="checkbox" value="sports" />
					<span>Sports</span>
				</label>
			</div>
		</div>

		<button disabled={loading} class="form-submit" type="submit">{data?.details ? 'Edit' : 'Create'}</button>
	</form>
</section>