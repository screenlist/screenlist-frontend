<script>
	export let context = 'inline'
</script>

{#if context === 'page'}
	<div class="wholePageContainer">
		<div class="lds-ellipsis">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
{:else if context === 'pop'}
	<div class="popUpContainer">
		<div class="ellipFlex">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
{:else if context === 'inline'}
	<div class="container">
		<div class="lds-ellipsis">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
{/if}

<style>
	.container {
		min-width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
	}

	.wholePageContainer {
		min-width: 100%;
		min-height: 80vh;
		display: grid;
		place-items: center;
	}

	.popUpContainer {
		background: var(--base-color);
		width: 100px;
		height: 30px;
		border: 0.1rem solid transparent;
		border-radius: 0.5rem;
		box-shadow: 0 0.045rem 0.25rem var(--accent-color-alt);
		display: grid;
		place-items: center;
		position: fixed;
		top: 5%;
		left: 50%;
		transform: translate(-60%, -95%);
		z-index: 20;
	}

	.ellipFlex {
		display: inline-block;
		position: relative;
		display: grid;
		place-items: center;
		width: 80px;
		height: 30px;
	/*  border: 0.1rem solid red;*/
	}
	.ellipFlex div {
		position: absolute;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: var(--brand-color);
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}

	.ellipFlex div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.ellipFlex div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.ellipFlex div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.ellipFlex div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}

	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ellipsis div {
		position: absolute;
		top: 33px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: var(--brand-color);
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}


	@keyframes ellipFlex1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes ellipFlex3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes ellipFlex2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>