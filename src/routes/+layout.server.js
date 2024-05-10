import { PUBLIC_SERVER } from '$env/static/public'
import { redirect, error } from '@sveltejs/kit'

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

	const isDashboard = /.*\/dashboard\/?.*/.test(event.url.pathname)

	const guarded = routes.some(pattern => {
		if(pattern instanceof RegExp){			
			return pattern.test(event.url.pathname)
		} else {
			return pattern === event.url.pathname
		}
	})

	// console.log(event.url.pathname, guarded, `Details are ${getDetails.ok}`)
	if(isDashboard === true && getDetails.ok === true && user?.role !== 'admin'){
		error(403, 'You do not have access to this part of the application, understand?')
	}

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