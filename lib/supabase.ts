import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from './database.types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Variáveis de ambiente do Supabase não configuradas')
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseKey)
}
