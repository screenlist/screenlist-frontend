import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const token = cookies.get('__session')

	const topic = event.params.topic
	if(!topic){ throw error(400, 'Select a topic to view') }

	const url = ''

	switch(topic){
		case 'films':
			url.concat(`${PUBLIC_SERVER}/films/data/awaiting-moderation`)
			break;
		case 'companies':
			url.concat(`${PUBLIC_SERVER}/companies/data/unmoderated`)
			break;
		case 'people':
			url.concat(`${PUBLIC_SERVER}/people/data/unmoderated`)
			break;
		case 'reviews':
			url.concat(`${PUBLIC_SERVER}/films/data/unmoderated-reviews`)
			break;
		case 'critics':
			url.concat(`${PUBLIC_SERVER}/users/admin/journalists/requests`)
			break;
	}
	
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		}
	})

	if(res.ok){
		return {
			moderate: await res.json()
		}
	} else {
		throw error(404, 'Request could not be fulfilled')
	}
}