import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'

export async function load(event) {
	const res = await fetch(`${PUBLIC_SERVER}/content/${event.params.type}`)

	if(res.ok){
		return await res.json()
	} else {
		throw error(502, 'So sorry for this but we encountered an error')
	}
}

export const actions = {
	update: async ({cookies, request, params}) => {
		const token = cookies.get('__session')		
		const data = await request.formData()
		const values = Object.fromEntries( Object.entries( Object.fromEntries(data.entries()) ).filter(([_, value]) => value != "") )
		if(values.tags){ values.tags = values.tags.split(',') }
		const type = params.type

		if( type !== 'about' && type !== 'privacy' && type !== 'tos' && type !== 'contributions' ){
			throw error(400, 'Incomplete URL parameters')
		}
		
		const res = await fetch(`${PUBLIC_SERVER}/content/${type}`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		})
		
		if(!res.ok){
			const createError = await res.json()
			return fail(res.status, {
				error: createError.message || res.statusText,
				...Object.fromEntries(data.entries())
			})
		}

		redirect(302, '/dashboard')
	}
}