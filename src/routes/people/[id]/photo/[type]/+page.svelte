<script>
	import { page } from '$app/stores'
	import PhotoOperations from '$lib/PhotoOperations.svelte'

	export let data
	export let form

	let type = $page.params.type?.split(':')[0]

	let object
	
	if(type === 'profile'){
		object = data.details.photo
	}
</script>

<svelte:head>
	<title>Person Photo Operations - Screen List</title>
	<meta name="description" content="The Screen List dashboard is the centre of content management" />
</svelte:head>

<PhotoOperations {object} {form} />