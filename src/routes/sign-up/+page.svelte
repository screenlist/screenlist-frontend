<script >
	import { page } from '$app/stores'
	import SignUp from 'clerk-sveltekit/client/SignUp.svelte'
</script>

<section class="form-page">
	<SignUp redirectUrl={$page.url.pathname} />
</section>