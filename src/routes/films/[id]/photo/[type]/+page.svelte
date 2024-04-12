<script>
	import { page } from '$app/stores'
	import PhotoOperations from '$lib/PhotoOperations.svelte'

	export let data
	export let form

	let type = $page.params.type?.split(':')[0]
	let index = +$page.params.type?.split(':')[1]

	let object
	
	if(type === 'poster'){
		object = data.details.poster
	}
	if(type === 'still'){
		object = data.stills.find( item => item.index === index)
	}

	// console.log(index)
	// console.log(object)
	// console.log(data.stills)
	// console.log(data.stills.find( item => item.index = index))
</script>

<PhotoOperations {object} {form} />