<script>
	import { PUBLIC_HOST_URL } from '$env/static/public'
	import FilmsCard from '$lib/FilmsCard.svelte'
	import DonateCard from '$lib/DonateCard.svelte'
	import HeroCard from '$lib/HeroCard.svelte'
	import IntroCard from '$lib/IntroCard.svelte'
	import SocialCard from '$lib/SocialCard.svelte'

	export let data
</script>

<svelte:head>
	<title>Screen List - South African films, studios, actors and filmmakers</title>
	<meta name="description" content="The first database of information relating to South African cinema. Find your favourite films, actors and filmmakers, right here!" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Screen List - South African films, studios, actors and filmmakers" />
	<meta name="twitter:description" content="The first database of information relating to South African cinema. Find your favourite films, actors and filmmakers, right here!" />
	<meta name="twitter:image" content="/photos/display-art.webp" />
	<meta name="twitter:site" content="@OnScreenList" />

	<meta property="og:title" content="Screen List - South African films, studios, actors and filmmakers" />
	<meta property="og:description" content="The first database of information relating to South African cinema. Find your favourite films, actors and filmmakers, right here!" />
	<meta property="og:image" content="/photos/display-art.webp" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />

	<meta name="keywords" content="South African, Films, Actors, Studios, Crew, Latest, Upcoming, Recent, Trending" />
</svelte:head>

<HeroCard />
<FilmsCard films={data.trending} heading="Trending Films" viewMorePath="/list/films:trending" />
<IntroCard />
<FilmsCard films={data.latest} heading="Latest Films" viewMorePath="/list/films:latest" />
<SocialCard />
<FilmsCard films={data.upcoming} heading="Upcoming Films" viewMorePath="/list/films:upcoming" />
<DonateCard />
<FilmsCard films={data.recent} heading="Recently Added Films" viewMorePath="/list/films:recent" />