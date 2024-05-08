import { PUBLIC_SERVER } from '$env/static/public'
import { error, fail, redirect } from '@sveltejs/kit'
import {FormData} from 'formdata-node'
// import http from 'http'

export const actions = {
	create: async ({cookies, request, params}) => {
		const token = cookies.get('__session')

		const data = await request.formData()
		const filmId = params.id
		const photoType = params.type?.split(':')[0]
		const photoIndex = params.type?.split(':')[1]

		if( (photoType !== 'poster' && photoType !== 'still') || !photoIndex ){
			throw error(400, 'Incomplete URL parameters')
		}

		const form = new FormData()
		form.append(photoType, data.get('source'))

		const photoUrl = `${PUBLIC_SERVER}/films/${filmId}/${photoType+'s'}?index=${photoIndex}`
		
		const createResponse = await fetch(photoUrl, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`
			},
			body: form
		})
		
		if(!createResponse.ok){
			const createError = await createResponse.json()
			return fail(createResponse.status, {
				error: createError.message || createResponse.statusText,
				source: '',
				attribution: data.get('attribution') ?? '',
				description: data.get('description') ?? ''
			})
		}

		const editResponse = await fetch(photoUrl, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				description: data.get('description'),
				attribution: data.get('attribution'),
				source: data.get('poster') === typeof 'string' ? data.get('poster') : 'direct'
			})
		})

		if(!editResponse.ok){
			await fetch(photoUrl, {
				method: 'DELETE',
				headers: { authorization: `Bearer ${token}` }
			})
			const editError = await editResponse.json()
			return fail(editResponse.status, {
				error: editError.message || editResponse.statusText,
				source: '',
				attribution: data.get('attribution') ?? '',
				description: data.get('description') ?? ''
			})
		}

		throw redirect(303, `/films/${params.id}`)
	},
	update: async ({cookies, request, params}) => {
		const token = cookies.get('__session')
		
		const data = await request.formData()
		const filmId = params.id
		const photoType = params.type?.split(':')[0]
		const photoIndex = params.type?.split(':')[1]

		if( (photoType !== 'poster' && photoType !== 'still') || !photoIndex ){
			throw error(400, 'Incomplete URL parameters')
		}

		const photoUrl = `${PUBLIC_SERVER}/films/${filmId}/${photoType+'s'}?index=${photoIndex}`
		const res = await fetch(photoUrl, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				description: data.get('description'),
				attribution: data.get('attribution')
			})
		})

		if(!res.ok){
			const editError = await res.json()
			return fail(res.status, {
				error: editError.message || res.statusText,
				attribution: data.get('attribution') ?? '',
				description: data.get('description') ?? ''
			})
		}

		throw redirect(302, `/films/${params.id}`)
	},
	delete: async ({cookies, request, params}) => {
		const token = cookies.get('__session')
		
		const data = await request.formData()
		const filmId = params.id
		const photoType = params.type?.split(':')[0]
		const photoIndex = params.type?.split(':')[1]
		if( (photoType !== 'poster' && photoType !== 'still') || !photoIndex ){
			throw error(400, 'Incomplete URL parameters')
		}

		const photoUrl = `${PUBLIC_SERVER}/films/${filmId}/${photoType+'s'}?index=${photoIndex}`
		const res = await fetch(photoUrl, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`
			}
		})

		if(!res.ok){
			const deleteError = await res.json()
			return fail(res.status, {
				error: deleteError.message || res.statusText,
				index: data.get('index') ?? ''
			})
		}

		throw redirect(303, `/films/${params.id}`)
	}
}