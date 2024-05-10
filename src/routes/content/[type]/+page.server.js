import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const res = await fetch(`${PUBLIC_SERVER}/content/${event.params.type}`)

	if(res.ok){
		return { content: await res.json() }
	} else if(
		(!res.ok && event.params.type === 'contributions') ||
		(!res.ok && event.params.type === 'about') ||
		(!res.ok && event.params.type === 'privacy') ||
		(!res.ok && event.params.type === 'tos')
	){
		return {}
	} else {
		throw error(400, 'So sorry for this but we encountered an error')
	}
}