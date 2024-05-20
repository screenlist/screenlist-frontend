<script>
	import { PUBLIC_HOST_URL } from '$env/static/public'
	import DonateCard from '$lib/DonateCard.svelte'
	import EmptyState from '$lib/EmptyState.svelte'
	import SocialCard from '$lib/SocialCard.svelte'
	import GridRoles from '$lib/GridRoles.svelte'
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
	import ToEdit from '$lib/ToEdit.svelte'
	import SettingsOperations from '$lib/SettingsOperations.svelte'

	export let data
	export let form
	// console.log(data)

	function ratingColor(factor){
		const startColor = '#BF0603'
		const endColor = '#073b4c'

		if (factor > 1) factor = 1
		else if (factor < 0) factor = 0
		
		const result = startColor.slice(1).match(/.{2}/g).map((hex, index) => 
			Math.round(parseInt(hex, 16) + factor * (parseInt(endColor.slice(1).match(/.{2}/g)[index], 16) - parseInt(hex, 16)))
			.toString(16).padStart(2, '0')
		).join('');
		
		return `#${result}`;
	}

	let stillOne = data.stills.find(item => item.index === 0)
	let stillTwo = data.stills.find(item => item.index === 1)
	let stillThree = data.stills.find(item => item.index === 2)

	// console.log(stillOne)
	// console.log(stillTwo)
	// console.log(stillThree)

</script>

<svelte:head>
	<title>{data.details.name} ({data.details.year}) - Screen List</title>
	<meta name="description" content={data.details.logline} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@OnScreenList" />
	<meta property="og:title" content={`${data.details.name} (${data.details.year})`} />
	<meta property="og:description" content={data.details.logline} />
	<meta property="og:image" content={data.details.poster?.url} />
	<meta property="og:image:width" content="1000" />
	<meta property="og:image:height" content="1500" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/films/${data.details.id}`} />
	<meta property="og:type" content="video.movie" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<div itemscope itemtype="https://schema.org/Movie">
	<h1 itemprop="name" class="uni-pad">{data.details.name} {`(${data.details.year})`}</h1>
	<div class="layout-progressive uni-relative">
		<section class="container" id="details">
			<figure>
				<img 
					src={data.details.poster?.url ?? '/photos/poster.png'} 
					alt={data.details.poster?.altText ?? 'Placeholder'} 
					placeholder='/photo/poster.png' 
					height="1620px"
					width="1080px"
					loading="lazy"
				/>
				<SignedIn>
					<a class="button-edit" href={`/films/${data.details.id}/photo/poster:0`}>
						<img src="/edit-box-icon.svg" alt="Edit icon" width="100px" height="100px">
						<span class="hide">Image operations</span>
					</a>
				</SignedIn>				
				<div class="title-band">
					<p class="uni-pad text-small text-faded">{data.details.poster?.credit ? '© '+data.details.poster.credit  : "© Screen List"}</p>
				</div>
			</figure>
			<div class="inverseContainer">
				<p class={`moderationStatus ${data.details.editVerified === true ? 'm' : 'tbm'}`}>{data.details.editVerified === true ? 'Moderated' : 'To Be Moderated'}</p>
			</div>
			<SignedIn>
				{#if data?.user?.role === 'admin'}
					<SettingsOperations {form} isHidden={data.details.isHidden} editVerified={data.details.editVerified} editLocked={data.details.editLocked} />
				{/if}
			</SignedIn>
			<SignedOut><ToEdit /></SignedOut>
			<div class="titleBand">
				<h2 class="h3">Details</h2>
				<SignedIn>
					<a href={`/films/${data.details.id}/edit`} class="button-icon">
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
			<div class="detailsContainer">
				{#if data.details?.genres}
					<div class="datailDataContainer">
						<ul class="listContainer">
							{#each data.details.genres as genre (genre) }
								<li>{genre}</li>
							{/each}
						</ul>						
					</div>
				{/if}

				<div class="datailDataContainer">
					{#if data.details?.keyRoles.writer.length > 0}
						<div class="keyRole">
							<h3>{data.details.keyRoles.writer.length > 1 ? 'Writers' : 'Writer'}</h3>
							<ul class="keyRoleList">
								{#each data.details.keyRoles.writer as item (item.id)}
									<li itemprop="author" itemscope itemtype="https://schema.org/Person">
										<a href={`/people/${item.parentId}`}>
											<span itemprop="name">{item.parentName}</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if data.details?.keyRoles.director.length > 0}
						<div class="keyRole">
							<h3>{data.details.keyRoles.director.length > 1 ? 'Directors' : 'Director'}</h3>
							<ul class="keyRoleList">
								{#each data.details.keyRoles.director as item (item.id)}
									<li itemprop="director" itemscope itemtype="https://schema.org/Person">
										<a href={`/people/${item.parentId}`}>
											<span itemprop="name">{item.parentName}</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if data.details?.keyRoles.producer.length > 0}
						<div class="keyRole">
							<h3>{data.details.keyRoles.producer.length > 1 ? 'Producers' : 'Producer'}</h3>
							<ul class="keyRoleList">
								{#each data.details.keyRoles.producer as item (item.id)}
									<li itemprop="producer" itemscope itemtype="https://schema.org/Person">
										<a href={`/people/${item.parentId}`}>
											<span itemprop="name">{item.parentName}</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if data.details?.keyRoles.cast.length > 0}
						<div class="keyRole">
							<h3>Cast</h3>
							<ul class="keyRoleList">
								{#each data.details.keyRoles.cast as item (item.id)}
									<li itemprop="actor" itemscope itemtype="https://schema.org/Person">
										<a href={`/people/${item.parentId}`}>
											<span itemprop="name">{item.parentName}</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
				<div class="datailDataContainer">
					<h3>Logline</h3>
					<p><span itemprop="description">{data.details.logline}</span></p>
				</div>
				<div class="datailDataContainerFlex">
					<div class="datailDataContainerFlexChild">
						<h3 class="">Year</h3>
						<p><span>{data.details.year}</span></p>
					</div>				
					<div class="datailDataContainerFlexChild">
						<h3 class="">Type</h3>
						<p><span>{data.details.type[0].toUpperCase()+data.details.type.substring(1)}</span></p>
					</div>
					<div class="datailDataContainerFlexChild">
						<h3 class="">Format</h3>
						<p><span>{data.details.format[0].toUpperCase()+data.details.format.substring(1)} Film</span></p>
					</div>
					{#if data.details.countries}
						<div itemprop="countryOfOrigin" itemscope itemtype="https://schema.org/Country" class="datailDataContainerFlexChild">
							<h3 class="">{data.details.countries.length > 1 ? 'Countries' : 'Country'}</h3>
							<p><span itemprop='name'>{data.details.countries.join(', ')}</span></p>
						</div>
					{/if}
					{#if data.details.languages }
						<div class="datailDataContainerFlexChild">
							<h3 class="">{data.details.languages.length > 1 ? 'Languages' : 'Language'}</h3>
							<p><span>{data.details.languages.join(', ')}{data.details.additionalLanguages ? ', '+data.details.additionalLanguages : ''}</span></p>
						</div>
					{/if}
					{#if data.details.releaseDate}
						<div class="datailDataContainerFlexChild">
							<h3 class="">Release Date</h3>
							<p><span>{new Date(data.details.releaseDate).toLocaleDateString('en-za')}</span></p>
						</div>
					{/if}
					{#if data.details.runtime}
						<div class="datailDataContainerFlexChild">
							<h3 class="">Runtime</h3>
							<p><span>{data.details.runtime} minutes</span></p>
						</div>
					{/if}
					{#if data.details.budget}
						<div class="datailDataContainerFlexChild">
							<h3 class="">Budget</h3>
							<p><span>R{parseFloat((+data.details.budget).toFixed(2)).toLocaleString('en-ZA', {style: 'currency', currency: 'ZAR'}).substring(2)}</span></p>
						</div>
					{/if}
					{#if data.details.boxOffice}
						<div class="datailDataContainerFlexChild">
							<h3 class="">Box Office</h3>
							<p><span>{parseFloat((+data.details.boxOffice).toFixed(2)).toLocaleString('en-ZA', {style: 'currency', currency: 'ZAR'}).substring(2)}</span></p>
						</div>
					{/if}
					{#if data.details.productionStage}
						<div class="datailDataContainerFlexChild">
							<h3 class="">Stage</h3>
							<p><span>{data.details.productionStage[0].toUpperCase()+data.details.productionStage.substring(1)}</span></p>
						</div>
					{/if}
					{#if data.details.initialPlatform}
						<div class="datailDataContainerFlexChild">
							<h3 class="">Premiere Platform</h3>
							<p><span>{data.details.initialPlatform}</span></p>
						</div>
					{/if}
				</div>
				{#if data.details.plotSummary}
					<div class="datailDataContainer">
						<h3 class="">Plot Summary</h3>
							<p class="plotSummary"><span>{data.details.plotSummary}</span></p>
					</div>
				{/if}
			</div>
			<DonateCard vertical={true} />
		</section>
		<div class="ad-container">
			<section class="ad-contentMain">
				{#if data.stills.length > 0 || data.user}
					<section id="stills" class="ad-stillsContainer">
						<div class="ad-carousel">
							{#if stillOne || data.user}
								<figure class="ad-stillImage">
									<img 
										src={stillOne?.url ?? '/photos/still.png'} 
										alt={stillOne?.altText ?? 'Placeholder'} 
										placeholder="/photos/still.png"
										height="1080px"
										width="1920px"
										loading="lazy"
									/>
									<SignedIn>
										<a class="button-edit" href={`/films/${data.details.id}/photo/still:0`}>
											<img src="/edit-box-icon.svg" alt="Edit icon" width="100px" height="100px">
										</a>
									</SignedIn>									
									<div class="title-band" style="padding: 0 0.5rem;">
										<p class="title-slim">{stillOne?.credit ? '© '+stillOne.credit  : "Add photo credit"}</p>
									</div>
								</figure>
							{/if}
							{#if stillTwo || data.user}
								<figure class="ad-stillImage">
									<img 
										src={stillTwo?.url ?? '/photos/still.png'} 
										alt={stillTwo?.altText ?? 'Placeholder'} 
										placeholder="/photos/still.png"
										height="1080px"
										width="1920px"
										loading="lazy"
									/>
									<SignedIn>
										<a class="button-edit" href={`/films/${data.details.id}/photo/still:1`}>
											<img src="/edit-box-icon.svg" alt="Edit icon" width="100px" height="100px">
										</a>
									</SignedIn>									
									<div class="title-band" style="padding: 0 0.5rem;">
										<p class="title-slim">{stillTwo?.credit ? '© '+stillTwo.credit  : "Add photo credit"}</p>
									</div>
								</figure>
							{/if}
							{#if stillThree || data.user}
								<figure class="ad-stillImage">
									<img 
										src={stillThree?.url ?? '/photos/still.png'} 
										alt={stillThree?.altText ?? 'Placeholder'} 
										placeholder="/photos/still.png"
										height="1080px"
										width="1920px"
										loading="lazy"
									/>
									<SignedIn>
										<a class="button-edit" href={`/films/${data.details.id}/photo/still:2`}>
											<img src="/edit-box-icon.svg" alt="Edit icon" width="100px" height="100px">
										</a>
									</SignedIn>						
									<div class="title-band" style="padding: 0 0.5rem;">
										<p class="title-slim">{stillThree?.credit ? '© '+stillThree.credit  : "Add photo credit"}</p>
									</div>
								</figure>
							{/if}
						</div>
					</section>
				{/if}
				<section id="cast" class={data.stills.length > 0 || data.user ? '' : 'ad-firstSection' }>
					<div class={data.stills.length > 0 || data.user ? 'ad-titleBand ': 'ad-titleBandFirst'}>
						<h2 class="h3">Cast</h2>
						<SignedIn>
							<a href={`/films/${data.details.id}/role/people?category=cast`} class="button-icon">
								<img 
									src='/add-icon.svg'
									alt='Add icon'
									width="30px"
									height="30px"
								/>
								<span class="hide">Add new role</span>
							</a>
						</SignedIn>
					</div>
					{#if data.cast.length > 0}
						<GridRoles {form} data={data.cast} type="personRole" />
					{:else}
						<EmptyState text='No cast members.' height="20rem" fill="var(--base-color-alt)" />
					{/if}
				</section>
				<section id="crew">
					<div class="ad-titleBand">
						<h2 class="h3">Crew</h2>
						<SignedIn>
							<a href={`/films/${data.details.id}/role/people?category=crew`} class="button-icon">
								<img 
									src='/add-icon.svg'
									alt='Add icon'
									width="30px"
									height="30px"
								/>
								<span class="hide">Add new role</span>
							</a>
						</SignedIn>
					</div>
					{#if data.crew.length > 0}
						<GridRoles data={data.crew} {form} type="personRole" />
					{:else}
						<EmptyState text='No crew members.' height="20rem" fill="var(--base-color-alt)" />
					{/if}
				</section>
				<section id="companies">
					<div class="ad-titleBand">
						<h2 class="h3">Companies</h2>
						<SignedIn>
							<a href={`/films/${data.details.id}/role/companies`} class="button-icon">
								<img 
									src='/add-icon.svg'
									alt='Add icon'
									width="30px"
									height="30px"
								/>
								<span class="hide">Add new role</span>
							</a>
						</SignedIn>
					</div>
					{#if data.companies.length > 0}
						<GridRoles {form} data={data.companies} type="companyRole" />
					{:else}
						<EmptyState text='No cast members' height="20rem" fill="var(--base-color-alt)" />
					{/if}
				</section>
				<SocialCard />
			</section>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 0;
	}

	.container > figure {
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

	.container > figure > img {
		height: 100%;
		width: 100%;
	}

	.container > figure > a {
		position: absolute;
		right: 0;
		top: 0;
		width: 2.5rem;
		height: 2.5rem;
		display: inline-block;
	}

	.container > figure > a > img {
		width: 100%;
		height: 100%;
	}

	.detailsContainer {
		padding: 0 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.datailDataContainer {
		min-width: 100%;
	}

	.datailDataContainer > p {
		font-size: 1rem;
		margin-top: 0.3rem;
	}

	.datailDataContainer > h3 {
		background: transparent;
		width: fit-content;
		padding: 0.3rem 0.5rem 0 0;
		margin-bottom: 0.1rem;
		margin-top: 0;
		border-bottom: 0.2rem solid var(--accent-color);
		font-size: 1.125rem;
		font-weight: 500;
	}

	.datailDataContainerFlex {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 0;
	}

	.datailDataContainerFlexChild {
		margin-right: 1rem;
		flex: 0 1 fit-content;
	}

	.datailDataContainerFlexChild > p {
		font-size: 1rem;
		margin-top: 0.3rem;
	}

	.datailDataContainerFlexChild > h3 {
		background: transparent;
		width: fit-content;
		padding: 0.3rem 0.5rem 0 0;
		margin-bottom: 0.1rem;
		margin-top: 0;
		border-bottom: 0.2rem solid var(--accent-color);
		font-size: 1.125rem;
		font-weight: 500;
	}

	.listContainer {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0;
	}

	.listContainer > li {
		flex: 0 1 fit-content;
		list-style: none;
		font-weight: 600;
		margin-right: 0.5rem;
		margin-top: 0.5rem;
		padding: 0.5rem;
		color: var(--main-color);
		background: var(--base-color-alt);
		text-align: center;
	}

	.titleBand {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 100%;
		padding: 0 0.5rem;
	}

	/* .socialLinks {
		display:  flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		padding: 0.8rem 0.5rem 0.5rem 0.5rem;
	}

	.socialLinks > a {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
	} */

	.plotSummary {
		text-align: justify;
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

	/* .middleContainer {
		padding: 0 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	} */

	.inverseContainer {
		padding: 0 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.keyRole {
		min-width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}

	.keyRole > h3 {
	/*	text-transform: lowercase;*/
		margin: 0.3rem 0 0.1rem 0;
		padding: 0.3rem 0.5rem 0 0;
		border-bottom: 0.2rem solid var(--accent-color);
		font-size: 1.125rem;
		font-weight: 500;
	}

	.keyRoleList {
		list-style: none;
		padding: 0;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 0.2rem 0 0.5rem 0;
	}

	.keyRoleList > li {
		flex: 0 1 fit-content;
		margin: 0.25rem 0.6rem 0.25rem 0;	
	}

	.keyRoleList > li > a {
		padding: 0.2rem 0.5rem;
		border-radius: 1rem;
		background: var(--accent-color-alt);
		color: var(--base-color);
		font-size: 0.9rem;
		display: inline-flex;
		text-align: left;
	}

	.ad-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 0;
		margin-bottom: 0.5rem;
	}

	.ad-stillsContainer {
		/* display: flex;
		flex-direction: column; */
		background: var(--awe-color);
		color: var(--bright);
		min-width: 100%;
	}

	.ad-carousel {
		display: flex;
		overflow-x: auto;
	}

	.ad-stillImage {
		flex: 0 0 100%; /* Initial width, takes up the full width of the container */
		padding: 0;
		margin: 0 0.2rem;
		/* width: 100%; */
		/*border: 1px transparent solid;
		border-radius: 250px;*/
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}

	.ad-stillImage > img {
		height: 100%;
		width: 100%;
	}

	.ad-stillImage > a {
		position: absolute;
		right: 0;
		top: 0;
		width: 2.5rem;
		height: 2.5rem;
	}

	.ad-stillImage > a > img {
		width: 100%;
		height: 100%;
	}


	.ad-contentMain {
		width: 100%;
	}

	/* .ad-contentSecondary {
		width: 100%;
		padding: 0 0.5rem;
		background: var(--base-color-alt);
		margin-top: 0.5rem;
	} */

	.ad-firstSection > div > h2 {
		margin-top: 0;
	}

	.ad-titleBandFirst {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 100%;
		margin: 0rem 0 0.3rem 0;
		padding: 0 0.5rem;
	}

	.ad-titleBandFirst > h2 {
		margin: auto 0;
	}


	.ad-titleBand {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 100%;
		margin: 0.6rem 0 0.3rem 0;
		padding: 0 0.5rem;
	}

	.ad-titleBand > h2 {
		margin: auto 0;
	}

	#cast, #companies, #crew, #stills {
		margin-bottom: 1.5rem;
	}

	@media(min-width: 600px){
		.container {
			max-width: 40%;
			align-items: flex-start;		
		}
		.titleBand {
			padding: 0;
		}

		.detailsContainer {
			padding: 0;
		}

		.ad-container {
			min-width: 59%;
			max-width: 59%;
			align-items: flex-start;
		}
		.ad-titleBand {
			padding: 0;
		}
	}

	@media(min-width: 1000px){
		.container {
			max-width: 30%;
		}

		.ad-stillImage {
			flex: 0 0 80%;
		}

		.ad-container {
			min-width: 69%;
			max-width: 69%;
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-between;
		}
	}

	@media(min-width: 1200px){
		.datailDataContainerFlex > div {
			margin-right: 0.5rem;
		}
	}
</style>