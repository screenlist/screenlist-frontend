<script>
	import { PUBLIC_HOST_URL } from '$env/static/public'
	import FilmsCard from '$lib/FilmsCard.svelte'
	import { page } from '$app/stores'

	export let data
	const entries = data.data
	const pointer = $page.params.pointer
	const base = pointer.split(':')[0]
	const id = pointer.split(':')[1]

	let heading = ''
	let summary = ''

	if(base === 'films'){
		switch(id){
			case 'trending':
				heading = 'Trending Films';
				summary = 'A collection of all the South African films currently trending this week.';
				break;
			case 'latest' :
				heading = 'Latest Films';
				summary = 'The latest South African film releases - thrillers, dramas, romantic comedies, etc, in cinemas, video on demand and streaming.';
				break;
			case 'upcoming' :
				heading = 'Upcoming Films';
				summary = 'The definitive list of South African film coming to a screen near you, soon.';
				break;
			case 'recent' :
				heading = 'Recently Added Films';
				summary = 'A selection of films recently added to Screen List, from upcoming, new releases and classics.';
				break;
			default :
				heading = data.config?.heading;
				summary = data.config?.summary;
				break;
		}
	}
</script>

<svelte:head>
	<title>{heading} - Screen List</title>
	<meta name="description" content={summary} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@OnScreenList" />
	<meta property="og:title" content={`${heading} - Screen List`} />
	<meta property="og:description" content={summary} />
	<meta property="og:image" content="/photos/display-art.webp" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/films`} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<FilmsCard films={entries} heading={heading} />