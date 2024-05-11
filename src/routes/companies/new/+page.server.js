import { PUBLIC_SERVER } from '$env/static/public'
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
	create: async ({cookies, request, url}) => {
		const token = cookies.get('__session')
		const data = await request.formData()
		const values = Object.fromEntries( Object.entries( Object.fromEntries(data.entries()) ).filter(([_, value]) => value != "") )
		delete values.redirectUrl

		if(values.founded){ values.founded = ~~values.founded }
		if(values.dateMonthFounded){ 
			values.dateMonthFounded = new Date(values.dateMonthFounded)
		}
		// console.log(Object.fromEntries(data.entries()))
		// console.log(values)

		const response = await fetch(`${PUBLIC_SERVER}/companies`, {
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
		
		if(data.get('redirectUrl')){
			redirect(302, decodeURIComponent(data.get('redirectUrl')))
		}

		redirect(302, `/companies/${responseData.id}`)
	}
}