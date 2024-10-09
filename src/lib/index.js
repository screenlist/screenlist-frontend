import { writable } from "svelte/store";

export const  selected = writable({
	name: '', id: ''
})

export const continueOn = writable(false)