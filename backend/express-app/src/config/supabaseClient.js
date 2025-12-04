const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Store variables in constants for clarity and safety
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// VALIDATION: Throw an error if the environment variables are missing.
// This gives you a clear error message instead of a cryptic one from the SDK.
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and Key are required. Make sure they are in your .env file."
  );
}

// Create the client instance
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the client instance directly
module.exports = supabase;
