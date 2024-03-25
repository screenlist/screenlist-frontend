<script>
	export let text = ''
	export let height = '100%'
	export let fill = 'inherit'
	export let margins = '0'
	export let width = '100%'
	export let forError = false
</script>

<section
	class="empty-state-container"
	style="min-height: {height}; background-color: {fill}; width: {width}; margin: {margins};"
>
	<div>
		{#if forError === true}
			<img src="/photos/g-loading-failed.svg" alt="Error graphic" width="60px" height="60px" />
		{:else}
			<img src="/empty-state.svg" alt="Empty state graphic" width="100px" height="100px" />
		{/if}
		<p>{text}</p>
	</div>
</section>