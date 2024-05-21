<script>
	export let context = 'full'
</script>

{#if context === 'full'}
	<section class="full">
		<h2>Keep your finger on the pulse of South African cinema through socials</h2>
		<ul class="full-list">
			<li>
				<a href="https://instagram.com/onscreenlist" target="_blank" rel="noreferrer" class="button-icon" >
					<img src="/photos/instagram-light.svg" alt="Instagram" width="30px" height="30px" />
				</a>
			</li>
			<li>
				<a href="https://x.com/oncreenlist" target="_blank" rel="noreferrer" class="button-icon" >
					<img src="/photos/x-light.svg" alt="X" width="30px" height="30px" />
				</a>
			</li>
			<li>
				<a href="https://threads.net/onscreenlist" target="_blank" rel="noreferrer" class="button-icon" >
					<img src="/photos/threads-light.svg" alt="Threads" width="30px" height="30px" />
				</a>
			</li>
			<li>
				<a href="https://discord.gg/Rtwz7hJR" target="_blank" rel="noreferrer" class="button-icon" >
					<img src="/photos/discord-light.svg" alt="Discord" width="30px" height="30px" />
				</a>
			</li>
		</ul>
	</section>
{:else if context === 'community'}
	<section></section>
{:else if context === 'footer'}
	<section></section>
{/if}

<style>
	.full {
		margin: 0.5rem 0;
		padding: 1rem 0.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		width: 100%;
	}

	.full > h2 {
		color: var(--brand-color);
		text-align: left;
		width: 100%;
		padding: 0 0 0 20%;
		font-size: 1.8rem;
		font-weight: lighter;
	}

	.full-list {
		list-style: none;
		margin: 0.5rem 0 0 0;
		/* padding: 0.2rem; */
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		max-width: 600px;
		/* background: var(--brand-color); */
		/* border-radius: 1rem; */
	}

	.full-list > li {
		margin: 0;
		padding: 0;
		background: var(--brand-color);
		padding: 1rem;
		border-radius: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media(min-width: 600px){
		.full {
			padding: 1rem 0;
		}
	}
</style>