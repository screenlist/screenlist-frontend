<script>
	import { page } from '$app/stores'
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte'
</script>

<section class="form-page">
	<SignIn redirectUrl={$page.url.searchParams.get('redirect_url')} />
</section>