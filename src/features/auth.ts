import { supabase } from "@/lib/supabase/supabase.client";

export async function signUpNewUser(email:string, password:string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  })
  return {data, error}
}

export async function signInWithEmail(email:string, password:string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return {data, error}
}