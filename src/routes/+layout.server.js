import { PUBLIC_SERVER } from '$env/static/public'
import { redirect } from '@sveltejs/kit'

export async function load(event) {
	const routes = [
		'quota',
		/.*\/photo\/?.*/,
		/.*\/new\/?.*/,
		/.*\/edit\/?.*/,
		/.*\/dashboard\/?.*/
	]
	
	const token = event.cookies.get('__session')
	const getDetails = await fetch(`${PUBLIC_SERVER}/users/get-details`, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	})
	const getQuota = await fetch(`${PUBLIC_SERVER}/users/get-quota`, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	})

	const user = await getDetails.json()
	const quota = await getQuota.json()

	const guarded = routes.some(pattern => {
		if(pattern instanceof RegExp){
			return pattern.test(event.url.pathname)
		} else {
			return pattern === event.url.pathname
		}
	})

	// console.log(event.url.pathname, guarded, `Details are ${getDetails.ok}`)

	if(getDetails.ok === false && guarded === true){
		redirect(302, `/sign-in?redirect_url=${encodeURIComponent(event.url.pathname)}`)
	}
	
	if(getDetails.ok && getQuota.ok){
		return {
			user,
			quota
		}
	}
}