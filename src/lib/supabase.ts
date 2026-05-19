import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let publicClient: SupabaseClient | null | undefined;
let serviceClient: SupabaseClient | null | undefined;

export function getSupabaseClient(): SupabaseClient | null {
  if (publicClient !== undefined) {
    return publicClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  publicClient = url && anonKey ? createClient(url, anonKey) : null;
  return publicClient;
}

export function getSupabaseServiceClient(): SupabaseClient | null {
  if (serviceClient !== undefined) {
    return serviceClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  serviceClient = url && serviceKey ? createClient(url, serviceKey) : null;
  return serviceClient;
}

