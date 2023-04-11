import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient.js';

export const load = (async () => {

    const { data } = await supabase.from('Music').select();
    

    
    return {data}
}) satisfies PageServerLoad;