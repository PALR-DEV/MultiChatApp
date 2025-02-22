import { supabase } from '../config/supabase'; // Assuming this is your supabaseClient.js

class AuthService {
  async loginWithEmail(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message); // Throw if Supabase returns an error
      return data; // Return the data (e.g., user session)
    } catch (error) {
      throw error; // Re-throw for the caller to handle
    }
  }

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message); // Throw if Supabase returns an error
    } catch (error) {
      throw error; // Re-throw for the caller to handle
    }
  }

  async signUp(signUpData){
    try {
      const {email, password, username,} = signUpData;
      const { data, error } = await supabase.auth.signUp();
      
    } catch (error) {
      throw error;
      
    }
  }


  async signInWithTwitter() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo:  'http://localhost:5173/'
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService; // ES Module export
