<section class="display">
	<div class="welcomeCard">
		<h1>South African films, actors & filmmakers in one place.</h1>
	</div>
</section>

<style>
	.display {
		margin-top: 0.5rem 0;
		width: 100%;
		background-color: var(--brand-color);
	}

	.welcomeCard {
		overflow: hidden;
		width: 100%;
		height: 100%;
		background: transparent;
		padding: 5rem 0.5rem 0.5rem 1.5rem;
		font-size: 1.2rem;
		color: var(--brand-color);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
	}

	.welcomeCard > h1 {
		color: var(--base-color);
		font-size: 1.4rem;
		font-weight: 500;
		text-transform: lowercase;
		text-align: right;
		margin: 0;
		padding: 0;
		max-width: 400px;
	}

	/*.welcomeCard > h1 > span {
		display: inline-block;
		background-color: var(--base-color);
		padding: 0.5rem;
		border-radius: 1.8rem;
	}*/

	@media(min-width: 600px){
		/* .welcomeCard {
			padding: 0.5rem 1.8rem;
			flex-direction: row;
			justify-content: flex-start;
		} */
		/* .display {
			border-bottom: 0.15rem solid var(--brand-color);
			border-left: 0.15rem solid var(--brand-color);
			border-right: 0.15rem solid var(--brand-color);
		} */
		.welcomeCard > h1 {
			font-size: 1.6rem;
		}
	}

	@media(min-width: 1000px){
		/* .welcomeCard {
			padding: 1rem 2.5rem;
		} */
		/*
		.welcomeCard > h1 {
			max-width: 100%;
			writing-mode: vertical-rl;
			text-orientation: mixed;
			transform: rotate(180deg);
		}*/
	}

	@media(min-width: 1200px){		
		.welcomeCard > h1 {
			font-size: 1.8rem;
	/*		max-width: 0px;*/
		}
	}
</style>