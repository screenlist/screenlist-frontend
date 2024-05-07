<script>
	export let vertical = false
</script>

{#if vertical}
	<section class="mDisplay">
		<div class="mWelcomeCard">
			<div>
				<div class="mAboutLink">
					<figure>
						<img object-fit="contain" src="/photos/g-savings.svg" alt="A sketched graphic a sketched human figure on top of a piggy bank" />
					</figure>
				</div>
			</div>
			<div>
				<div class="mCtaContainer">
					<h2 class="just-bold">Support this project</h2>
					<p>Consider donating to aid the continued development of Screen List.</p>
					<a class="mCtaButton" href="/support" title="Donate">Donate</a>
				</div>
			</div>
		</div>
	</section>
{:else}
	<section class="display">
		<div class="welcomeCard">
			<div class="aboutLink">
				<figure>
					<img object-fit="contain" src="/photos/g-savings.svg" alt="A sketched graphic a sketched human figure on top of a piggy bank" />
				</figure>
			</div>
			<div class="ctaContainer">
				<h2 class="just-bold">Support this project</h2>
				<p>Consider donating to aid the continued development of Screen List.</p>
				<a class="button-good" href="/support"  title="Donate">Donate</a>
			</div>
		</div>
	</section>
{/if}

<style>
	.display {
	/* position: relative; */
	margin-top: 0.5rem 0;
	width: 100%;
	height: 40rem;
	/* aspect-ratio: 10/16; */
	}

	.mDisplay {
	position: relative;
	margin-top: 0.5rem 0;
	width: 100%;
	aspect-ratio: 10/16;
	}

	.welcomeCard {
		/* position: absolute; */
		overflow: hidden;
		/* left: 0;
		top: 0;
		bottom: 0;
		right: 0; */
		width: 100%;
		height: 100%;
		/* z-index: 2; */
		background: transparent;
		padding: 1.5rem;
		font-size: 1.2rem;
		color: var(--brand-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.mWelcomeCard {
		position: absolute;
		overflow: hidden;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		z-index: 2;
		background: transparent;
		padding: 1.5rem;
		font-size: 1.2rem;
		color: var(--brand-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.welcomeCard > div {
		width: 100%;
		height: 49%;
	}

	.mWelcomeCard > div {
		width: 100%;
		height: 49%;
	}

	.aboutLink {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 100%;
		max-height: 100%;
	}

	.mAboutLink {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 100%;
		max-height: 100%;
	}

	.aboutLink > figure {
		padding: 0;
		margin: 0;
		width: 100%;
		aspect-ratio: 1/1;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.aboutLink > figure > img {
		width: 100%;
		height: 100%;
	}

	.mAboutLink > figure {
		padding: 0;
		margin: 0;
		width: 100%;
		aspect-ratio: 1/1;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.mAboutLink > figure > img {
		width: 100%;
		height: 100%;
	}

	/* .aboutLink > span > img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.mAboutLink > span > img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	} */

	.ctaContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.mCtaContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.ctaContainer > h2 {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.mCtaContainer > h2 {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.ctaContainer > p {
		margin-top: 0.5rem;
		text-align: center;
		font-size: 0.8rem;
	}

	.mCtaContainer > p {
		margin-top: 0.5rem;
		text-align: center;
		font-size: 0.8rem;
	}

	/* .ctaButton {
		background: var(--brand-color);
		color: var(--base-color);
		width: fit-content;
		font-size: 1rem;
		font-weight: bold;
		padding: 0.3rem 0.7rem;
	} */

	.mCtaButton {
		background: var(--brand-color);
		color: var(--base-color);
		width: fit-content;
		font-size: 1rem;
		font-weight: bold;
		padding: 0.3rem 0.7rem;
	}

	@media(min-width: 600px){
		.welcomeCard {
			padding: 1.8rem;
			flex-direction: row;
			justify-content: center;
		}
		.welcomeCard > div {
			height: 100%;
			width: 49%;
			max-width: 400px;
			margin: 0 1rem;
		}
		.display {
			height: 15rem;
		}
		.ctaContainer {
			align-items: flex-start;
		}
		.ctaContainer > h2 {
			text-align: left;
		}
		.ctaContainer > p {
			text-align: left;
		}
	}

	@media(min-width: 1000px){
		.welcomeCard {
			padding: 1rem 40px 1rem 1rem;
		}
		/* .mCtaContainer > p {
			display: none;
		}
		.mDisplay {
			aspect-ratio: 9/22;
		} */
	}

	@media(min-width: 1200px){
		/* .display {
			aspect-ratio: 16/3;
		} */
		.mCtaContainer > p {
			display: block;
		}
	}
</style>