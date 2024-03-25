import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const id = event.params.id
	const res = await fetch(`${PUBLIC_SERVER}/films/${id}`, {
		headers: {
			'Content-Type': 'application/json'
		}
	})

	if(res.ok){
		return await res.json()
	} else {
		throw error(404, 'Films not found')
	}
}