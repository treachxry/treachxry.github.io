function toHex(buf: ArrayBuffer): string {
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);

    for(let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }

    return bytes;
}

async function deriveHash(password: string, salt: Uint8Array): Promise<string> {
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const bits = await crypto.subtle.deriveBits(
        {name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256"},
        keyMaterial,
        256
    );

    return toHex(bits);
}

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await deriveHash(password, salt);
    return {hash, salt: toHex(salt.buffer as ArrayBuffer)};
}

export async function verifyPassword(password: string, storedHashHex: string, storedSaltHex: string): Promise<boolean> {
    const attemptHash: string = await deriveHash(password, fromHex(storedSaltHex));

    if(attemptHash.length !== storedHashHex.length) {
        return false;
    }

    return crypto.subtle.timingSafeEqual(Buffer.from(attemptHash), Buffer.from(storedHashHex));
}
