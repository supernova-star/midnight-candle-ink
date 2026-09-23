import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const forwardedFor = req.headers['x-forwarded-for'];

    const ip =
      typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0].trim()
        : (req.socket.remoteAddress ?? null);

    if (!ip || ip === '::1' || ip === '127.0.0.1') {
      return res.status(200).json({
        ip,
        city: null,
        region: null,
        country: null,
      });
    }

    const response = await fetch(`https://ipapi.co/${ip}/json/`);

    if (!response.ok) {
      throw new Error('Failed to fetch IP location');
    }

    const data = await response.json();

    return res.status(200).json({
      ip,
      city: data.city ?? null,
      region: data.region ?? null,
      country: data.country_name ?? null,
    });
  } catch (error) {
    console.error('Visitor location error:', error);

    return res.status(500).json({
      error: 'Unable to determine visitor location',
    });
  }
}
