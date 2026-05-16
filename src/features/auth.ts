import { createClient } from "@/lib/supabase/client";

// const siteUrl =
//   process.env.NEXT_PUBLIC_SITE_URL ||
//   `https://${process.env.VERCEL_URL}`;

export async function signUpNewUser(
  email: string,
  password: string,
  name: string,
) {
  const supabaseBrowserClient = createClient();
  const { data, error } = await supabaseBrowserClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
      data: {
        name,
      },
    },
  });

  if (error) throw error;

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const supabaseBrowserClient = createClient();
  const { data, error } = await supabaseBrowserClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function logOut() {
  const supabaseBrowserClient = createClient();
  const { error } = await supabaseBrowserClient.auth.signOut();
  if (error) throw error;
}
