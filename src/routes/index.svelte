<script>
	import { onMount } from "svelte";
	import {authStore} from "../stores/auth.store";
	let d = new Date(0)
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
	.lds-circle {
		display: inline-block;
		transform: translateZ(1px);
	}
	.lds-circle > div {
		display: inline-block;
		width: 51px;
		height: 51px;
		margin: 6px;
		border-radius: 50%;
		background: magenta;
		animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	@keyframes lds-circle {
		0%, 100% {
			animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
		}
		0% {
			transform: rotateY(0deg);
		}
		50% {
			transform: rotateY(1800deg);
			animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
		}
		100% {
			transform: rotateY(3600deg);
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

{#if $authStore.loading}
<div style="display: flex; place-content: center; place-items: center">
	<h2>loading...</h2>
	<div class="lds-circle"><div></div></div>
</div>
{:else}
<main>
	{#if $authStore.user}
		<h1>Hi, {$authStore.isAuthenticated && $authStore.user.name}</h1>
	{:else}
		<h1>Great success!</h1>
	{/if}
	<figure>
		{#if $authStore.isAuthenticated}
			<img src={$authStore.user.picture} alt="avatar" />
		{:else}
			<img alt='Borat' src='great-success.png'>
			<figcaption>HIGH FIVE!</figcaption>
		{/if}
	</figure>
	<h1>Is authenticated? {$authStore.isAuthenticated}</h1>
	<h3>iat: {$authStore.getIdTokenClaims && new Date($authStore.getIdTokenClaims.iat * 1000)}</h3>
	<h3>exp: {$authStore.getIdTokenClaims && new Date($authStore.getIdTokenClaims.exp * 1000)}</h3>
</main>
{/if}
