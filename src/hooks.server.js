import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'
import { CLERK_SECRET_KEY } from '$env/static/private'

export const handle = sequence(
	async function({event, resolve}){ 
		// console.log(event.cookies.get('__session'))
		return await resolve(event)
	 },
	 handleClerk(CLERK_SECRET_KEY, {
		debug: false,
		protectedPaths: [],
		signInUrl: '/sign-in'
	 })
)