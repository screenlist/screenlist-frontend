import { PUBLIC_SERVER } from '$env/static/public'
import { fail } from '@sveltejs/kit'

export const actions = {
	verify: async ({cookies, params}) => {
		const token = cookies.get('__session')
		
		const response = await fetch(`${PUBLIC_SERVER}/people/${params.id}/settings/verify`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if(!response.ok){
			const err = await response.json()
			return fail(400, {
				error: err.message,
				...Object.fromEntries(data.entries())
			})
		} else { return { status: 'success' } }
	},
	hide: async ({cookies, params}) => {
		const token = cookies.get('__session')
		
		const response = await fetch(`${PUBLIC_SERVER}/people/${params.id}/settings/hide`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if(!response.ok){
			const err = await response.json()
			return fail(400, {
				error: err.message,
				...Object.fromEntries(data.entries())
			})
		} else { return { status: 'success' } }
	},
	unhide: async ({cookies, params}) => {
		const token = cookies.get('__session')
		
		const response = await fetch(`${PUBLIC_SERVER}/people/${params.id}/settings/unhide`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if(!response.ok){
			const err = await response.json()
			return fail(400, {
				error: err.message,
				...Object.fromEntries(data.entries())
			})
		} else { return { status: 'success' } }
	},
	lock: async ({cookies, params}) => {
		const token = cookies.get('__session')
		
		const response = await fetch(`${PUBLIC_SERVER}/people/${params.id}/settings/lock`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if(!response.ok){
			const err = await response.json()
			return fail(400, {
				error: err.message,
				...Object.fromEntries(data.entries())
			})
		} else { return { status: 'success' } }
	},
	unlock: async ({cookies, params}) => {
		const token = cookies.get('__session')
		
		const response = await fetch(`${PUBLIC_SERVER}/people/${params.id}/settings/unlock`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if(!response.ok){
			const err = await response.json()
			return fail(400, {
				error: err.message,
				...Object.fromEntries(data.entries())
			})
		} else { return { status: 'success' } }
	}
}