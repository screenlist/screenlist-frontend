import { error } from '@sveltejs/kit'
import Typesense from 'typesense'
import { 
	PUBLIC_TYPESENSE_HOST, 
	PUBLIC_TYPESENSE_PORT, 
	PUBLIC_TYPESENSE_PROTOCOL, 
	PUBLIC_TYPESENSE_KEY
} from '$env/static/public'

export const ssr = false

const client = new Typesense.Client({
	'nodes': [{
		'host': PUBLIC_TYPESENSE_HOST, // For Typesense Cloud use xxx.a1.typesense.net
		'port': PUBLIC_TYPESENSE_PORT,      // For Typesense Cloud use 443
		'protocol': PUBLIC_TYPESENSE_PROTOCOL   // For Typesense Cloud use https
	}],
	'apiKey': PUBLIC_TYPESENSE_KEY,
	'connectionTimeoutSeconds': 2
})

export async function load(event) {
	const q = event.url.searchParams.get('q')
	const text = decodeURIComponent(q)

	const films = await client.collections('films').documents().search({ 
		'q': text, 
		'query_by': 'name',
		'limit': 15
	})

	const companies = await client.collections('companies').documents().search({ 
		'q': text, 
		'query_by': 'name',
		'limit': 15
	})

	const people = await client.collections('people').documents().search({ 
		'q': text, 
		'query_by': 'name',
		'limit': 15
	})
	
	return { 
		search: {
			films: films.hits,
			companies: companies.hits,
			people: people.hits
		}
	}
}