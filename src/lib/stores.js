import { writable } from 'svelte/store'
import { browser } from '$app/environment';

let storageTheme

if  (browser) {
    storageTheme=localStorage.getItem('theme') || 'corporate';
}
 
export const theme= writable(storageTheme);
export const storeWidth= writable();
export const load= writable(false);
