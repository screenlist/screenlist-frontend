import { PUBLIC_SERVER } from '$env/static/public'
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
	update: async ({cookies, request, params}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const values = Object.fromEntries( Object.entries( Object.fromEntries(data.entries()) ).filter(([_, value]) => value != "") )
		if(values.nationality){ values.nationality = JSON.parse(data.getAll('nationality')) }
		if(values.yearOfBirth){ values.yearOfBirth = ~~values.yearOfBirth }
		if(values.dateMonthOfBirth){ 
			values.dateMonthOfBirth = new Date(values.dateMonthOfBirth)
			if(values.yearOfBirth && values.yearOfBirth !== new Date(values.dateMonthOfBirth).getFullYear()){ return fail(400, 'Birth Year and Date of Birth must be the same year') }
		}
		if(values.deathDate){ 
			values.deathDate = new Date(values.deathDate)
		}

		const remove = []
		const rawMutation = Object.fromEntries(data.entries())
		const dataFromBeforeMutation = JSON.parse(values.init)
		for(const key in rawMutation){
			if( JSON.stringify(dataFromBeforeMutation[key]) && rawMutation[key] === '' &&  JSON.stringify(dataFromBeforeMutation[key]) !== '' ){
				remove.push(key)
			}
		}

		for(const key in values){
			if(!dataFromBeforeMutation.hasOwnProperty(key) && values[key] === ''){
				delete values[key]
			}
			if( JSON.stringify(values[key]) === JSON.stringify(dataFromBeforeMutation[key]) ){
				delete values[key]
			}
		}
		delete values.init
		
		// console.log(remove)
		// console.log(values)

		const response = await fetch(`${PUBLIC_SERVER}/people/${params.id}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				update: values,
				remove: remove
			})
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