import { Lucia } from 'lucia';
import { NeonHTTPAdapter } from "@lucia-auth/adapter-postgresql";

import sql from '@/lib/db';
import { cookies } from 'next/headers';

const adapter = new NeonHTTPAdapter(sql, {
    user: 'users',
    session: 'sessions'
});

const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
})

export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
}