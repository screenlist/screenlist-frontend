<script>
	import { page } from '$app/stores'
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte'
</script>

<svelte:head>
	<title>Sign In - Screen List</title>
	<meta name="description" content="The Screen List dashboard is the centre of content management" />
</svelte:head>

<section class="form-page">
	<SignIn redirectUrl={$page.url.searchParams.get('redirect_url')} />
</section>