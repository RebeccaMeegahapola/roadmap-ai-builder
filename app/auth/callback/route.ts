// app/auth/callback/route.ts
import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = await createServerClient()
        await supabase.auth.exchangeCodeForSession(code)

        // ✅ THIS FIXES THE VERCELL ISSUE
        await new Promise((resolve) => setTimeout(resolve, 0))
    }

    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}