<script context="module">
	import { authStore } from '../stores/auth_store';
	import { redirect } from '@sveltejs/kit';
	import { onMount, onDestroy } from 'svelte';
	import { auth } from '../lib/firebase/firebase.client';
	export const load = ({ url }) => {
		let currentUser;

		authStore.subscribe((store) => {
			currentUser = store.currentUser;
		})();

		// Redirigir al login si el usuario no está autenticado y la ruta no es /login
		if (!currentUser && url.pathname !== '/login') {
			throw redirect(307, '/login');
		}

		// Redirigir a home si el usuario está autenticado e intenta acceder al login
		if (currentUser && url.pathname === '/login') {
			throw redirect(307, '/home');
		}
	};


	let unsubscribe;

	onMount(() => {
		unsubscribe = auth.onAuthStateChanged((user) => {
			console.log(user);
			authStore.update((current) => {
				return {
					...current,
					isLoading: false,
					currentUser: user
				};
			});
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<main class="mainContainer">
	<slot />
</main>

<style>
	.mainContainer {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
