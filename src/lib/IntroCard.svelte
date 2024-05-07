<section class="display">
	<figure>
		<img 
			src='/photos/catchingfeelingsstill.webp'
			alt={`A still image from the film, Catching Feelings (2017)`}
			width="1920px"
			height="1080px"
			loading="lazy"
		/>
	</figure>
	<div class="displayOverlay"></div>
	<div class="welcomeCard">
		<div>
			<div class="ctaContainer">
				<p>Join us at the frontier of South African cultural presevation, we promise it&apos;s fun.</p>
				<a href="/sign-up" class="ctaButton" title='Create an account'>Create an account</a>
			</div>
		</div>
		<div>
			<a href='/about' class="aboutLink" title='About Screen List'>
				<figure>
					<img 
						src='/photos/sl-socials.png'
						alt={`An encircled logo of Screen List`}
						loading="lazy"
					/>
				</figure>
			</a>
		</div>
	</div>
</section>

<style>
	.display {
		position: relative;
		margin-top: 0.5rem 0;
		width: 100%;
	}

	.display > figure {
		padding: 0;
		margin: 0;
		width: 100%;
		aspect-ratio: 13/16;
		/*border: 1px transparent solid;
		border-radius: 250px;*/
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.display > figure > img {
		object-fit: cover;
		height: 100%;
		width: 100%;
		filter: contrast(100%) brightness(100%) hue-rotate(0deg) saturate(70%);
	}

	.displayOverlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--brand-color);
		opacity: 0.5; /* Adjust the opacity value to your preference */
		z-index: 1;
	}

	.welcomeCard {
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
		color: var(--base-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.welcomeCard > div {
		width: 100%;
		height: 49%;
	}

	.aboutLink {
		/*display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		max-width: 100%;
		max-height: 100%;*/

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
		/*border: 1px transparent solid;
		border-radius: 250px;*/
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;

		/*padding: 0;
		margin: 0;
		width: 100%;
		aspect-ratio: 1/1;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;*/
	}

	.aboutLink > figure > img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.ctaContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.ctaContainer > p {
		text-align: center;
	}

	.ctaButton {
		background: var(--base-color);
		color: var(--brand-color);
		width: fit-content;
		font-size: 1.125rem;
		font-weight: bold;
		padding: 0.5rem 1rem;
	/*	border: 0.1rem var(--base-color) solid;*/
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
		.display > figure {
			aspect-ratio: 16/6;
		}
		.ctaContainer {
			align-items: flex-start;
		}
		.ctaContainer > p {
			text-align: left;
		}
	}

	@media(min-width: 1000px){
		.welcomeCard {
			padding: 1rem 40px 1rem 1rem;
		}
	}

	@media(min-width: 1200px){
		.display > figure {
			aspect-ratio: 16/3;
		}
	}
</style>