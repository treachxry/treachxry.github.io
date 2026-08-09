import {z} from "zod";
import {contentJson, OpenAPIRoute} from "chanfana";
import {AppContext} from "@/models/AppContext";
import {UserDbModel} from "common/models/database/User";
import {LoginResponseModel} from "common/models/LoginResponseModel";
import {SessionClaims} from "@/models/SessionClaims";
import {verifyPassword} from "@/functions/password";
import {signSession} from "@/functions/jwt";
import {setSessionCookie, TOKEN_LIFETIME_SECONDS} from "@/functions/middleware";

export class Login extends OpenAPIRoute {
    schema = {
        request: {
            body: contentJson(z.object({
                username: z.string().min(1).max(20),
                password: z.string().min(8).max(40)
            }))
        },
        response: {
            "200": {
                description: 'Successful login',
                ...contentJson(z.object({
                    ok: z.boolean(),
                    username: z.string()
                }))
            },
            "401": {
                description: 'Failed login',
                ...contentJson(z.object({
                    ok: z.boolean(),
                    error: z.string()
                }))
            }
        }
    }

    async handle(c: AppContext) {
        const {body} = await this.getValidatedData<typeof this.schema>();

        try {
            const user: UserDbModel | null = await c.env.profile.prepare(`
                SELECT *
                FROM [User]
                WHERE [username] = ? AND [isActive] = 1
            `)
                .bind(body.username)
                .first<UserDbModel>();

            const password: string = body.password;
            const passwordHash: string = user?.passwordHash ?? '0'.repeat(64);
            const passwordSalt: string = user?.passwordSalt ?? '0'.repeat(64);

            const ok: boolean = await verifyPassword(password, passwordHash, passwordSalt);

            if(ok && user) {
                const now: number = Math.floor(Date.now() / 1000);

                const claims: SessionClaims = {
                    username: user.username,
                    issuedAt: now,
                    expiresAt: now + TOKEN_LIFETIME_SECONDS,
                    startedAt: now
                };

                const token: string = await signSession(claims, c.env.JWT_SECRET);

                setSessionCookie(c, token);

                return c.json({
                    ok: true,
                    username: user.username
                } as LoginResponseModel, 200);
            }
        }
        catch {}

        return c.json({
            ok: false,
            error: 'Incorrect username or password'
        } as LoginResponseModel, 401);
    }
}

