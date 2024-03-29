<script>
    import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte'
		import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte'
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<SignedIn let:user>Hey, WTF!</SignedIn>
