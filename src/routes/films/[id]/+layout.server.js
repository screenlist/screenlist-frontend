import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const token = event.cookies.get('__session')
	const id = event.params.id
	
	const res = await fetch(`${PUBLIC_SERVER}/films/${id}`, {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': 'application/json'
		}
	})

	if(res.ok){
		return await res.json()
	} else {
		throw error(404, 'Films not found')
	}
}