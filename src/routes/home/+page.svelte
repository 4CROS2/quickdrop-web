<script>
    import { onDestroy } from 'svelte';
    import { authStore } from '../../stores/auth_store';
    
    let email 
    const unsubscribe = authStore.subscribe((current) => {
        email = current?.currentUser?.email || 'No hay usuario autenticado'; // Mensaje por defecto si no hay usuario
    });

    // Limpieza de la suscripción al destruir el componente
    onDestroy(() => {
        unsubscribe();
    });
</script>

<h1>
    Usuario: {email}
</h1>
