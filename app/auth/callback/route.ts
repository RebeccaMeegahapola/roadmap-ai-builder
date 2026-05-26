import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/'

    console.log('Callback received:', { code: !!code, next })

    if (code) {
        try {
            const supabase = await createServerClient()
            const { error } = await supabase.auth.exchangeCodeForSession(code)

            if (error) {
                console.error('Session exchange error:', error)
                return NextResponse.redirect(new URL('/auth/login?error=auth_failed', requestUrl.origin))
            }

            console.log('Session exchanged successfully')
        } catch (err) {
            console.error('Callback error:', err)
            return NextResponse.redirect(new URL('/auth/login?error=server_error', requestUrl.origin))
        }
    }

    // Redirect to dashboard or home
    return NextResponse.redirect(new URL(next, requestUrl.origin))
}