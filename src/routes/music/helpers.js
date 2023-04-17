import { supabase } from '$lib/supabaseClient.js';


 export const getMood = async (mood) => {
    if(mood === 'all'){
        const {data}  = await supabase.from('Music').select("*").order('created_at', {ascending: false});
        return {data};
    }
 const {data}  = await supabase.from('Music').select("*").eq('mood', mood).order('created_at', {ascending: false});
    return {data};
}
