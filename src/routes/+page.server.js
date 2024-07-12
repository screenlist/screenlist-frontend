import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load() {

	const [latest, trending, upcoming, recent] = await Promise.all([
		await (await fetch(`${PUBLIC_SERVER}/films/data/latest`)).json(),
		await (await fetch(`${PUBLIC_SERVER}/films/data/trending`)).json(),
		await (await fetch(`${PUBLIC_SERVER}/films/data/upcoming`)).json(),
		await (await fetch(`${PUBLIC_SERVER}/films/data/recent`)).json()
	])

	return {
		latest: latest ? latest : [],
		trending: trending ? trending : [],
		upcoming: upcoming ? upcoming : [],
		recent: recent ? recent : []
	}
}