<script>
	import { page } from '$app/stores'
	import PhotoOperations from '$lib/PhotoOperations.svelte'

	export let data

	let type = $page.params.type
	let index = $page.url.searchParams.get('index')

	let object

	if(type === 'posters'){
		object = data.details.poster
	}
	if(type === 'stills'){
		object = data.details.stills.find( item => item.index - index)
	}
</script>

<PhotoOperations {object} />