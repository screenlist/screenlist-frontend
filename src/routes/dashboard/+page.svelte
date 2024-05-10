<script>
	export let data

	function generatePastelColor() {
    // Generating a random pastel color
    const h = Math.floor(Math.random() * 360); // Hue from 0 to 360
    const s = Math.floor(Math.random() * 30) + 70; // Saturation from 70% to 100%
    const l = Math.floor(Math.random() * 20) + 80; // Lightness from 80% to 100%
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
</script>

<svelte:head>
	<title>Dashboard - Screen List</title>
	<meta name="description" content="The Screen List dashboard is the centre of content management" />
</svelte:head>

<div class="form-page">
	<div class="textual-page">
		<div class="textual-page-heading">
			<h1>Hello, {data.user?.fullName}</h1>
			<div class="container">
				<a class="portal" style={`background-color: ${generatePastelColor()};`} href="/dashboard/moderation/films">
					<span>Moderation</span>					
				</a>
				<a class="portal" style={`background-color: ${generatePastelColor()};`} href="/dashboard/content/tos/edit">
					<span>Terms of Service</span>					
				</a>
				<a class="portal" style={`background-color: ${generatePastelColor()};`} href="/dashboard/content/privacy/edit">
					<span>Privacy</span>					
				</a>
				<a class="portal" style={`background-color: ${generatePastelColor()};`} href="/dashboard/content/about/edit">
					<span>About Screen List</span>					
				</a>
				<a class="portal" style={`background-color: ${generatePastelColor()};`} href="/dashboard/content/contributions/edit">
					<span>Contributions</span>					
				</a>
			</div>
		</div>		
	</div>
</div>

<style>
	.portal {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-end;
		height: 10rem;
		padding: 1rem;
	}

	.portal > span {
		font-size: 1.5rem;
		color: var(--brand-color);
	}

	.container {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(minmax(0, 1fr));
		grid-auto-flow: row;
		grid-gap: 0.5rem;
		margin: 1rem 0 0 0;
	}

	@media(min-width: 600px){
		.container {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media(min-width: 1000px){
		.container {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media(min-width: 1200px){}
</style>