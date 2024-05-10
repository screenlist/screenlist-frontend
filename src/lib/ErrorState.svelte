<script>
	import { onDestroy, onMount } from 'svelte'

	export let message = ''
	export let duration = 10000;

	let isOpen = false

	// Function to close the popup
	function closePopup() {
		isOpen = false
	}

	// Set up a timeout to close the popup after a duration
	let timeout = setTimeout(closePopup, duration)

	onMount(() => {
		isOpen = true
	})

	// Cleanup function to clear the timeout when the component is destroyed
	onDestroy(() => {
		if (timeout) {
			clearTimeout(timeout)
		}
	});

	// let cleanMsg = message.substring(0, 100)
</script>

{#if isOpen}
	<article class="popup">
		<p>{String(message).substring(0, 100)+`${message.length > 99 ? '...' : ''}`}</p>
		<button class="button-icon" on:click={closePopup}>
			<img src="/close-icon.svg" alt="Close" width="20px" height="20px" />
		</button>
	</article>
{/if}


<style>
	.popup {
		background: var(--base-color);
		/* min-width: 150px; */
		max-width: 300px;
		border: 0.05rem solid var(--base-color);
		border-radius: 0.5rem;
		box-shadow: 0 4px 8px rgba(204, 0, 0, 0.6), 0 6px 20px rgba(0, 0, 0, 0.19); 
		display: grid;
		place-items: center;
		position: fixed;
		top: 5rem;
		left: 50%;
		transform: translate(-60%, -95%);
		z-index: 20;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-right: 0.5rem;
	}

	.popup > p {
		word-wrap: break-word;
		overflow: hidden;
		display: inline-block;
		padding: 0.5rem;
		margin: 0;
		font-size: 0.9rem;
		color: var(--danger-color);
	}
</style>