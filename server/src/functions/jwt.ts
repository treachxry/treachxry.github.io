import {SessionClaims} from "@/models/SessionClaims";

function base64url(input: ArrayBuffer | string): string {
    const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
    let str = btoa(String.fromCharCode(...bytes));
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(input: string): Uint8Array {
    const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(input.length + ((4 - (input.length % 4)) % 4), "=");
    const binary = atob(padded);
    return new Uint8Array([...binary].map((c) => c.charCodeAt(0)));
}

async function getKey(secret: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        {name: "HMAC", hash: "SHA-256"},
        false,
        ["sign", "verify"]
    );
}

export async function signSession(claims: SessionClaims, secret: string): Promise<string> {
    const header = base64url(JSON.stringify({alg: "HS256", typ: "JWT"}));
    const payload = base64url(JSON.stringify(claims));
    const key = await getKey(secret);
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${header}.${payload}`));

    return `${header}.${payload}.${base64url(sig)}`;
}

export async function verifySession(token: string, secret: string): Promise<SessionClaims | null> {
    const parts = token.split(".");

    if(parts.length !== 3) return null;

    const [header, payload, sig] = parts;

    const key = await getKey(secret);
    const valid = await crypto.subtle.verify(
        "HMAC",
        key,
        base64urlDecode(sig),
        new TextEncoder().encode(`${header}.${payload}`)
    );

    if(!valid) return null;

    let claims: SessionClaims;

    try {
        claims = JSON.parse(new TextDecoder().decode(base64urlDecode(payload)));
    }
    catch {
        return null;
    }

    const now = Math.floor(Date.now() / 1000);
    if(claims.expiresAt < now) return null;

    return claims;
}
