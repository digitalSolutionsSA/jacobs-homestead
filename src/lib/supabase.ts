import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Blog = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  image_url: string
  published: boolean
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  available: boolean
  created_at: string
  updated_at: string
}
