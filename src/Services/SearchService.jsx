import { supabase } from "../config/supabase";

class SearchService {

    async fetchUsers(query) {
        try {
           const {data, error} = await supabase.from('Users').select('*').ilike('userName', `%${query}%`).neq('id', supabase.auth.user().id).order('userName', {ascending: true}).limit(10);
           if(error) {
            throw new Error(error.message);
           } else {
            return data;
           } 
        } catch (error) {
            throw error;
        }
    }
}