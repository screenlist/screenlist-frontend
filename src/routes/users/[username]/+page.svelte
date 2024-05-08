<script>
	import EmptyState from '$lib/EmptyState.svelte'
	import { PUBLIC_HOST_URL } from '$env/static/public'
    import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	export let data

	const bytes = []

	data.films.forEach((val) => { val.xxType = 'films'; bytes.push(val) })
	data.companies.forEach((val) => { val.xxType = 'companies'; bytes.push(val) })
	data.people.forEach((val) => { val.xxType = 'people'; bytes.push(val) })

	bytes.sort((a, b) => {
		if(a.lastUpdated > b.lastUpdated) {
			return -1
		} else {
			return 0
		}
	})
</script>

<svelte:head>
	<title>{'@'+data.details.username} - Screen List profile</title>
	<meta name="description" content={data.details.bio} />

	<meta property="og:title" content={`@${data.details.username} - Screen List profile`} />
	<meta property="og:description" content={data.details.bio} />
	<meta property="og:image" content={data.details.photo?.url} />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/users/${data.details.username}`} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<div class="pageContainer">
	<div class="topBand">
		<h1 class="headingOne">{`@${data.details.username}`}</h1>
		<SignedIn>
			{#if data?.user?.role === 'admin'}
				<a href="/dashboard/moderation/films" class="button-regular">Moderation</a>
			{/if}
		</SignedIn>
	</div>
	<div class="coreAndSettings">
		<section class="container">
			<div class="cover">
				<figure>
					<img src="/photos/screenlist-hero-blocks-st.png" alt="Cover" loading="lazy" />
				</figure>
				<div class="profileImage">
					<figure>
						<img src={data.details.photoUrl ?? '/photos/picture.png'} alt={data.details.photoUrl ? data.details.fullName : 'Placeholder'} loading="lazy" width="720px" height="720px" />
					</figure>
				</div>
			</div>
			<div class="coreInfoContainer">
				<div class="infoBand">
					<div class="nameAndRoleContainer">
						{#if data.details.fullName && data.details.role === 'journalist' }
							<h3 class="username">{data.details.fullName}</h3>
						{/if}
						<p class="role">{data.details.role}</p>
						{#if data.details.role === 'journalist' && data.details.publication }
							<div class="pubContainer">
								<span>{data.details.publication}</span>
							</div>
						{/if}
						<div class="repContainer">
							<span class="rep">{data.details.reputation+" Reps"}</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
	<section class="section-grid">
		<div class="uni-pad">
			<h2 class="h3">Select contributions</h2>
		</div>
		<div class={bytes.length > 0 ? 'viewContainer-grid' : ''} >
			{#if bytes.length > 0}
				{#each bytes as item (item)}
					{#if item.xxType === 'films'}
						<div class="outerShell-grid" key={item.id}>
							<a href={`/films/${item.id}`} class="innerShell-grid"  title={item.name}>
								<div class="container-grid">
									<div class="info-grid">												
										<h3 class="specialHeading-grid titleText-grid">
											{item.name} {`(${item.year})`}
										</h3>
										<span class="specialText titleText-grid" >{`${item.format[0].toUpperCase()+item.format.substring(1)} Film`}</span>
									</div>
								</div>
							</a>
						</div>
					{:else if item.xxType === 'companies'}
						<div class="outerShell-grid" key={item.id}>
							<a href={`/companies/${item.id}`} class="innerShell-grid"  title={item.name}>
								<div class="container-grid">
									<div class="info-grid">
										<h3 class="specialHeading-grid titleText-grid">
											{item.name}
										</h3>
										<span class="specialText titleText-grid" >Company</span>
									</div>
								</div>
							</a>
						</div>
					{:else if item.xxType === 'people'}
						<div class="outerShell-grid" key={item.id}>
							<a href={`/people/${item.id}`} class="innerShell-grid"  title={item.name}>
								<div class="container-grid">
									<div class="info-grid">
										<h3 class="specialHeading-grid titleText-grid">
											{item.name}
										</h3>
										<span class="specialText titleText-grid">{item.occupation}</span>
									</div>
								</div>
							</a>
						</div>
					{/if}
				{/each}
			{:else}
				<EmptyState text="Nothing contributed, yet." height="20rem" fill="var(--base-color-alt)" />
			{/if}
		</div>
	</section>
</div>

<style>
	/* Profile page */
	.pageContainer {
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.topBand {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0.5rem;
		min-width: 100%;
	}

	.coreAndSettings {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		min-width: 100%;
	}

	.headingOne {
		margin: 1.2rem 0 0.25rem 0;
	}

	/* Profile core */
	/* .bioContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		background: var(--base-color);
		padding: 1rem;
		margin-bottom: 0.5rem;
		width: 100%;
		max-width: 450px;
	} */

	/* .bioContainer > p {
		margin: 0;
		font-size: 1.2rem;
	} */

	/* .bioContainer > h3 {
		margin-bottom: 0.2rem;
	} */

	.container {
		display: flex;
		flex-direction: column;
		padding: 0 0 0.5rem 0;
		position: relative;
	}

	.infoBand {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding: 0.5rem;
	}

	.coreInfoContainer {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		/* padding: 0.5rem; */
	}

	.profileImage {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding: 0;
		position: absolute;
		background: transparent;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		margin: 10% 0 0 0;
	}

	.profileImage > figure {
		padding: 0;
		margin: 0;
		width: 100%;
		max-width: 450px;
		border: 0.1rem solid var(--awe-color-alt);
		border-radius: 50%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.profileImage > figure > img {
		width: 100%;
		height: 100%;
	}

	/* .profileImage > figure > button {
		position: absolute;
		right: 125;
		bottom: 0;
		width: 2.5rem;
		height: 2.5rem;
	} */

	.nameAndRoleContainer {
		padding: 1rem;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--base-color);
		width: 100%;
		max-width: 450px;
	}

	.username {
		padding: 0 0 0.5rem 0;
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.role {
		padding: 0.2rem 0.3rem;
		margin: 0;
		color: var(--base-color);
		background: var(--awe-color);
		font-weight: 600;
		font-size: 0.8rem;
		border: 1px transparent solid;
		border-radius: 0.4rem;
	}

	.cover {
		position: relative;
	}

	.cover > figure {
		padding: 0;
		margin: 0;
		width: 100%;
		aspect-ratio: 9/16;
		/*border: 1px transparent solid;
		border-radius: 250px;*/
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.cover > figure > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* .cover > figure > button {
		position: absolute;
		right: 0;
		top: 0;
		width: 2.5rem;
		height: 2.5rem;
	} */

	/* .bgCover {
		filter: grayscale(100%);
		opacity: 0.6;
	} */

	/* .buttonsContainer {
		display: flex;
		flex-direction: column;
		width: 100%;
	} */

	/* .buttonsContainer > :nth-child(n) {
		width: 100%;
		margin-bottom: 0.5rem;
	} */

	/* .buttonsContainer > a:nth-child(n) {
		text-align: center;
	} */

	/* .dot {
		display: none;
	} */

	.pubContainer {
		margin: 0.3rem 0;
	}

	.repContainer {
		margin: 0.4rem 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.rep {
		font-size: 1.1rem;
		font-weight: 600;
	}

	/* Profile grid */
	.container-grid {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		min-height: 100%;
		background: var(--accent-color-alt);
		color: var(--base-color);
		padding: 0;
		margin: 0;
	}

	/* .container-grid > figure {
		padding: 0;
		margin: 0;
		width: 100%;
		border: 1px transparent solid;
		border-radius: 250px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	} */

	/* .container-grid > h3 {
		text-align: left;
		margin-top: 0.8rem 0 0 0;
	} */

	.info-grid {
		padding: 0.5rem;
		height: auto;
	}

	/* .info-grid > p {
		margin: 0.3rem 0;
	} */

	.viewContainer-grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		grid-auto-flow: row;
		grid-gap: 0.2rem;
	}

	/* .viewContainer > div {
		flex: 1 1 150px;
		margin: 0.5rem 0 0 0;
	} */

	/* .pageContainer-grid {
		padding: 1rem 0.5rem;
	} */

	/* .headingBand-grid {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 100%;
	} */

	.innerShell-grid {
		min-width: 100%;
		min-height: 100%;
		height: 100%;
		width: 100%;
	}

	.outerShell-grid {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 0;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}

	.section-grid {
		margin: 1rem 0;
		min-height: 10rem;
		min-width: 100%;
	}

	/* .section-grid > h2 {
		margin: 1.4rem 0 0.5rem 0;
	} */

	.titleText-grid {
		word-wrap: break-word;
		overflow: hidden;
		display: inline-block;
	}

	.specialHeading-grid {
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0.3rem 0.5rem 0.2rem 0;
	}

	/* .specialText-grid {
		font-size: 0.8rem;
		font-weight: 500;
		margin: 0.3rem 0 0.2rem 0;
	} */

	@media(min-width: 600px){
		/*.coreAndSettings {
			flex-direction: row;
			align-items: flex-start;
		}*/
		.topBand {
			padding: 0.5rem 0 0 0;
		}

		/* Profile core */
		/* .dot {
			display: block;
			padding: 0 1rem;
			font-size: 0.8rem;
		} */
		.coreInfoContainer {
			align-items: flex-start;
			/* margin-left: 5%; */
			width: 100%;
		}
		.infoBand {
			width: 100%;
			padding: 1rem 0 0.5rem 0;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
		}
		.nameAndRoleContainer {
	/*		align-items: flex-start;*/
			padding: 0 0.5rem 0.5rem 0;
			width: 30%;
			align-items: flex-start;
		}
		/* .bioContainer {
			align-items: flex-start;
			padding-right: 0.5rem;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			text-align: left;
			padding: 0 0.5rem;
			width: 50%;
			font-size: 1rem;
		} */
		/* .bioContainer > div > p {
			margin: 0;
		} */
		.repContainer {
			width: fit-content;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
		}
		.pubContainer {
			width: fit-content;
			display: inline-flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			margin: 0.3rem 0;
			font-weight: 500;
			font-size: 0.8rem;
		}
		/* .buttonsContainer {
			width: 30%;
			padding-left: 0.5rem;
			align-items: flex-end;
		} */
		.profileImage {
			align-items: flex-start;
			/* padding-left: 2%; */
			right: unset;
			margin: 0;
			max-width: 25vw;
		}
		.profileImage > figure {
			max-width: 25vw;
		}
		.cover > figure {
			aspect-ratio: 16/7;
		}
		/* Profile grid */
		.viewContainer-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		/* .pageContainer-grid {
			padding: 1rem 0;
		} */
	}

	@media(min-width: 1000px){
		.cover > figure {
			aspect-ratio: 16/6;
		}
		.coreInfoContainer {
			/* margin-left: 10%; */
			width: 100%;
		}
		/* .profileImage {
			padding-left: 10%;
		} */
		/* .bioContainer {
			width: 30vw;
		}
		.nameAndRoleContainer {
			max-width: 30vw;
		} */
		.profileImage > figure {
			max-width: 25vw;
		}

		/* Profile grid */
		.viewContainer-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.specialHeading-grid {
			font-size: 0.8rem;
		}
		/* .yearText-grid {
			font-size: 0.6rem;
			height: 2rem;
			width: 2rem;
			border-radius: 2rem;
			padding: 0.2rem;
		} */
	}

	@media(min-width: 1200px){
		.coreInfoContainer {
			width: 100%;
		}
		.cover > figure {
			aspect-ratio: 16/5;
		}
		/* .bioContainer {
			width: 25vw;
		}
		.nameAndRoleContainer {
			width: 25vw;
		} */
		.profileImage > figure {
			max-width: 20vw;
		}
	}
</style>