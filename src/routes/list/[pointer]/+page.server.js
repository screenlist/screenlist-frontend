import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const pointer = event.params.pointer
	const base = pointer.split(':')[0]
	const id = pointer.split(':')[1]
	
	const res = await fetch(`${PUBLIC_SERVER}/${base}/data/${id}?limit=100`, {
		headers: {
			'Content-Type': 'application/json'
		}
	})

	if(res.ok){
		return {data : await res.json()}
	} else {
		throw error(502, 'So sorry for this but we encountered an error')
	}
}