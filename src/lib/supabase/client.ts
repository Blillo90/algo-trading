import { createClient } from '@supabase/supabase-js'

// Fallbacks prevent build-time crashes when env vars are not available locally.
// In production (Vercel), NEXT_PUBLIC_* vars are always present during build.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://localhost:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-key'

// Singleton browser client — safe to import in client components
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
