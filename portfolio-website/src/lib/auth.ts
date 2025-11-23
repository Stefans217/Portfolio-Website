import { scrypt, randomBytes, timingSafeEqual, createHmac } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);
const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key-change-me';

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(':');
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return timingSafeEqual(keyBuffer, derivedKey);
}

export function signSession(userId: string): string {
  const signature = createHmac('sha256', SECRET_KEY).update(userId).digest('hex');
  return `${userId}.${signature}`;
}

export function verifySession(sessionToken: string): string | null {
  const [userId, signature] = sessionToken.split('.');
  if (!userId || !signature) return null;

  const expectedSignature = createHmac('sha256', SECRET_KEY).update(userId).digest('hex');
  if (signature === expectedSignature) {
    return userId;
  }
  return null;
}
