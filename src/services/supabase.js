import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://uovfzmfbvgoqyygbassf.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvdmZ6bWZidmdvcXl5Z2Jhc3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NjkyNzIsImV4cCI6MjA0MTA0NTI3Mn0.-BrjA9j84iSoy-P6N4T5dEoe5l3X2KM_S0aFE8nluso'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
