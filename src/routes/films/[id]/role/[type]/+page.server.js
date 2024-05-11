import { PUBLIC_SERVER } from '$env/static/public'
import { error, fail, redirect } from '@sveltejs/kit'

export const actions = {
	create: async ({cookies, request, params, url}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const type = await params.type
		const redirectUrl = url.searchParams.get('redirect_url')

		if(!type || (type !== 'companies' && type !== 'people') ){ 
			throw error(400, 'Incomplete URL parameters')
		}

		const body = {}

		if(type === 'companies'){
			body.companyName = data.get('companyName')
			body.capacity = data.get('capacity')
		} else if(type === 'people'){
			body.personName = data.get('personName')
			body.title = data.get('title')
			body.department = data.get('department')
			body.category = data.get('category')

			if(data.get('category') === 'cast'){
				body.characterName = data.get('characterName')
			}
		}

		// console.log(body)

		const response = await fetch(`${PUBLIC_SERVER}/films/${params.id}/${type}/${data.get('id')}/roles`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})

		if(!response.ok){
			const err = await response.json()
			return fail(400, {
				error: err.message,
				...Object.fromEntries(data.entries())
			})
		}
		
		if(redirectUrl){
			redirect(302, decodeURIComponent(redirectUrl))
		}

		redirect('302', `/films/${params.id}`)
	},
	delete: async ({cookies, request, params}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const type = await params.type

		if(!type || (type !== 'companies' && type !== 'people')){ 
			throw error(400, 'Incomplete URL parameters')
		}

		// console.log(Object.fromEntries(data.entries()))
		const response = await fetch(PUBLIC_SERVER+data.get('urlPath'), {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		if(!response.ok){
			const err = await response.json()
			return fail(400, {
				err: err.message,
				...Object.fromEntries(data.entries())
			})
		}

		return { status: 'success' }
		// redirect('302', `/films/${params.id}`)
	}
}