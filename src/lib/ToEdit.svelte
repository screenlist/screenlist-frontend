<script>
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte'
	import { page } from '$app/stores'
</script>

<div class="container">
	<SignInButton redirectUrl={$page.url.pathname} mode="modal" class="buttonStyles">
		<div class="iconContainer">
			<img
				src='/photos/sl-socials.png'
				alt='Screen List icon'
				width="100px"
				height="100px"
			/>
		</div>
		<span	style='margin-left:0.5rem;'>Sign in to edit</span>
	</SignInButton>
</div>

<style>
	.container {
		padding: 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.iconContainer {
		height: 35px;
		width: 35px;
		border: 0.1rem solid var(--brand-color);
		border-radius: 35px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: var(--base-color-alt);
	}

	.iconContainer > img {
		width: 100%;
		height: 100%;
	}

	@media(min-width: 600px){
		.container {
			padding: 0.5rem 0;
		}
	}

	@media(min-width: 1000px){}

	@media(min-width: 1200px){}
</style>