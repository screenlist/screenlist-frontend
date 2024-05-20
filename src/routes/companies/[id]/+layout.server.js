import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const token = event.cookies.get('__session')
	const id = event.params.id

	const res = await fetch(`${PUBLIC_SERVER}/companies/${id}`, {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': 'application/json'
		}
	})

	if(res.ok){
		return await res.json()
	} else {
		throw error(502, 'So sorry for this but we encountered an error')
	}
}