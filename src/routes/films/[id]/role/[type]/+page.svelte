<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import SearchWidget, { selected } from '$lib/SearchWidget.svelte'
	import LoadingState from '$lib/LoadingState.svelte'

	// export let form

	let type = $page.params.type
	let category = $page.url.searchParams.get('category').toLowerCase()

	let contributer

	selected.subscribe(value => { contributer = value })

	let newContributer = false
	let departmentState
	let loading = false
	let customRole = false
</script>

<div style="width: 100%; max-width: 100%;">
	{#if !contributer}
		<div style="min-width: 100%; min-height: 100vh;">
			<div class="title-band">
				<h2 class="h4">Search for a {type === 'companies' ? 'company' : 'person'}</h2>
				<a href={`/films/${$page.params.id}`} class="button-icon">
					<img src="/close-icon.svg" alt="Close icon" width="35px" height="35px">
				</a>
			</div>
			<SearchWidget collection={type} />
		</div>
	{:else if contributer && type === 'people'}
		<form method="POST" action="?/create" class="form" use:enhance={() => {
			loading = true
			return async ({update}) => {
				await update()
				loading = false
			}
		}}
		>
			{#if loading}
				<LoadingState pop={true} />
			{/if}

			<div class="title-band">
				<h2 class="h4">Add Role</h2>
				<button type="button" disabled={loading} on:click={() => { selected.set(null); newContributer = false; departmentState = null; customRole = false }} class="button-icon">
					<img src="/refresh-icon.svg" alt="Refresh icon" width="35px" height="35px">
				</button>
			</div>
				
			<!-- {isError && <div class="danger">{isError}</div>} -->
			<p><span class="form-field-required"></span> Indicates a requred field.</p>	

			<div class="form-field">					
				<label for="personName">Name <span aria-label='required field' class="form-field-required"></span></label>
				<input value={$selected} name="personName" type="text" disabled={true} required />
			</div>	

			<div class="form-field">					
				<label for="category">Category <span aria-label='required field' class="form-field-required"></span></label>
				<input value={category} name="category" type="text" disabled={true} required />
			</div>	

			{#if category === 'cast'}
				<div class="form-field">					
					<label for="title">Title <span aria-label='required field' class="form-field-required"></span></label>
					<input value="Actor" name="title" type="text" disabled={true} required />
				</div>
			{/if}		

			<div class="form-field" >
				<h3 class="just-bold">Department <span aria-label='required field' class="form-field-required"></span></h3>
				<div class="form-checkbox-label-container">
					{#if category === 'cast'}
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Leading Cast" />
							<span>Main cast</span>
						</label>
						<label class="form-checkbox-label">
							<input name="department" type="radio" value="Supporting Cast" />
							<span>Additional Cast</span>
						</label>
					{/if}
					{#if category === 'crew'}
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Above Line" />
							<span>Main Crew</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Production" />
							<span>Production</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Direction" />
							<span>Direction</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Locations" />
							<span>Locations</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Transportation" />
							<span>Transportation</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Sound" />
							<span>Sound</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Script" />
							<span>Script</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Camera" />
							<span>Camera</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Grip" />
							<span>Grip</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Electrical" />
							<span>Electrical</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Art" />
							<span>Art</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Property" />
							<span>Property</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Costume and Wardrobe" />
							<span>Costume and Wardrobe</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Hair and Makeup" />
							<span>Hair and Makeup</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Stunts" />
							<span>Stunts</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Visual Effects" />
							<span>Visual Effects</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Special Effects" />
							<span>Special Effects</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Catering" />
							<span>Catering and Food</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Safety" />
							<span>Safety</span>
						</label>
						<label class="form-checkbox-label">
							<input required name="department" type="radio" value="Post Production" />
							<span>Post Production</span>
						</label>
					{/if}
				</div>
			</div>

			{#if category === 'cast'}
				<div class="form-field" >
					<label for="characterName">Character Name <span aria-label='required field' class="form-field-required"></span></label>
					<input required name="characterName" type="text" />
				</div>
			{/if}

			<div class="form-field" >
				{#if category === 'crew' && departmentState}
					<div class="title-band">
						<h3 class="just-bold"><span>Title</span> <span aria-label='required field' class="form-field-required"></span></h3>
						<button class="button-regular" on:click={() => customRole = !customRole} type="button">{customRole === true ? "Use Provided Options" : "Write Custom Title"}</button>
					</div>
				{/if}

				{#if departmentState && customRole}
					<input name="title" type="text" disabled={customRole ? false : true} />
				{/if}

				{#if departmentState === 'Above Line' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Director" />
							<span>Director</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Writer" />
							<span>Writer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Producer" />
							<span>Producer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Co-Producer" />
							<span>Co-Producer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Executive Producer" />
							<span>Executive Producer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Associate Producer" />
							<span>Associate Producer</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Production' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Line Producer" />
							<span>Line Producer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Unit Production Manager" />
							<span>Unit Production Manager</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Production Coordinator" />
							<span>Production Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Assistant Production Coordinator" />
							<span>Assistant Production Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Set Accountant" />
							<span>Set Accountant</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Office Production Assistant" />
							<span>Office Production Assistant</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Direction' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="First Assistant Director" />
							<span>First Assistant Director</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Second Assistant Director" />
							<span>Second Assistant Director</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Third Assistant Director" />
							<span>Third Assistant Director</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Key Production Assistant" />
							<span>Key Production Assistant</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Production Assistant" />
							<span>Production Assistant</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Locations' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Location Manager" />
							<span>Location Manager</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Location Scout" />
							<span>Location Scout</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Transportation' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Transportation Captain" />
							<span>Transportation Captain</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Transportation Coordinator" />
							<span>Transportation Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Driver" />
							<span>Driver</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Sound' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Production Sound Mixer" />
							<span>Production Sound Mixer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Boom Operator" />
							<span>Boom Operator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Sound Recordist" />
							<span>Sound Recordist</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Sound Assistant" />
							<span>Sound Assistant</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Sound Designer" />
							<span>Sound Designer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Sound Editor" />
							<span>Sound Editor</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Sound Mixer" />
							<span>Sound Mixer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Foley Artist" />
							<span>Foley Artist</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Script' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Script Supervisor" />
							<span>Script Supervisor</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Story" />
							<span>Story</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Script Consultant" />
							<span>Script Consultant</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Script Editor" />
							<span>Script Editor</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Camera' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Cinematographer" />
							<span>Cinematographer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Camera Operator" />
							<span>Camera Operator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="First Camera Assistant" />
							<span>First Camera Assistant</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Second Camera Assistant" />
							<span>Second Camera Assistant</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Steadicam Operator" />
							<span>Steadicam Operator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Gimbal Operator" />
							<span>Gimbal Operator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Drone Operator" />
							<span>Drone Operator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Digital Imaging Technicial" />
							<span>Digital Imaging Technician</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Still Photographer" />
							<span>Still Photographer</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Grip' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Key Grip" />
							<span>Key Grip</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="First Assistant Grip" />
							<span>First Assistant Grip</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Dolly Grip" />
							<span>Dolly Grip</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Rigging Grip" />
							<span>Rigging Grip</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Electrical' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Gaffer" />
							<span>Gaffer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="First Assistant Gaffer" />
							<span>First Assistant Gaffer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Rigging Electrician" />
							<span>Rigging Electrician</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Set Electrician" />
							<span>Set Electrician</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Shop Electrician" />
							<span>Shop Electrician</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Basecamp Electrician" />
							<span>Basecamp Electrician</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Generator Operator" />
							<span>Generator Operator</span>
						</label>
					</div>
				{/if}
				
				{#if departmentState === 'Art' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Production Designer" />
							<span>Production Designer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Art Director" />
							<span>Art Director</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Art Department Coordinator" />
							<span>Art Department Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Construction Coordinator" />
							<span>Construction Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Carpenter" />
							<span>Carpenter</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Key Scenic" />
							<span>Key Scenic</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Scenic Artist" />
							<span>Scenic Artist</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Set Decorator" />
							<span>Set Decorator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Leadperson" />
							<span>Leadperson</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Set Dresser" />
							<span>Set Dresser</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Greenskeeper" />
							<span>Greenskeeper</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Art Department Production Assistant" />
							<span>Art Department Production Assistant</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Property' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Property Master" />
							<span>Property Master</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Assistant Property Master" />
							<span>Assistant Property Master</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Property Maker" />
							<span>Property Maker</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Property Assistant" />
							<span>Property Assistant</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Food Stylist" />
							<span>Food Stylist</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Animal Wrangler" />
							<span>Animal Wrangler</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Costume and Wardrobe' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Costume Designer" />
							<span>Costume Designer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Assistant Costume Designer" />
							<span>Assistant Costume Designer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Key Costumer" />
							<span>Key Costumer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Set Costumer" />
							<span>Set Costumer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Wardrobe Supervisor" />
							<span>Wardrobe Supervisor</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Ager-Dryer" />
							<span>Ager/Dryer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Seamstress" />
							<span>Seamstress</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Shopper" />
							<span>Shopper</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Hair and Makeup' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Hair Department Head" />
							<span>Hair Department Head</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Makeup Department Head" />
							<span>Makeup Department Head</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Makeup Artist" />
							<span>Makeup Artist</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Makeup Effects Artist" />
							<span>Makeup Effects Artist</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Hair Stylist" />
							<span>Hair Stylist</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Stunts' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Stunt Coordinator" />
							<span>Stunt Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Stunt Performer" />
							<span>Stunt Performer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Stunt Rigger" />
							<span>Stunt Rigger</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Visual Effect' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Visual Effects Supervisor" />
							<span>Visual Effects Supervisor</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Visual Effects Coordinator" />
							<span>Visual Effects Coordinator</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Special Effects' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Special Effects Coordinator" />
							<span>Special Effects Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Special Effects Foreman" />
							<span>Special Effects Foreman</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Special Effects Technician" />
							<span>Special Effects Technician</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Armourer" />
							<span>Armourer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Pyrotechnician" />
							<span>Pyrotechnician</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Catering' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Production Caterer" />
							<span>Production Caterer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Key Craft Service" />
							<span>Key Craft Service</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Safety' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Set Medic" />
							<span>Set Medic</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Intimacy Coordinator" />
							<span>Intimacy Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Covid Compliance Officer" />
							<span>Covid Compliance Officer</span>
						</label>
					</div>
				{/if}

				{#if departmentState === 'Post Production' && !customRole}
					<div class="form-checkbox-label-container">
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Post Production Coordinator" />
							<span>Post Production Coordinator</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Editor" />
							<span>Editor</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Colourist" />
							<span>Colourist</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Music Supervisor" />
							<span>Music Supervisor</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Composer" />
							<span>Composer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Music Performer" />
							<span>Music Performer</span>
						</label>
						<label class="form-checkbox-label">
							<input name="title" type="radio" value="Illustrator" />
							<span>Illustrator</span>
						</label>
					</div>
				{/if}
			</div>

			<button disabled={loading} class="form-submit" type="submit">Submit</button>
		</form>
	{:else if contributer && type === 'companies'}
		<form method="POST" action="?/create" class="form" use:enhance={() => {
				loading = true
				return async ({update}) => {
					await update()
					loading = false
				}
			}}
		>
			{#if loading}
				<LoadingState pop={true} />
			{/if}

			<p><span class="form-field-required"></span> Indicates a required field.</p>

			<div class="form-field">
				<label for="companyName">Name <span aria-label='required field' class="form-field-required"></span></label>
				<input value={$selected} id="companyName" disabled={true} name="companyName" type="text" />
			</div>

			<div class="form-field" >
				<label for="capacity">Role <span aria-label='required field' class="form-field-required"></span></label>
				<select name="capacity" id="capacity" >
					<option value="Producer">Producer</option>
					<option value="Distributor">Distributor</option>
					<option value="Financier">Financier</option>
					<option value="Co Producer">Co-Producer</option>
					<option value="In Participation">In Participation</option>
					<option value="In Support">In Support</option>
					<option value="In Association">In Association</option>
				</select>
			</div>

			<button disabled={loading} class="form-submit" type="submit">Create</button>
		</form>
	{/if}
</div>