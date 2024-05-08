<script>
	import Content from '$lib/Content.svelte'
	import { page } from '$app/stores'

	export let data
	export let form

	let type = $page.params.type
</script>

<svelte:head>
	<title>Edit {type} - Screen List dashboard</title>
	<meta name="description" content="The Screen List dashboard is the centre of content management" />
</svelte:head>

<Content {type} {form} {data} />