import { scrypt, randomBytes, timingSafeEqual, createHmac } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

// Fail fast if the secret key is not configured
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY || SECRET_KEY === 'default-secret-key-change-me') {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'FATAL: JWT_SECRET environment variable is missing or using the default value. Set a strong, unique secret before deploying.'
    );
  } else {
    console.warn(
      '⚠️  JWT_SECRET is missing or using the default. Sessions are insecure. Set JWT_SECRET in your .env file.'
    );
  }
}
const EFFECTIVE_SECRET = SECRET_KEY ?? 'dev-only-insecure-key';

// Session tokens expire after 7 days (in seconds)
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(':');
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  if (keyBuffer.length !== derivedKey.length) return false;
  return timingSafeEqual(keyBuffer, derivedKey);
}

/**
 * Creates a session token with an embedded expiration timestamp.
 * Format: `userId.expiresAt.signature`
 */
export function signSession(userId: string): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload = `${userId}.${expiresAt}`;
  const signature = createHmac('sha256', EFFECTIVE_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Verifies a session token's signature and expiration.
 * Returns the userId if valid, null otherwise.
 */
export function verifySession(sessionToken: string): string | null {
  const parts = sessionToken.split('.');
  if (parts.length !== 3) return null;

  const [userId, expiresAtStr, signature] = parts;
  if (!userId || !expiresAtStr || !signature) return null;

  // Verify expiration
  const expiresAt = Number(expiresAtStr);
  if (Number.isNaN(expiresAt) || Math.floor(Date.now() / 1000) > expiresAt) {
    return null;
  }

  // Verify signature using timing-safe comparison
  const payload = `${userId}.${expiresAtStr}`;
  const expectedSignature = createHmac('sha256', EFFECTIVE_SECRET).update(payload).digest('hex');
  const sigBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (sigBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return null;

  return userId;
}
