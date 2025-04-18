import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwwidiuhoeowgoytuhnu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3d2lkaXVob2Vvd2dveXR1aG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MzA1NTcsImV4cCI6MjA2MDUwNjU1N30.iE1hbhhrgeHeD73TYiLykcyzk7TF4zRjb8KHU83e_gs'          

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
