const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tyvbdwwoubmcrofkmlik.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5dmJkd3dvdWJtY3JvZmttbGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MTQ0ODksImV4cCI6MjA5NDI5MDQ4OX0.E4Mifj5AUWrPYEc0J2uILhsDW8MrkTaZphbs5o7PWlQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Error fetching users:', error);
  } else {
    console.log('Current users in table:', data);
  }
}

checkUsers();
