<script>
	import { page, navigating } from '$app/stores'
	export let data;
</script>

<svelte:head>
	<script async src="/clarity.js"></script>
	<script defer src="https://analytics.makamuta.com/script.js" data-website-id="3c5bfe63-3e74-42d8-9247-0b42fe2775cd"></script>
</svelte:head>

<div class="layout">
	<div 
		class="progress-bar {$navigating ? 'loading' : ''}"
		role="progressbar"
    aria-valuenow={$navigating ? 50 : 100}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Page loading progress"
	></div>
	<header class="clearence">
		<nav class="navContainer">
			<ul class="list">
				<li>
					<div class="logo">
						<a title="Home" href="/">
							<img src="/sl-minimal-logo-dark.svg" alt="logo" width="85px" height="53px" />
						</a>
					</div>
				</li>
				<li>
					<ul class="list nestedList">
						<li>
							<div>
								<a class="mainNavLink" href="/search" title="Search">
									<img src="/search-icon.svg" alt="Search icon" width="28" height="28" />
								</a>
							</div>
						</li>
						<li>
							<div class="mainNavLink">
								<a href="/contribute" title="Contribute">
									<img src="/contribute-icon.svg" alt="Contribute icon" width="28px" height="28px" />
								</a>
							</div>
						</li>
						<li>
							<div>
								{#if data?.user}
									<div class="accountContainer">
										<a href={`/users/${data.user.username}`} class="profileButton">
											<img 
												src={data.user.photoUrl? data.user.photoUrl : '/photos/picture.png'} 
												alt="User profile"
												width="30px"
												height="30px"
											/>
										</a>
									</div>
								{:else}
									<a href="/sign-in" class="mainNavLink" >
										<img 
											src="/user-profile-icon.svg"
											alt="user profile icon"
											width="28px"
											height="28px"
										/>
									</a>
								{/if}
							</div>						
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<nav class={$page.url.pathname === '/search' ? 'hide' : 'secondNavContainer'}>
			<ul class="secondNavList">
				<li>
					<a href="/films" class="navLink">Films</a>
				</li>
				<li>
					<a href="/people" class="navLink">People</a>
				</li>
				<li>
					<a href="/companies" class="navLink">Companies</a>
				</li>
			</ul>
		</nav>
	</header>

	<main>
		<slot />
	</main>

	<footer class="container">
		<div class="brand">
			<figure>
				<img src="/sl-minimal-logo-light.svg" alt="logo" width="100px" height="68px" />
			</figure>
			<h2 class="h3">Screen List</h2>
		</div>
		<nav class="nav">
			<ul>
				<li>
					<a href="/sign-up">Sign Up</a>
				</li>
				<li>
					<a href="/support">Support</a>
				</li>
				<li>
					<a href="/contribute">Contribute</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
			</ul>
		</nav>
		<div class="copy">
			<p>Made with lots of ❤ by <a href="https://alexkokobane.com" class="underline" title="Alex Kokobane" target="_blank" rel="noreferrer">Alex Kokobane</a></p>
			<p class="copyright">&copy; {new Date().getFullYear()}, Makamuta. All rights resevered.</p>
		</div>
	</footer>
</div>

<style>
	.navContainer {
		padding: 1rem 0.5rem;
		margin: 0;
	}

	.clearence {
		margin: 0 0 0.5rem 0;
	}

	.list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		margin: 0;
	}

	.nestedList {
		width: 50vw;
		max-width: 250px;
	}

	.list > li {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.logo {
		padding: 0;
		width: 100%;
	}

	.logo > a {
		padding: 0;
		margin: 0;
		height: 100%;
		width: 100%;
	}

	.navLink {
		display: inline-block;
		padding: 0.15rem 0.4rem 0.15rem 0.4rem;
		background: var(--brand-color);
		color: var(--base-color);
		font-weight: 600;
		font-size: 0.8rem;
		border-bottom: 0.3rem var(--awe-color) solid;
		text-align: center;
	}

	.navLink:hover {
		border-bottom: 0.3rem var(--awe-color-alt) solid;
	}

	.mainNavLink {
		display: inline-block;
	}

	.secondNavContainer {
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.secondNavList {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		/*align-items: center;*/
		padding: 0;
		margin: 0;
		width: 100vw;
		max-width: 600px;
	}

	.secondNavList > li {
		flex: 0 1 inherit;
		margin: 0.5rem 0 0 0;
		list-style: none;
		padding: 0;
	}

	.accountContainer {
		position: relative;
	}

	.profileButton {
		border: none;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 50%;
		padding: 0;
		overflow: hidden;
	}

	.profileButton > :nth-child(n) {
		width: 100%;
		border: 1px solid transparent;
		border-radius: 50%;
	}

	/* Footer styles */
		.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto 0 0 0;
		width: 100%;
	}

	.brand {
		min-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		background: var(--brand-color);
		color: var(--base-color);
	}

	.brand > figure {
		padding: 0;
		margin: 0;
		width: 100px;
		height: 68px;
	}

	.brand > h2 {
		margin: 0;
		padding: 0;
		font-size: 1.6rem;
	}

	.nav {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-width: 100%;
		background: var(--brand-color);
		color: var(--base-color);
		padding: 2rem;
		margin: 0;
	}

	.nav > ul {
		list-style: none;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-flow: row;
		grid-gap: 1rem;
		padding: 0;
		margin: 0;
		max-width: 500px;
	}

	.nav > ul > li {
		margin: 0;
		padding: 0.5rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.copy {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-width: 100%;
		padding: 0.5rem;
		background: var(--accent-color-alt);
		color: var(--base-color);
	}

	.copyright {
		font-size: 0.8rem;
		color: var(--base-color-alt);
	}

	.underline { 
		text-decoration: underline;
	}

	/* Loading Bar Styles */
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 0.2rem;
		background-color: var(--awe-color-alt); /* Customize the color */
		visibility: hidden;
		transition: visibility 1.5s, opacity 2s linear;
		z-index: 10;
	}
	.loading {
		visibility: visible;
		opacity: 1;
	}

	@media(min-width: 600px){
		.navContainer {
			padding: 1rem 0 1rem 0;
		}
	}

	@media(min-width: 1000px){}

	@media(min-width: 1200px){
		.navLink {
			font-size: 0.8rem;
		}
	}
</style>