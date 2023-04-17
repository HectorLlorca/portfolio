import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient.js';

export const load = (async () => {

    const {data}  = await supabase.from('Food').select("*").order('created_at', {ascending: false});

    
    return {data};
}) satisfies PageServerLoad;