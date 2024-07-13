<script>
	import { page, navigating } from '$app/stores'
  import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte'
  // import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte'
	export let data;
</script>

<svelte:head>
	<script async src="/clarity.js"></script>
	<script async defer src="https://analytics.makamuta.com/script.js" data-website-id="e702e8bd-2b1b-4cf8-b449-60807c54fe7c"></script>
	<link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"></noscript>
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
						{#if $page.url.pathname !== '/search'}
							<li>
								<div>
									<a class="mainNavLink button-icon" href="/search" title="Search">
										<img src="/search-icon.svg" alt="Search icon" width="28" height="28" />
									</a>
								</div>
							</li>
						{/if}						
						<li>
							<div class="mainNavLink">
								<a class="button-icon" href="/content/contributions" title="Contribute">
									<img src="/add-icon.svg" alt="Contribute icon" width="28px" height="28px" />
								</a>
							</div>
						</li>
						<li>
							<div>
								{#if data?.user && $page.url.pathname !== `/users/${data?.user?.username}`}
									<div class="accountContainer">
										<a href={`/users/${data.user.username}`} class="profileButton">
											<img 
												src={data.user.photoUrl? data.user.photoUrl : '/photos/picture.png'} 
												alt="User profile"
												width="28px"
												height="28px"
											/>
										</a>
									</div>
								{:else if data?.user && $page.url.pathname === `/users/${data?.user?.username}`}
									<UserButton afterSignOutUrl={encodeURIComponent($page.url.pathname)} />
								{:else}
									<a href={`/sign-in?redirect_url=${encodeURIComponent($page.url.pathname)}`} class="mainNavLink" >
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
						{#if $page.url.pathname !== `/users/${data?.user?.username}`}
							<SignedIn>
								<li>
									<SignOutButton signOutCallback={() => {location.reload()}} class="button-icon">
										<img src="/logout-icon.svg" alt="Logout icon" width="28px" height="28px" />
									</SignOutButton>								
								</li>
							</SignedIn>
						{/if}						
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
		{#if data?.quota?.usage >= 0 && data?.user && data?.user?.role === 'member'}
			<SignedIn>
				<a href="/quota" class="quota">
					<span>{`${data.quota.usage}%`}</span>
				</a>
			</SignedIn>
		{/if}
	</header>

	<main>
		<slot />
	</main>

	<footer class="container">
		<div class="brand">
			<figure>
				<img src="/sl-word-logo-light.svg" loading="lazy" alt="logo" width="234px" height="45px" />
			</figure>
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
					<a href="/content/contributions">Contribute</a>
				</li>
				<li>
					<a href="/content/about">About</a>
				</li>
			</ul>
		</nav>
		<div class="copy">
			<p>Made with lots of ❤ by <a href="https://alexkokobane.com" class="underline" title="Alex Kokobane" target="_blank" rel="noreferrer">Alex Kokobane</a></p>
			<p class="copyright">&copy; Makamuta (Pty) Ltd. All rights resevered.</p>
		</div>
	</footer>
</div>

<style>
	.quota {
		position: fixed;
		bottom: 2rem;
		left: 0.5rem;
		height: 45px;
		width: 45px;
		border-radius: 45px;
		background: var(--base-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 0.15rem solid var(--base-color-alt);
		z-index: 10;
	}

	.quota > span {
		/* margin: 0 0 2rem 0.5rem; */
		/* padding: 1rem; */
		font-size: 0.9rem;
		font-weight: 600;		
		color: var(--brand-color);
	}

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

	/* .mainNavLink > img {
		width: 100%;
		height: 100%;
	} */

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
		width: 234px;
		height: 45px;
	}

	.brand > figure > img {
		width: 100%;
		height: 100%;
	}

	/* .brand > h2 {
		margin: 0;
		padding: 0;
		font-size: 1.6rem;
	} */

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
		height: 0.3rem;
		/* background-color: var(--awe-color-alt);  */
		background: repeating-linear-gradient(
			to right, 
			var(--brand-color) 0%, 
			var(--brand-color) 9.99%, 
			var(--awe-color-alt) 10%, 
			var(--awe-color-alt) 19.99%, 
			var(--brand-color) 20%, 
			var(--brand-color) 29.99%,
			var(--awe-color-alt) 30%, 
			var(--awe-color-alt) 39.99%,
			var(--brand-color) 40%, 
			var(--brand-color) 49.99%,
			var(--awe-color-alt) 50%, 
			var(--awe-color-alt) 59.99%,
			var(--brand-color) 60%, 
			var(--brand-color) 69.99%,
			var(--awe-color-alt) 70%, 
			var(--awe-color-alt) 79.99%,
			var(--brand-color) 80%, 
			var(--brand-color) 89.99%,
			var(--awe-color-alt) 90%, 
			var(--awe-color-alt) 100%
		);
		background-size: 200% 100%;
		animation: shift 3s linear infinite;
		visibility: hidden;
		transition: visibility 1.5s, opacity 3s linear;
		z-index: 10;
	}
	.loading {
		visibility: visible;
		opacity: 1;
	}

	@keyframes shift {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -100% 0;
		}
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