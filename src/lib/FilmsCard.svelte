<script>
  import EmptyState from "./EmptyState.svelte";
	import DonateCard from "./DonateCard.svelte";

	export let heading = ''
	export let viewMorePath = ''
	export let films = []
	export let loadFirst = false

	const firstGroupFilms = films.slice(0, 30)
	const lastGroupFilms = films.slice(30)
</script>

<section class="section">
	{#if viewMorePath.length > 0}
		<div class="title-band heading uni-pad">
			<h2>{heading}</h2>
			<a class="button-regular" href="{viewMorePath}">View More</a>
		</div>
	{:else}
		<h2 class="title-band heading">{heading}</h2>
	{/if}
	<div class={films.length > 0 ? "viewContainer" : ""}>
		{#if films.length > 0}
			{#each firstGroupFilms as film (film.id) }
				<article class="outerShell">
					<a class="innerShell" title={film.name} href={`/films/${film.id}`}>
						<div class="container">
							<figure>
								<img fetchpriority={loadFirst ? 'high' : 'auto'} loading={loadFirst ? 'eager' : 'lazy'} src={film.posterUrl ? film.posterUrl : '/photos/poster.avif'} alt={film.posterUrl ? `${film.name} film poster` : 'Poster placeholder'} width="200px" height="300px" />
							</figure>
							<div class="info">
								<p class="yearText">{film.year}</p>
								<h3 class="specialHeading titleText" >{film.name}</h3>
							</div>
						</div>
					</a>
				</article>
			{/each}
		{:else}
			<EmptyState 
				text="Nothing to see here, yet." 
				height="40vh"
				fill="var(--base-color-alt)"
			/>
		{/if}
	</div>

	{#if lastGroupFilms.length > 0}
		<DonateCard vertical={false} />
		<div class="viewContainer">
		{#each lastGroupFilms as film (film.id) }
			<article class="outerShell">
				<a class="innerShell" title={film.name} href={`/films/${film.id}`}>
					<div class="container">
						<figure>
							<img src={film.posterUrl ? film.posterUrl : '/photos/poster.avif'} alt={film.posterUrl ? `${film.name} film poster` : 'Poster placeholder'} width="200px" height="300px" />
						</figure>
						<div class="info">
							<p class="yearText">{film.year}</p>
							<h3 class="specialHeading titleText" >{film.name}</h3>
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

	.heading {
		margin: 0 0 0.3rem 0;
		color: var(--brand-color);
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
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-auto-flow: row;
		grid-gap: 0.5rem;
	}

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
		margin: 2rem 0;
		min-height: 10rem;
	}

	.section > h2 {
		margin: 1.4rem 0 0.5rem 0;
	}

	.titleText {
		word-wrap: break-word;
		overflow: hidden;
		display: inline-block;
	}

	.specialHeading {
		font-size: 1.2rem;
		font-weight: 500;
		margin: 0.8rem 0 0.2rem 0;
	}

	.yearText {
		background: var(--good-color);
		color: var(--base-color);
		font-weight: 500;
		font-size: 0.8rem;
		margin: 0;
		height: 3rem;
		width: 3rem;
		display: grid;
		place-items: center;
		border-radius: 3rem;
		padding: 0.5rem;
	}

	@media(min-width: 600px){
		.viewContainer {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	@media(min-width: 1000px){
		.viewContainer {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
		.specialHeading {
			font-size: 0.8rem;
		}
		.yearText {
			font-size: 0.6rem;
			height: 2rem;
			width: 2rem;
			border-radius: 2rem;
			padding: 0.2rem;
		}
	}

	@media(min-width: 1200px){
		.viewContainer {
			grid-template-columns: repeat(10, minmax(0, 1fr));
		}
	}
</style>