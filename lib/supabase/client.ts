import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create and export the client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For compatibility with existing code that expects createClient()
export const createClientInstance = () => supabase