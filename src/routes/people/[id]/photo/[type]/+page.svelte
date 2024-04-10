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

<PhotoOperations {object} {form} />