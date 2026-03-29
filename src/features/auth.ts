import { createClient } from "@/lib/supabase/client"

export async function signUpNewUser(email:string, password:string, name: string) {
  const supabaseBrowserClient = createClient();
  const { data, error } = await supabaseBrowserClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/authcallback`,
      data: {
        name
      }
    },
  })
  return {data, error}
}

export async function signInWithEmail(email:string, password:string) {
  const supabaseBrowserClient = createClient();
  const { data, error } = await supabaseBrowserClient.auth.signInWithPassword({
    email,
    password,
  })
  return {data, error}
}

export async function logOut(){
  const supabaseBrowserClient = createClient();
  const {error} = await supabaseBrowserClient.auth.signOut();
  return error
}