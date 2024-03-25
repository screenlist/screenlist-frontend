import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const limit = event.url.searchParams.get('limit')
	const page = event.url.searchParams.get('page')
	
	const res = await fetch(`${PUBLIC_SERVER}/films?page=${page ? page : 1}&limit=${limit ? limit : 50}`, {
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