<script>
	import { PUBLIC_HOST_URL } from '$env/static/public'
	import Film from '$lib/Film.svelte'
	export let data
	export let form
</script>

<svelte:head>
	<title>Add Film - Screen List</title>
	<meta name="description" content="Add a film to the Screen List database" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@OnScreenList" />
	<meta property="og:title" content="Add Film - Screen List" />
	<meta property="og:description" content="Add a film to the Screen List database" />
	<meta property="og:image" content="/photos/display-art.webp" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/films/new`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<div class="form-page">
	<Film {data} {form} />
</div>