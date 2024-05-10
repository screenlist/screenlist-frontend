<script>
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
	import { enhance } from '$app/forms'
	import LoadingState from './LoadingState.svelte'
	import ErrorState from './ErrorState.svelte'

	export let onParent = false
	export let data
	export let type
	export let form

	let loading = false
	let shortened = true

	// console.log(data)

	function toggleView(){ shortened = !shortened }
</script>

{#if loading}
	<LoadingState context="pop" />
{/if}

{#if form?.error && !loading}
	<ErrorState message={form.error} />
{/if}

{#if type === 'personRole' && onParent}
	<section class={loading ? 'containerOnParent tasked' : 'containerOnParent'}>
		{#each data as item (item.id)}
			<article class="itemContainerOnParent">
				<div class="headerOnParent">
					<span>{item.year}</span>
					<span>&#11044;</span>
					<a href={`/${item.ownerCollection}/${item.id}`} title={item.name}>
						<h3 class="textLeft">{item.name}</h3>
					</a>
				</div>
				<div class="bodyOnParent">
					<div class="infoContainerOnParent">
						<ul class="filmmakingList">
							{#if item.roles.filter(val => val.category === 'cast').length > 0}
								{#each item.roles.filter(val => val.category === 'cast') as role (role.id)}
									<li class="actor">
										<span>as {role.characterName}</span>
										<SignedIn>
											<form method="POST" action={`/${item.ownerCollection}/${item.id}/role/people?/delete`} use:enhance={({formData}) => {
												formData.append('urlPath', item.urlPath)
												loading = true
												return async ({update}) => {
													await update()
													loading = false
												}
											}}>
												<!-- <input class="hide" disabled type="text" name="urlPath" value={role.urlPath}> -->
												<button class="button-icon" type="submit" disabled={loading}>
													<img src="/delete-icon.svg" alt="Trash icon" width="20px" height="25px" />
												</button>
											</form>
										</SignedIn>
									</li>
								{/each}
							{/if}
							{#if item.roles.filter(val => val.category === 'crew').length > 0}
								{#each item.roles.filter(val => val.category === 'crew') as role (role.id) }
									<li class="crew">
										<span>{role.role}</span>
										<SignedIn>
											<form method="POST" action={`/${item.ownerCollection}/${item.id}/role?/delete`} use:enhance={() => {
												loading = true
												return async ({update}) => {
													await update()
													loading = false
												}
											}}>
												<!-- <input class="hide" disabled type="text" name="urlPath" value={role.urlPath}> -->
												<button class="button-icon" type="submit" disabled={loading}>
													<img src="/delete-icon.svg" alt="Trash icon" width="20px" height="25px" />
												</button>
											</form>
										</SignedIn>
									</li>
								{/each}
							{/if}
						</ul>
					</div>
				</div>
			</article>
		{/each}
	</section>
{:else if type === 'personRole' && !onParent}
	<section class={loading ? 'container tasked' : 'container'}>
		{#each data as item, index (item.id)} 
			<article class={index > 9 && shortened === true ? 'hide' : 'itemContainer'}>
				<a href={`/people/${item.parentId}`} title={item.parentName}>
					<figure class="imageContainer">
						<img 
							src={item.photoUrl ?? '/photos/picture.png'} 
							alt={item.photoUrl ? `${item.parentName} portrait` : 'Placeholder'}
							loading="lazy"
							placeholder="/photos/picture.png"
							height="300px"
							weight="300px"
						/>
					</figure>
				</a>
				<h3 class="text titleText">{item.parentName}</h3>
				<p class="titleText textCenter">{item.category === 'cast' ? item.characterName : item.role}</p>
				<SignedIn>
					<form method="POST" action={`/${item.ownerCollection}/${item.id}/role/people?/delete`} use:enhance={({formData}) => {
						formData.append('urlPath', item.urlPath)
						loading = true
						return async ({update}) => {
							await update()
							loading = false
						}
					}}>
						<!-- <input class="hide" disabled type="text" name="urlPath" value={item.urlPath}> -->
						<button class="button-icon" type="submit" disabled={loading}>
							<img src="/delete-icon.svg" alt="Trash icon" width="20px" height="25px" />
						</button>
					</form>
				</SignedIn>
			</article>
		{/each}
		{#if data.length > 10}
			<button class="expandButton" on:click={toggleView} >{shortened ? 'Show more.' : 'Show less.'}</button>
		{/if}
	</section>
{:else if type === 'companyRole' && onParent}
	<section class={loading ? 'containerOnParent tasked' : 'containerOnParent'}>
		{#each data as item (item.id)}
			<article class="itemContainerOnParent">
				<div class="headerOnParent">
					<span>{item.year}</span>
					<span>&#11044;</span>
					<a href={`/${item.ownerCollection}/${item.ownerId}`} title={item.ownerName}>
						<h3 class="textLeft">{item.ownerName}</h3>
					</a>
				</div>
				<div class="bodyOnParent">
					<div class="infoConatinerOnParent">
						{#if item.role }
							<ul class="filmmakingList">
								{#each item.roles as role (role.id)}
									<li class="crew">
										<span>{role.capacity}</span>
										<SignedIn>
											<form method="POST" action={`/${item.ownerCollection}/${item.id}/role/companies?/delete`} use:enhance={({formData}) => {
												formData.append('urlPath', item.urlPath)
												loading = true
												return async ({update}) => {
													await update()
													loading = false
												}
											}}>
												<!-- <input class="hide" disabled type="text" name="urlPath" value={role.urlPath}> -->
												<button class="button-icon" type="submit" disabled={loading}>
													<img src="/delete-icon.svg" alt="Trash icon" width="20px" height="25px" />
												</button>
											</form>
										</SignedIn>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</div>
			</article>	
		{/each}
	</section>
{:else if type === 'companyRole' && !onParent}
	<section class={loading ? 'container tasked' : 'container'}>
		{#each data as item, index (item.id) }
			<article itemprop="productionCompany" itemscope itemtype="https://schema.org/Organization" class={index > 9 && shortened === true ? 'hide' : 'itemContainer'}>
				<a href={`/companies/${item.parentId}`} title={item.parentName}>
					<figure class="imageContainer">
						<img 
							src={item.photoUrl ?? '/photos/picture.png'} 
							alt={item.photoUrl ? `${item.parentName} logo` : 'Placeholder'}
							loading="lazy"
							placeholder="/photos/picture.png"
							height="300px"
							weight="300px"
						/>
					</figure>
				</a>
				<h3 itemprop="name" class="text titleText">{item.parentName}</h3>
				<p class="textCenter">{item.role}</p>
				<SignedIn>
					<form method="POST" action={`/${item.ownerCollection}/${item.id}/role/companies?/delete`} use:enhance={({formData}) => {
						formData.append('urlPath', item.urlPath)
						loading = true
						return async ({update}) => {
							await update()
							loading = false
						}
					}}>
						<!-- <input class="hide" disabled type="text" name="urlPath" value={item.urlPath}> -->
						<button class="button-icon" type="submit" disabled={loading}>
							<img src="/delete-icon.svg" alt="Trash icon" width="20px" height="25px" />
						</button>
					</form>
				</SignedIn>
			</article>
		{/each}
		{#if data.length > 10}
			<button class="expandButton" on:click={toggleView} >{shortened ? 'Show more.' : 'Show less.'}</button>
		{/if}
	</section>
{/if}

<style>
	.tasked {
		opacity: 0.7;
	}

	.bodyOnParent {
		display: flex;
		flex-direction: row;
		justify-items: flex-start;
		justify-content: baseline;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-auto-flow: row;
		grid-gap: 0.2rem;
		height: auto;
		width: 100%;
		overflow: hidden;
		padding: 0 0.5rem 0 0.5rem;
	}

	.containerOnParent {
		/* display: grid;
		grid-template-columns: repeat(1fr);
		grid-auto-flow: row;
		grid-gap: 0.5rem; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		height: auto;
		min-width: 100%;
		/* overflow: hidden; */
		padding: 0;
		margin-top: 0.8rem;
	}

	.itemContainer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background: var(--base-color-alt);
		padding: 0rem 0rem 0.8rem 0;
		min-height: 220px;
		width: 100%;
		/*border: 0.2rem var(--accent-color) solid;
		border-radius: 0.3rem;*/
	}

	.itemContainer > a {
		display: inline-block;
		width: 100%;
	}

	.itemContainer > h3 {
		padding: 0 0.8rem;
		width: 100%;
	}

	.itemContainer > p {
		padding: 0 0.8rem;
		width: 100%
	}

	.itemContainerOnParent {
		display: flex;
		flex-direction: column;
	/*	justify-content: baseline;*/
		align-items: stretch;
		background: var(--base-color);
		padding: 0.5rem;
		margin: 0.5rem 0;
		width: 100%; 
	/*	border-bottom: 0.1rem var(--brand-color) solid;*/
	}

	/* .itemContainerOnParent > a > h3 {
		margin: 0.8rem 0;
	} */

	.headerOnParent {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.headerOnParent > span {
		margin: 0 0.5rem 0 0;
		font-size: 0.9rem;
		font-weight: 500;
	}

	/* .itemContainerCompany {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background: var(--base-color-alt);
		padding: 0.5rem 0.3rem;
		min-height: 180px;
		border: 0.2rem var(--accent-color) solid;
		border-radius: 0.3rem;
	} */

	.imageContainer {
		padding: 0;
		margin: 0;
		/* min-height: 100px; */
		width: 100%;
		/* border: 0.2rem var(--accent-color) solid; */
		/* border-radius: 100px; */
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
	}

	.imageContainer > img {
		width: 100%;
		height: 100%;
	}

	/* .imageContainer > span {
		width: 100%;
	} */

	/* .imageContainerOnParent {
		padding: 0;
		margin: 0;
		min-width: 40px;
		min-height: 60px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: baseline;
		align-items: center;
	} */

	/* .infoContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-height: fit-content;
	} */

	.infoContainerOnParent {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		height: fit-content;
		width: 100%;
		margin: 0;
	}

	/* .infoContainerOnParent > h4 {
		margin: 0.3rem 0 0.2rem 0;
		padding: 0.3rem 0.5rem 0 0;
		border-bottom: 0.3rem solid var(--accent-color);
	} */

	/* .infoContainerOnParent > h3 {
		margin: 0 0 0.2rem 0;
	} */

	/* .infoContainerOnParent > p {
		margin: 0.2rem 0 0 0;
	} */

	.text {
		text-align: center;
		margin-bottom: 0.1rem;
		margin-top: 0.5rem;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.textLeft {
		text-align: left;
		margin-bottom: 0rem;
		margin-top: 0rem;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.textCenter {
		text-align: center;
	}

	.titleText {
		/* text-overflow: ellipsis;
		white-space: nowrap; */
		word-wrap: break-word;
		overflow: hidden;
		/* width: 100px; */
		display: inline-block;
	}

	/* .infoCommonOnParent {
		display: flex;
		flex-direction: row;
		justify-content: baseline;
	} */

	/* .infoCommonOnParent > p {
		margin: 0 1rem 0 0;
	} */

	.filmmakingList {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0;
		margin: 0;
	}

	.filmmakingList > li {
		flex: 0 1 fit-content;
		display: flex;
		flex-direction: row;
		align-items: center;
		list-style: none;
		font-size: 0.9rem;
		font-weight: 500;
		margin: 0.25rem 0.5rem 0.25rem 0;
		padding: 0.3rem 0.6rem;
		border-radius: 0.75rem;
		text-align: left;
	}

	.actor {
		color: var(--base-color);
		background: var(--accent-color-alt);
	}

	.crew {
		color: var(--brand-color);
		background: var(--base-color-alt);
	}

	/* .filmmakingList > li > button {
		margin: 0 0 0 0.5rem;
		background: transparent;
		color: var(--base-color);
		border: none;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		padding: 0;
		border-radius: 0.3rem;
	} */

	/* .filmmakingList > li > button:focus {
		opacity: 0.7;
	} */

	/* .filmmakingList > li > button:hover {
		opacity: 0.7;
	} */

	.expandButton {
		background: var(--base-color-alt);
		color: var(--dark);
		width: 100%;
		height: 100%;
		font-size: 2rem;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border: 0.1rem solid transparent;
	/*	border-radius: 0.2rem;*/
	}

	/* .expandButton:focus {
		background: var(--dark);
	}

	.expandButton:hover {
		background: var(--dark);
	} */

	@media(min-width: 600px){
		.container {
			padding: 0;
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.itemContainerOnParent {
			padding: 0 0.5rem 0 0;
			border-right: 0.2rem solid var(--brand-color);
		}
		.infoContainerOnParent {
			padding: 0 0 0 4rem;
		}
	}

	@media(min-width: 1000px){
		/* .container {
			grid-template-columns: repeat(3, 1fr);
		} */
		.containerOnParent {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media(min-width: 1200px){
		.container {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
		.containerOnParent {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>