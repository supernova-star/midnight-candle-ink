import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase admin credentials are not configured');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

const getCookie = (cookieHeader: string | undefined, name: string) => {
  const matchingCookie = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  return matchingCookie
    ? decodeURIComponent(matchingCookie.slice(name.length + 1))
    : null;
};

const isAdminSession = (token: string | null) => {
  if (!token) return false;

  const [encodedPayload, signature] = token.split('.');
  const secret = process.env.SESSION_SECRET;

  if (!encodedPayload || !signature || !secret) {
    return false;
  }

  const payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    )
  ) {
    return false;
  }

  if (!payload.startsWith('admin:')) {
    return false;
  }

  const createdAt = Number(payload.slice('admin:'.length));

  if (!Number.isFinite(createdAt)) {
    return false;
  }

  const sessionAge = Date.now() - createdAt;

  return sessionAge >= 0 && sessionAge <= 24 * 60 * 60 * 1000;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionToken = getCookie(
    req.headers.cookie,
    'midnight_candle_admin_session',
  );

  if (!isAdminSession(sessionToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from('storybook_users')
      .select('browser_id, created_at, last_seen_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load storybook users:', error);

      return res.status(500).json({
        error: 'Unable to load users',
      });
    }

    const ACTIVE_WINDOW_MS = 2 * 60 * 1000;

    const users = (data ?? []).map((user) => ({
      ...user,
      is_active:
        Date.now() - new Date(user.last_seen_at).getTime() <= ACTIVE_WINDOW_MS,
    }));

    const activeUsers = users.filter((user) => user.is_active).length;

    return res.status(200).json({
      users,
      totalUsers: users.length,
      activeUsers,
    });
  } catch (error) {
    console.error('Admin users API error:', error);

    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
}
