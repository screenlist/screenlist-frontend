import { PUBLIC_SERVER } from '$env/static/public'

export async function load(event) {
	try {
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
		
		if(getDetails.ok && getQuota.ok){
			return {
				user,
				quota
			}
		}	
	} catch(err){}
}