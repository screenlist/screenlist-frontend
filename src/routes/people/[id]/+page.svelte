<script>
	import { PUBLIC_HOST_URL } from '$env/static/public'
	import DonateCard from '$lib/DonateCard.svelte'
	import EmptyState from '$lib/EmptyState.svelte'
	import GridRoles from '$lib/GridRoles.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
	import ToEdit from '$lib/ToEdit.svelte'
	import SocialCard from '$lib/SocialCard.svelte'
	import SettingsOperations from '$lib/SettingsOperations.svelte'

	export let data
	export let form
</script>

<svelte:head>
	<title>{data.details.name} - Screen List</title>
	<meta name="description" content={data.details.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@OnScreenList" />
	<meta property="og:title" content={`${data.details.name}`} />
	<meta property="og:description" content={data.details.description} />
	<meta property="og:image" content={data.details.photo?.url} />
	<meta property="og:image:width" content="720" />
	<meta property="og:image:height" content="720" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/people/${data.details.id}`} />
	<meta property="og:type" content="profile" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<section itemscope itemtype="https://schema.org/Person" class="container">
	<div class="photoNameBio">
		<div class="photoBuffer">
			<figure class="photo">
				<img itemprop="image" src={data.details.photo?.url ?? '/photos/picture.png'} alt={data.details.photo?.url ? data.name : 'Placeholder'} width="750px" height="750px" loading="lazy" />
				<SignedIn>
					<a class="button-edit" href={`/people/${data.details.id}/photo/profile:0`}>
						<img src="/edit-box-icon.svg" alt="Edit icon" width="100px" height="100px">
					</a>
				</SignedIn>	
				<div class="title-band">
					<p class="uni-pad text-small text-faded"><span>&#169; </span>{data.details.photo?.credit ? data.details.photo.credit  : "Screen List"}</p>
				</div>
			</figure>
		</div>
		<div class="nameBio">
			<h1 itemprop="name">{data.details.name}</h1>
		</div>
	</div>

	 {#if data.details.description}
		<div class="bio">
			<h2 class="h3">Biography</h2>
			<p><span itemprop="description">{data.details.description}</span></p>
		</div>
	 {/if}

	 <div class="detailsFilmography">
		<div class="detailsContainer">
			<div class="band">
				<h2 class="h3">Details</h2>
				<SignedIn>
					<a href={`/people/${data.details.id}/edit`} class="button-icon">
						<img 
							src='/add-icon.svg'
							alt='Add icon'
							width="30px"
							height="30px"
						/>
						<span class="hide">Edit details</span>
					</a>
				</SignedIn>
			</div>
			<div class="detailDataContainerFlex">
				{#if data.details.occupation}
					<div class="detailDataContainerFlexChild">
						<h3 class="h4">Occupation</h3>
						<p>{data.details.occupation}</p>
					</div>
				{/if}
				{#if data.details.yearOfBirth && !data.details.dateMonthOfBirth}
					<div class="detailDataContainerFlexChild">
						<h3 class="h4">Birth Year</h3>
						<p>{data.details.yearOfBirth}</p>
					</div>
				{/if}
				{#if data.details.dateMonthOfBirth}
					<div class="detailDataContainerFlexChild">
						<h3 class="h4">Date of Birth</h3>
						<p>{new Date(data.details.dateMonthOfBirth).toLocaleDateString('en-ZA')}</p>
					</div>
				{/if}				
				{#if data.details.cityOfOrigin || data.details.provinceOfOrigin || data.details.countryOfOrigin}
					<div itemprop="birthPlace" itemscope itemtype="https://schema.org/Place" class="detailDataContainerFlexChild">
						<h3 class="h4">Birth Place</h3>
						<p><span itemprop="name">{`${data.details.cityOfOrigin ? data.details.cityOfOrigin : ''}${data.details.provinceOfOrigin ? `${data.details.cityOfOrigin ? `, ${data.details.provinceOfOrigin}` : data.details.provinceOfOrigin}` : ''}${data.details.countryOfOrigin ? `${data.details.provinceOfOrigin || data.details.cityOfOrigin ? `, ${data.details.countryOfOrigin}` : data.details.countryOfOrigin}` : ''}`}</span></p>
					</div>
				{/if}
				{#if data.details.deathDate}
					<div class="detailDataContainerFlexChild">
						<h3 class="h4">Died</h3>
						<p>{new Date(data.details.deathDate).toLocaleDateString('en-ZA')}</p>
					</div>
				{/if}
				{#if data.details.nationality}
					<div class="detailDataContainerFlexChild">
						<h3 class="h4">Nationality</h3>
						<p>{data.details.nationality.join(', ')}</p>
					</div>
				{/if}
				{#if data.details.gender}
					<div class="detailDataContainerFlexChild">
						<h3 class="h4">Gender</h3>
						<p>{data.details.gender}</p>
					</div>
				{/if}
				{#if data.details.pronouns}
					<div class="detailDataContainerFlexChild">
						<h3 class="h4">Pronouns</h3>
						<p>{data.details.pronouns}</p>
					</div>
				{/if}
			</div>
			{#if data.details.instagramUsername || data.details.twitterUsername || data.details.website}
				<div class="socialLinks">
					{#if data.details.instagramUsername}
						<a href={`https://instagram.com/${data.details.instagramUsername}`} target="_blank" rel="noreferrer">
							<span>Instagram</span>
							<img
								src="/photos/open-link.svg"
								alt="Open link in new tab icon"
								width="16px"
								height="16px"
								loading="lazy"
							/>
						</a>
					{/if}
					{#if data.details.twitterUsername}
						<a href={`https://twitter.com/${data.details.twitterUsername}`} target="_blank" rel="noreferrer">
							<span>Twitter</span>
							<img
								src="/photos/open-link.svg"
								alt="Open link in new tab icon"
								width="16px"
								height="16px"
								loading="lazy"
							/>
						</a>
					{/if}
					{#if data.details.website}
						<a href={`https://${data.details.website}`} target="_blank" rel="noreferrer">
							<span>Website</span>
							<img
								src="/photos/open-link.svg"
								alt="Open link in new tab icon"
								width="16px"
								height="16px"
								loading="lazy"
							/>
						</a>
					{/if}
				</div>
			{/if}
			<SignedOut>
				<ToEdit />
			</SignedOut>
			<div class="inverseContainer">
				{#if data.details.isHidden === true}
					<img src='/invisibility-icon.svg' alt="Locked icon" height="30px" weight="30px" />
				{/if}
				{#if data.details.editLocked === true}
					<img src='/lock-icon.svg' alt="Locked icon" height="30px" weight="30px" />
				{/if}		
				<p class={`moderationStatus ${data.details.editVerified === true ? 'm' : 'tbm'}`}>{data.details.editVerified === true ? 'Moderated' : 'To Be Moderated'}</p>
			</div>
			<SignedIn>
				{#if data?.user?.role === 'admin'}
					<SettingsOperations {form} isHidden={data.details.isHidden} editVerified={data.details.editVerified} editLocked={data.details.editLocked} />
				{/if}
			</SignedIn>
			<DonateCard vertical={true} />
		</div>
		<section class="roles-container">
			<div class="title-band">
				<h2 class="h3 uni-pad">Filmography</h2>
			</div>
			{#if data.filmography?.length > 0}
				<GridRoles {form} data={data.filmography} type='personRole'  onParent={true} />
			{:else}
				<EmptyState text="Has not done anything, yet." height="20rem" fill="var(--base-color-alt)" margins={true} />
			{/if}
			<SocialCard />
		</section>
	 </div>
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 0;
		min-width:100%;
	}

	.photoNameBio {
		display: flex;
		flex-direction: column;
		min-width: 100%;
	}

	.photoBuffer {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.photo {
		padding: 0;
		margin: 0;
		width: 100%;
		/*border: 1px transparent solid;
		border-radius: 250px;*/
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.photo > img {
		width: 100%;
		height: 100%;
	}

	.photo > a {
		position: absolute;
		right: 0;
		top: 0;
		width: 2.5rem;
		height: 2.5rem;
	}

	.photo > div > p {
		margin: 0.25rem 0;
	}

	.nameBio {
		padding: 0.2rem 0.5rem;
		flex-direction: column;
		width: 100%;
		align-items: center;
		text-align: center;
	}

	.nameBio > h1 {
		margin-bottom: 1.05rem
	}

	.detailsFilmography {
		width: 100%
	}

	.detailsContainer {
		padding: 0 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.detailDataContainer {
		min-width: 100%;
	}

	/* .detailDataContainer > p {
		font-size: 1rem;
		margin-top: 0.3rem;
	} */

	/* .detailDataContainer > h3 {
		background: transparent;
		color: var(--main-color);
		width: fit-content;
		padding: 0.3rem 0.5rem 0 0;
		margin-bottom: 0.1rem;
		margin-top: 0;
		border-bottom: 0.2rem solid var(--accent-color);
		font-size: 1.125rem;
		font-weight: 500;
	} */

	.detailDataContainerFlex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
	}

	.detailDataContainerFlexChild {
		margin-right: 1rem;
		flex: 0 1 fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.detailDataContainerFlexChild > p {
		font-size: 1rem;
		margin-top: 0.3rem;
		text-align: center;
	}

	.detailDataContainerFlexChild > h3 {
		background: transparent;
		width: fit-content;
		padding: 0.3rem 0.25rem 0 0.25rem;
		margin-bottom: 0.1rem;
		margin-top: 0;
		border-bottom: 0.2rem solid var(--accent-color);
		font-size: 1rem;
		font-weight: 500;
		text-align: center;
	}

	.name {
		min-width: 100%;
		text-align: center;
	}

	.listContainer {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0;
	}

	/* .listContainer > li {
		flex: 0 1 fit-content;
		list-style: none;
		font-weight: 600;
		margin-right: 0.5rem;
		margin-top: 0.5rem;
		padding: 0.5rem;
		color: var(--main-color);
		background: var(--base-color-alt);
		text-align: center;
	} */

	.band {
		min-width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.band > h2 {
		margin-left: 0.25rem;
	}

	.socialLinks {
		display:  flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		padding: 0.8rem 0rem 0.5rem 0rem;
	}

	.socialLinks > a {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 1rem;
		margin: 0 0.5rem 0 0;
	}

	.socialLinks > a > img {
		width: 100%;
		height: 100%;
	}

	.bio {
		/*text-align: justify;*/
		width: 100%;
		padding: 0.8rem;
		text-align: center;
		background: var(--base-color-alt)
	}

	.moderationStatus {
		padding: 0.3rem 0.6rem;
		color: var(--base-color);
		border: 0.1rem solid transparent;
		border-radius: 0.6rem;
		font-weight: 600;
		font-size: 0.8rem;
		margin: 0;
	}

	.m {
		background: var(--good-color);
	}

	.tbm {
		background: var(--accent-color);
	}

	.middleContainer {
		padding: 0 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.inverseContainer {
		padding: 0 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.inverseContainer > img {
		margin: 0 2rem 0 0;
	}

	.keyRole {
		min-width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}

	/* .keyRole > h3 {
		text-transform: lowercase;
		margin: 0.3rem 0 0.1rem 0;
		padding: 0.3rem 0.5rem 0 0;
		border-bottom: 0.2rem solid var(--accent-color);
		font-size: 1.125rem;
		font-weight: 500;
	} */

	.keyRoleList {
		list-style: none;
		padding: 0;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 0.2rem 0 0.5rem 0;
	}

	/* .keyRoleList > li {
		flex: 0 1 fit-content;
		margin: 0.25rem 0.6rem 0.25rem 0;	
	} */

	/* .keyRoleList > li > a {
		padding: 0.2rem 0.5rem;
		border-radius: 1rem;
		background: var(--accent-color-alt);
		color: var(--base-color);
		font-size: 0.9rem;
		display: inline-flex;
		text-align: left;
	} */

	.roles-container {
		width: 100%;
		margin: 0 0 0.5rem 0;
	}

	@media(min-width: 600px){
		.container {
			/*max-width: 40%;*/
			align-items: flex-start;		
		}
		.photoNameBio {
			flex-direction: row;
			justify-content:  space-between;
			align-items: flex-end;
		}
		.photoBuffer {
			width: 40%;
		}
		.nameBio {
			width: 58%;
			padding: 0;
			align-items: flex-start;
			text-align: left;
		}
		
		.bio {
			text-align: left;
		}
		.titleBand {
			padding: 0;
		}
		
		.band {
			justify-content: space-between;
		}

		.detailsContainer {
			padding: 0;
			width: 40%;
		}
		
		.detailDataContainerFlex {
			justify-content: flex-start;
		}
		
		.detailDataContainerFlexChild {
			justify-content: flex-start;
			align-items: flex-start;
		}
		
		.detailDataContainerFlexChild > p {
			text-align: left;
		}
		
		.detailDataContainerFlexChild > h3 {
			text-align: left;
			padding: 0.3rem 0.5rem 0 0;
		}
		
		.detailsFilmography {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-between;
		}

		.roles-container {
			/*margin-left: 0.8rem;*/
			width: 58%;
		}
	}

	@media(min-width: 1000px){
		/* .container {
			max-width: 30%;
		} */
		.photoBuffer {
			width: 30%;
		}
		.nameBio {
			width: 68%;
		}
		.detailsContainer {
			width: 30%;
		}
		.roles-container {
			width: 68%;
		}
	}

	@media(min-width: 1200px){
		.detailDataContainerFlex > div {
			margin-right: 0.5rem;
		}
	}
</style>