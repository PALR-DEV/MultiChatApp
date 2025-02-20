import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iudnespxosmssoqkojsu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1ZG5lc3B4b3Ntc3NvcWtvanN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDgxNzcsImV4cCI6MjA1NTU4NDE3N30.ofl_W7wYE8mxaQMEH_X5f45Xwx5c8wVK791_M7Y1jPQ';
const supabase = createClient(supabaseUrl, supabaseKey)


module.exports supabase;
