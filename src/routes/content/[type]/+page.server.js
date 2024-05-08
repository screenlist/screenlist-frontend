import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const res = await fetch(`${PUBLIC_SERVER}/content/${event.params.type}`)

	if(res.ok){
		return { content: await res.json() }
	} else if(!res.ok && event.params.type === 'contributions'){
		return {}
	} else {
		throw error(400, 'So sorry for this but we encountered an error')
	}
}