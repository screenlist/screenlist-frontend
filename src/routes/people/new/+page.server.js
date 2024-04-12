import { PUBLIC_SERVER } from '$env/static/public'
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
	create: async ({cookies, request}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const values = Object.fromEntries( Object.entries( Object.fromEntries(data.entries()) ).filter(([_, value]) => value != "") )
		if(values.nationality){ values.nationality = data.getAll('nationality') }
		if(values.yearOfBirth){ values.yearOfBirth = ~~values.yearOfBirth }
		if(values.dateMonthOfBirth){ 
			values.dateMonthOfBirth = new Date(values.dateMonthOfBirth)
			if(values.yearOfBirth && values.yearOfBirth !== new Date(values.dateMonthOfBirth).getFullYear()){ return fail(400, 'Birth Year and Date of Birth must be the same year') }
		}
		if(values.deathDate){ 
			values.deathDate = new Date(values.deathDate)
		}
		// console.log(Object.fromEntries(data.entries()))
		// console.log(values)

		const response = await fetch(`${PUBLIC_SERVER}/people`, {
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

		redirect(302, `/people/${responseData.id}`)
	}
}