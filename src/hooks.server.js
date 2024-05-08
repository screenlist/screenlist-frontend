import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'
import { CLERK_SECRET_KEY } from '$env/static/private'

export const handle = sequence(
	async function({event, resolve}){ 
		// console.log(event.cookies.get('__session'))
		// console.log(event.locals.session)
		console.log('This is for supervision and control')
		return await resolve(event)
	 },
	 handleClerk(CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: [
			({ url }) => new URL(url).pathname.includes('photo'),
			({ url }) => new URL(url).pathname.includes('edit'),
			'/films/new',
			'/people/new',
			'/companies/new',
			({ url }) => new URL(url).pathname.includes('roles'),
			'/dashboard',
			'/quota'
		],
		signInUrl: '/sign-in'
	 })
)