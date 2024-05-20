<script >
	import { page } from '$app/stores'
	import SignUp from 'clerk-sveltekit/client/SignUp.svelte'
</script>

<svelte:head>
	<title>Create Account - Screen List</title>
	<meta name="description" content="The Screen List dashboard is the centre of content management" />
</svelte:head>

<section class="form-page">
	<SignUp redirectUrl={$page.url.searchParams.get('redirect_url')} />
</section>