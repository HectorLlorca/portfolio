import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient.js';

export const load = (async () => {
    

    
    // return {data: await supabase
    //     .from('Pics')
    //     .select() };
}) satisfies PageServerLoad;