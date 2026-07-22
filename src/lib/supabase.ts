import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cmnvlhohuztvudgmyemo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbnZsaG9odXp0dnVkZ215ZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MzYzMzksImV4cCI6MjEwMDIxMjMzOX0.zpfvXWWDm-9wUJAuxce90nXH9Mxx2VNpkNOqB5AoSfQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Blog = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  image_url: string
  published: boolean
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  name: string
  description: string
  full_description: string
  price: number
  image_url: string
  category: string
  stock: number
  available: boolean
  weight: string
  dimensions: string
  created_at: string
  updated_at: string
}
