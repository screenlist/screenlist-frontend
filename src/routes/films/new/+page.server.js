import { PUBLIC_SERVER } from '$env/static/public'
import { error, fail, redirect } from '@sveltejs/kit'

export const actions = {
	create: async ({cookies, request, params}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const values = Object.fromEntries( Object.entries( Object.fromEntries(data.entries()) ).filter(([_, value]) => value != "") )
		values.languages = data.getAll('languages')
		values.genres = data.getAll('genres')
		values.countries = JSON.parse(data.getAll('countries'))
		if(values.year){ values.year = ~~values.year }
		if(values.runtime){ values.runtime = ~~values.runtime }
		if(values.boxOffice){ values.boxOffice = ~~values.boxOffice }
		if(values.budget){ values.budget = ~~values.budget }
		if(values.releaseDate){ 
			values.releaseDate = new Date(values.releaseDate)
		}
		// console.log(Object.fromEntries(data.entries()))
		// console.log(values.countries)

		const response = await fetch(`${PUBLIC_SERVER}/films`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		})
		const responseData = await response.json()
		if(!response.ok){
			return fail(response.status, {
				error: responseData.message || response.statusText,
				...Object.fromEntries(data.entries())
			})
		}

		redirect(302, `/films/${responseData.id}`)
	}
}