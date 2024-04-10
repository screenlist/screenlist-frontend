import { PUBLIC_SERVER } from '$env/static/public'
import { error, fail, redirect } from '@sveltejs/kit'

export const actions = {
	create: async ({cookies, request, params}) => {
		try {

		} catch(err){
			throw error(err.status, err)
		}
	}
}