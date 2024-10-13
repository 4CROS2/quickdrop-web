import { writable } from "svelte/store";

import { auth } from "../lib/firebase/firebase.client";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
} from "firebase/auth";

export const authStore = writable({
    isLoading: true,
    currentUser: null
})

export const authHandlers = {
    login: async (email, password) => {
        try {
            authStore.update(store => ({ ...store, isLoading: true }));
            await signInWithEmailAndPassword(auth, email, password);
            authStore.update(store => ({ ...store, isLoading: false, currentUser: auth.currentUser }));
        } catch (error) {
            authStore.update(store => ({ ...store, isLoading: false }));
            console.error("Login failed", error);
            // Aquí puedes manejar los errores más detalladamente
        }
    },
    signup: async (email, password) => {
        try {
            authStore.update(store => ({ ...store, isLoading: true }));
            await createUserWithEmailAndPassword(auth, email, password);
            authStore.update(store => ({ ...store, isLoading: false, currentUser: auth.currentUser }));
        } catch (error) {
            authStore.update(store => ({ ...store, isLoading: false }));
            console.error("Signup failed", error);
        }
    },
    logout: async () => {
        try {
            authStore.update(store => ({ ...store, isLoading: true }));
            await signOut(auth);
            authStore.update(store => ({ ...store, isLoading: false, currentUser: null }));
        } catch (error) {
            authStore.update(store => ({ ...store, isLoading: false }));
            console.error("Logout failed", error);
        }
    },
    resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email)
    },
    updateEmail: async (email) => {
        await updateEmail(auth, email)
    }
    , updatePassword: async (password) => {
        await updatePassword(auth, password)
    }

}