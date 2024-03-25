<script>
	import { PUBLIC_HOST_URL } from '$env/static/public'
	export let data
	console.log(data)
	const ratingColor = (factor) => {
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
		<section id="details">

		</section>
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

	.container > figure > button {
		position: absolute;
		right: 0;
		top: 0;
		width: 2.5rem;
		height: 2.5rem;
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
		color: var(--main-color);
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
		color: var(--main-color);
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

	.socialLinks {
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
	}

	.plotSummary {
		text-align: justify;
	}

	.moderationStatus {
		padding: 0.3rem 0.6rem;
		background: var(--accent-color);
		color: var(--base-color);
		border: 0.1rem solid transparent;
		border-radius: 0.6rem;
		font-weight: 600;
		font-size: 0.8rem;
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
	}

	@media(min-width: 1000px){
		.container {
			max-width: 30%;
		}
	}

	@media(min-width: 1200px){
		.datailDataContainerFlex > div {
			margin-right: 0.5rem;
		}
	}
</style>