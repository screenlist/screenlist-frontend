import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {	
	const res = await fetch(`${PUBLIC_SERVER}/users/u/${event.params.username}`, {
		headers: {
			'Content-Type': 'application/json'
		}
	})

	if(res.ok){
		return await res.json()
	} else {
		throw error(502, 'So sorry for this but we encountered an error')
	}
}