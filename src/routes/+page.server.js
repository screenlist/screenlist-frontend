import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {

	const latest = await fetch(`${PUBLIC_SERVER}/films/data/latest`)
	const trending = await fetch(`${PUBLIC_SERVER}/films/data/trending`)
	const upcoming = await fetch(`${PUBLIC_SERVER}/films/data/upcoming`)
	const recent = await fetch(`${PUBLIC_SERVER}/films/data/recent`)

	return {
		latest: latest.ok ? await latest.json() : [],
		trending: trending.ok ? await trending.json() : [],
		upcoming: upcoming.ok ? await upcoming.json() : [],
		recent: recent.ok ? await recent.json() : []
	}
}