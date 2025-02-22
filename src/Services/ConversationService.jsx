import { supabase } from "../config/supabase";

class ConversationService {

    async getConversations(user_id) {
        const {data,error} = await supabase.from('Conversations').select('*').eq('user_id', user_id);
        if(error) {
            throw new Error(error.message);
        } else {
            return data;
        }
    }

    async createConversation() {
        try {
            const{data, error} = await supabase.from('Conversations').insert([{}])
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