import { PUBLIC_SERVER } from '$env/static/public'
import { error, fail } from '@sveltejs/kit'

export async function load(event) {
	const token = event.cookies.get('__session')

	const topic = event.params.topic
	if(!topic){ throw error(400, 'Select a topic to view') }

	let url = ''

	switch(topic){
		case 'films':
			url = `${PUBLIC_SERVER}/films/data/awaiting-moderation`
			break;
		case 'companies':
			url = `${PUBLIC_SERVER}/companies/data/unmoderated`
			break;
		case 'people':
			url = `${PUBLIC_SERVER}/people/data/unmoderated`
			break;
		case 'reviews':
			url = `${PUBLIC_SERVER}/films/data/unmoderated-reviews`
			break;
		case 'critics':
			url = `${PUBLIC_SERVER}/users/admin/journalists/requests`
			break;
	}

	console.log(url)
	
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		}
	})

	if(res.ok){
		return {
			moderation: await res.json()
		}
	} else {
		throw error(404, 'Request could not be fulfilled')
	}
}

export const actions = {
	approve: async ({cookies, request, params}) => {
		const token = cookies.get('__session')		
		const data = await request.formData()
		const topic = params.topic
		const id = data.get('id')

		let url = ''

		switch(topic){
			case 'films':
				url = `${PUBLIC_SERVER}/films/${id}/settings/verify`
				break;
			case 'companies':
				url = `${PUBLIC_SERVER}/companies/${id}/settings/verify`
				break;
			case 'people':
				url = `${PUBLIC_SERVER}/people/${id}/settings/verify`
				break;
			case 'reviews':
				url = `${PUBLIC_SERVER}/films/${data.get('parentId')}/reviews/${id}/verify`
				break;
			case 'critics':
				url = `${PUBLIC_SERVER}/users/admin/journalists/requests/${id}`
				break;
		}

		const res = await fetch(url, {
			method: topic === 'critics' ? 'POST' : 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if(!res.ok){
			const err = await res.json()
			fail(400, {error: err.message})
		} else {
			return {
				status: 'success'
			}
		}
	},
	reject: async ({cookies, request, params}) => {
		const token = cookies.get('__session')		
		const data = await request.formData()
		const topic = params.topic
		const id = data.get('id')

		if(topic !== 'critics'){ throw error(400, 'Incomplete URL parameters') }

		const res = await fetch(`${PUBLIC_SERVER}/users/admin/journalists/requests/${id}/reject`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})

		if(!res.ok){
			const err = await res.json()
			fail(400, {error: err.message})
		} else {
			return {
				status: 'success'
			}
		}
	}
}