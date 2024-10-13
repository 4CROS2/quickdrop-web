<script context="module">
	
	import { goto } from '$app/navigation';
	import { authHandlers, authStore } from '../../stores/auth_store';
	import Input from './components/input.svelte';
	

	let email;
	let password;

	function handleEmailChange(event) {
		email = event.detail.value;
	}

	function handlePasswordChange(event) {
		password = event.detail.value;
	}
	async function handleSubmit() {
		try {
			await authHandlers.login(email, password);
		} catch (e) {
			console.error(e);
		}
	}

	export const load = async () => {
		let currentUser;

		authStore.subscribe((current) => {
			currentUser = current.currentUser;
		})();

		if (currentUser) {
			// Si ya está autenticado, redirigir a home
			throw redirect(307, '/home');
		}
	};
</script>

<script>
	// Aquí iría tu lógica de login
</script>

<div class="container">
	<h1>sign up</h1>
	<form>
		<Input type="email" on:inputChange={handleEmailChange} placeHolder="email" />
		<Input type="password" on:inputChange={handlePasswordChange} placeHolder="password" />
		<button on:click={handleSubmit}>enviar</button>
	</form>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}
	.container form {
		display: flex;
		flex-direction: column;
	}
</style>
