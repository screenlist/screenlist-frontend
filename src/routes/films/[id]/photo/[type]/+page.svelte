<script>
	import { page } from '$app/stores'
	import PhotoOperations from '$lib/PhotoOperations.svelte'

	export let data
	export let form

	let type = $page.params.type
	let index = $page.url.searchParams.get('index')

	let object

	if(type === 'poster'){
		object = data.details.poster
	}
	if(type === 'still'){
		object = data.stills.find( item => item.index - index)
	}
</script>

<PhotoOperations {object} {form} />