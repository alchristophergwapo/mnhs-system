import { SupabaseClient } from '@supabase/supabase-js';
import { createServerClient } from "@supabase/ssr";
import { cookies } from 'next/headers';

const supabaseInstance: SupabaseClient | null = null;


export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
    if (supabaseInstance) {
        return supabaseInstance;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error(
            'Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set'
        );
    }

    try {
        return createServerClient(
            supabaseUrl!,
            supabaseKey!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                        } catch(err) {
                            throw new Error(`Failed to set cookies: ${err}`);
                            // The `setAll` method was called from a Server Component.
                            // This can be ignored if you have middleware refreshing
                            // user sessions.
                        }
                    },
                },
            },
        );
    } catch (error) {
        throw new Error(`Failed to create Supabase client: ${error}`);
    }
};
