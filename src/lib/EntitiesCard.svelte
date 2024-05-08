<script>
  import EmptyState from "./EmptyState.svelte";
	import DonateCard from "./DonateCard.svelte";

	export let heading = ''
	export let viewMorePath = ''
	export let itemsPathPrefix
	export let data = []

	const firstGroupData = data.slice(0, 30)
	const lastGroupData = data.slice(30)
</script>

<section class="section">
	{#if viewMorePath.length > 0}
		<div class="title-band heading">
			<h2 class="uni-pad">{heading}</h2>
			<a href="{viewMorePath}">View more</a>
		</div>
	{:else}
		<h2 class="title-band heading">{heading}</h2>
	{/if}
	<div class={data.length > 0 ? "viewContainer" : ""}>
		{#if data.length > 0}
			{#each firstGroupData as data (data.id) }
				<article class="outerShell">
					<a class="innerShell" title={data.name} href={`/${itemsPathPrefix}/${data.id}`}>
						<div class="container">
							<figure>
								<img loading="lazy" placeholder="/photos/picture.png" src={data.photo?.url ? data.photo?.url : '/photos/picture.png'} alt={data.photo?.url ? `${data.name}` : 'Placeholder'} width="500px" height="500px" />
							</figure>
							<div class="info">
								<h3 class="specialHeading titleText" >{data.name}</h3>
							</div>
						</div>
					</a>
				</article>
			{/each}
		{:else}
			<EmptyState 
				text="Nothing to see here, yet." 
				height="70vh"
				fill="var(--base-color-alt)"
			/>
		{/if}
	</div>

	{#if lastGroupData.length > 0}
		<DonateCard vertical={false} />
		<div class="viewContainer">
		{#each lastGroupData as data (data.id) }
			<article class="outerShell">
				<a class="innerShell" title={data.name} href={`/${itemsPathPrefix}/${data.id}`}>
					<div class="container">
						<figure>
							<img src={data.photo?.url ? data.photo?.url : '/photos/picture.png'} alt={data.photo?.url ? `${data.name}` : 'Placeholder'} width="500px" height="500px" />
						</figure>
						<div class="info">
							<h3 class="specialHeading titleText" >{data.name}</h3>
						</div>
					</div>
				</a>
			</article>
		{/each}
		</div>
	{/if}
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		min-height: 100%;
		background: var(--base-color-alt);
		padding: 0;
		margin: 0;
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
		width: 100%;
		height: 100%;
	}

	/* .container > h3 {
		text-align: left;
		margin-top: 0.8rem 0 0 0;
	} */

	.heading {
		margin: 0 0 0.3rem 0;
	}

	.heading > h2 {
		margin: 0;
	}

	.info {
		padding: 0.5rem;
		height: auto;
	}

	.viewContainer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-flow: row;
		grid-gap: 0.5rem;
	}

	/* .viewContainer > div {
		flex: 1 1 150px;
		margin: 0.5rem 0 0 0;
	} */

	/* .pageContainer {
		padding: 1rem 0.5rem;
	}

	.headingBand {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		min-width: 100%;
	} */

	.innerShell {
		min-width: 100%;
		min-height: 100%;
		height: 100%;
		width: 100%;
	}

	.outerShell {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 0;
		flex-direction: row;
		justify-content: space-between;
		align-items: stretch;
	}

	.section {
		margin: 1rem 0;
		min-height: 10rem;
	}

	.section > h2 {
		margin: 1.4rem 0 0.5rem 0;
	}

	.titleText {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100px;
		display: inline-block;
	}

	.specialHeading {
		font-size: 1.2rem;
		font-weight: 500;
		margin: 0.8rem 0 0.2rem 0;
	}

	@media(min-width: 600px){
		.viewContainer {
			grid-template-columns: repeat(4, 1fr);
		}
		/* .pageContainer {
			padding: 1rem 0;
		} */
	}

	@media(min-width: 1000px){
		.viewContainer {
			grid-template-columns: repeat(6, 1fr);
		}
		.specialHeading {
			font-size: 0.8rem;
		}
	}

	@media(min-width: 1200px){
		.viewContainer {
			grid-template-columns: repeat(10, 1fr);
		}
	}
</style>