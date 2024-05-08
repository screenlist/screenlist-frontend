<script>
	import { PUBLIC_HOST_URL } from '$env/static/public'
</script>

<svelte:head>
	<title>Membership - Screen List</title>
	<meta name="description" content="The conception, development and maintainace of Screen List has largely been the volunteer work of 
		a few people. If you are able and find value in this platform, consider donating through any of the options below." />
	<meta name="twitter:card" content="summary_large_image"/>
	<meta name="twitter:site" content="@OnScreenList"/>
	<meta property="og:title" content="Membership - Screen List" />
	<meta property="og:description" content="The conception, development and maintainace of Screen List has largely been the volunteer work of 
		a few people. If you are able and find value in this platform, consider donating through any of the options below." />
	<meta property="og:image" content={PUBLIC_HOST_URL+"/photos/display-art.webp"} />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:url" content={`${PUBLIC_HOST_URL}/membership`} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Screen List" />
	<meta property="og:locale" content="en_ZA" />
</svelte:head>

<div class="page">
	<div class="intro">
		<figure class="image">
			<img
				src='/photos/g-card-payment.svg'
				alt={`Screen List logo`}
				width="1920px"
				height="1080px"
				loading="lazy"
				layout="fill"
				objectFit='contain'
			/>
		</figure>
		<div class="hook">
			<h1 class="h2">Support the continued development of this platform</h1>
			<p>
				The conception, development and maintainace of Screen List has largely been the volunteer work of 
				one person, myself, Alex. However, there are monthly costs related to servers, databases and email service. If you 
				find value in this platform, and you are able to, consider donating through any of the options below.
			</p>
		</div>
	</div>
	<div class="rules">					
		<article class="card">
			<h2 class='h4'>Donate Any Amount {'(Once-off)'}</h2>
			<span class="info">For as little as a single South African rand you can help keep the projet alive and any amount goes a long way.</span>
			<a href="https://paystack.com/pay/alexkokobane" target="_blank" rel="noreferrer" class='button-good' >Pay</a>
		</article>
		<article class="card">
			<h2 class='h4'>Donate R180 Monthly {`(Recurring)`}</h2>
			<span class="info">With predictable monthly donations you can help with us keep up with the recurring operational costs, plus you can cancel anytime.</span>
			<a href="https://paystack.com/pay/screenlist-subscription" target="_blank" rel="noreferrer" class='button-good' >Subscribe</a>
		</article>
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		text-align: center;
		border: 0.15rem solid var(--base-color-alt);
		margin: 1rem;
	}

	.card > h2 {
		color: var(--brand-color);
	}

	.info {
		margin: 0 0 1rem 0;
		font-size: 0.9rem;
	}

	.page {
		min-width: 100%;
	}

	.intro {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.image {
		padding: 0;
		margin: 0;
		width: 100%;
		aspect-ratio: 1/1;
		/*border: 1px transparent solid;
		border-radius: 250px;*/
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;

		/*padding: 0;
		margin: 0;
		width: 100%;
		aspect-ratio: 1/1;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;*/
	}

	.image > img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.hook {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		max-width: 600px;
	}

	.hook > h1 {
		text-align: center;
		margin: 0.5rem 0;
		color: var(--brand-color);
	}

	.hook > p {
		text-align: center;
		margin: 0.5rem 0 1rem 0;
	}

	.rules {
		margin: 1rem 0 0.5rem 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		width: 100%;
	}

	@media(min-width: 600px){
		.image {
			max-width: 400px;
		}
		/*.intro {
			flex-direction: row;
		}*/
		/*.hook {
			align-items: flex-start;
		}*/
		.hook > h1 {
			text-align: center;
		}
		.hook > p {
			text-align: center;
		}
		.rules {
			align-items: center;
			flex-direction: row;
			align-items: stretch;
			justify-content: center;
		}

		.card {
			width: 50%;
		}
	}

	@media(min-width: 1000px){
		/* .image {
			max-width: 400px;
		} */
		.intro {
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
		}
		.hook {
			align-items: flex-start;
		}
		.hook > h1 {
			text-align: left;
		}
		.hook > p {
			text-align: left;
		}
	}

	@media(min-width: 1200px){
		/* .image {
			max-width: 800px;
		} */
		/* .rules {
			flex-direction: row;
			justify-content: center;
			align-items: flex-start;
		} */
	}
</style>