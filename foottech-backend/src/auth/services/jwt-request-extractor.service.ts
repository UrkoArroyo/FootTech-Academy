import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type AnyObject = Record<string, any>;

@Injectable({ scope: Scope.REQUEST })
export class JwtRequestExtractor {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Extracts the raw token string from Authorization header or common cookie keys.
   */
  getToken(): string | null {
    const authHeader = this.request?.headers?.authorization || this.request?.headers?.Authorization;
    if (typeof authHeader === 'string') {
      const parts = authHeader.split(' ');
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
      return authHeader; // fallback: whole header if not Bearer
    }

    // Try common cookie names
    const cookieToken = this.request?.cookies?.access_token || this.request?.cookies?.token || this.request?.cookies?.auth;
    if (cookieToken) return cookieToken;

    return null;
  }

  /**
   * Returns the decoded token payload. If `verify` is true, token signature and expiration are verified.
   * Returns null when token is missing or invalid.
   */
  getPayload<T extends AnyObject = AnyObject>(verify = true): T | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      if (verify) {
        const secret = this.configService.get<string>('JWT_SECRET', 'change_this_in_prod');
        return this.jwtService.verify<T>(token, { secret });
      }
      return this.jwtService.decode(token) as T;
    } catch (err) {
      return null;
    }
  }

  /** Convenience: returns `sub` claim (usually user id) if present */
  getSubject(): number | string | null {
    const payload = this.getPayload() as any;
    return payload?.sub ?? null;
  }
}
