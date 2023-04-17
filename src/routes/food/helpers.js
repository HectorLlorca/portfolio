import { supabase } from '$lib/supabaseClient.js';


 export const getTypeFood = async (food) => {
    if(food === 'all'){
        const {data}  = await supabase.from('Food').select("*").order('created_at', {ascending: false});
        return {data};
    }
 const {data}  = await supabase.from('Food').select("*").eq('cocina', food).order('created_at', {ascending: false});
    return {data};
}
