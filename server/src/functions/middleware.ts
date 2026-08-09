import type {Context, Next} from "hono";
import {signSession, verifySession} from "./jwt";
import {SessionClaims} from "@/models/SessionClaims";

export const TOKEN_LIFETIME_SECONDS = 30 * 60;
const REFRESH_THRESHOLD_SECONDS = 10 * 60;
const MAX_SESSION_SECONDS = 7 * 24 * 60 * 60;

const COOKIE_NAME = 'session';

function parseCookie(header: string | undefined, name: string): string | null {
    if(!header) {
        return null;
    }

    const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));

    return match ? match[1] : null;
}

export function setSessionCookie(c: Context, token: string): void {
    c.header(
        'Set-Cookie',
        `${COOKIE_NAME}=${token}; HttpOnly; Secure; Partitioned; SameSite=None; Path=/; Max-Age=${TOKEN_LIFETIME_SECONDS}`,
        {append: false}
    );
}

export function clearSessionCookie(c: Context): void {
    c.header('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Secure; Partitioned; SameSite=None; Path=/; Max-Age=0`);
}

export async function requireAuth(c: Context, next: Next) {
    const token: string | null = parseCookie(c.req.header('Cookie'), COOKIE_NAME);

    if(!token){
        return c.json({error: 'Unauthorized'}, 401);
    }

    const claims: SessionClaims | null = await verifySession(token, c.env.JWT_SECRET);

    if(!claims) {
        return c.json({error: 'Unauthorized'}, 401);
    }

    const now: number = Math.floor(Date.now() / 1000);
    const sessionDuration: number = now - claims.startedAt;

    if(sessionDuration > MAX_SESSION_SECONDS) {
        clearSessionCookie(c);
        return c.json({error: 'Session expired, please log in again'}, 401);
    }

    if(claims.expiresAt - now < REFRESH_THRESHOLD_SECONDS) {
        const newClaims: SessionClaims = {
            username: claims.username,
            issuedAt: now,
            expiresAt: now + TOKEN_LIFETIME_SECONDS,
            startedAt: claims.startedAt,
        }

        const newToken: string = await signSession(newClaims, c.env.JWT_SECRET);

        setSessionCookie(c, newToken);
    }

    c.set('currentUser', claims.username);

    await next();
}
