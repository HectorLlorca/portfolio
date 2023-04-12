import { supabase } from '$lib/supabaseClient.js';


 export const getMood = async (mood:string) => {
 const {data}  = await supabase.from('Music').select("*").eq('mood', mood).order('created_at', {ascending: false});
    return {data};
}
