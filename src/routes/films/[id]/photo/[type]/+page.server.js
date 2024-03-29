import { PUBLIC_SERVER } from '$env/static/public'
import { error } from '@sveltejs/kit'
import { fail } from '@sveltejs/kit';

export const actions = {
	create: async ({cookies, request, params, url}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const filmId = params.id
		const photoType = params.type?.split(':')[0]
		const photoIndex = params.type?.split(':')[1]
		console.log(data.get('source'))
		console.log(data.get('poster'))
		console.log(data.get('attribution'))
		// if( (photoType !== 'poster' && photoType !== 'still') || !photoIndex ){
		// 	throw error(400, 'Incomplete URL parameters')
		// }

		// const requestUrl = `${PUBLIC_SERVER}/films/${filmId}/${photoType+'s'}?index=${photoIndex}`
		// const res = await fetch(url, {
		// 	method: 'POST'
		// })
	},
	update: async ({cookies, request, params, url}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const filmId = params.id
		const photoType = params.type?.split(':')[0]
		const photoIndex = params.type?.split(':')[1]

		if( (photoType !== 'poster' && photoType !== 'still') || !photoIndex ){
			throw error(400, 'Incomplete URL parameters')
		}

		const requestUrl = `${PUBLIC_SERVER}/films/${filmId}/${photoType+'s'}?index=${photoIndex}`
		const res = await fetch(url, {
			method: 'PATCH',
			headers: {
				authourization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})
	},
	delete: async ({cookies, request, params, url}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const filmId = params.id
		const photoType = params.type?.split(':')[0]
		const photoIndex = params.type?.split(':')[1]
		if( (photoType !== 'poster' && photoType !== 'still') || !photoIndex ){
			console.log(photoIndex, photoType)
			throw error(400, 'Incomplete URL parameters')
		}

		// const requestUrl = `${PUBLIC_SERVER}/films/${filmId}/${photoType+'s'}?index=${photoIndex}`
		// const res = await fetch(url, {
		// 	method: 'DELETE',
		// 	headers: {
		// 		authourization: `Bearer ${token}`
		// 	}
		// })
	}
}