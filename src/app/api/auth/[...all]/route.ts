import { NextResponse } from 'next/server';
import { toNextJsHandler } from 'better-auth/next-js';

import { getAuth } from '@/core/auth';
import { isCloudflareWorker } from '@/shared/lib/env';
import { enforceMinIntervalRateLimit } from '@/shared/lib/rate-limit';

function maybeRateLimitGetSession(request: Request): Response | null {
  const url = new URL(request.url);
  // better-auth session endpoint is served under this catch-all route.
  if (isCloudflareWorker || !url.pathname.endsWith('/api/auth/get-session')) {
    return null;
  }

  const intervalMs =
    Number(process.env.AUTH_GET_SESSION_MIN_INTERVAL_MS) ||
    // default: 800ms (enough to stop request storms but still responsive)
    800;

  return enforceMinIntervalRateLimit(request, {
    intervalMs,
    keyPrefix: 'auth-get-session',
  });
}

async function handleAuthRequest(method: 'GET' | 'POST', request: Request) {
  const limited = maybeRateLimitGetSession(request);
  if (limited) {
    return limited;
  }

  const auth = await getAuth();
  const handler = toNextJsHandler(auth.handler);
  const response =
    method === 'POST' ? await handler.POST(request) : await handler.GET(request);

  if (response.status >= 400) {
    const url = new URL(request.url);
    let body = '';

    try {
      body = await response.clone().text();
    } catch {
      body = '<unreadable>';
    }

    console.error('[auth-route]', {
      method,
      pathname: url.pathname,
      status: response.status,
      origin: request.headers.get('origin') || '',
      referer: request.headers.get('referer') || '',
      host: request.headers.get('host') || '',
      vercelUrl: process.env.VERCEL_URL || '',
      productionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL || '',
      authUrl: process.env.AUTH_URL || '',
      appUrl: process.env.NEXT_PUBLIC_APP_URL || '',
      body,
    });

    if (
      response.status === 401 &&
      method === 'POST' &&
      url.pathname.endsWith('/api/auth/sign-up/email')
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Unauthorized',
          debug: {
            pathname: url.pathname,
            origin: request.headers.get('origin') || '',
            referer: request.headers.get('referer') || '',
            host: request.headers.get('host') || '',
            vercelUrl: process.env.VERCEL_URL || '',
            productionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL || '',
            authUrl: process.env.AUTH_URL || '',
            appUrl: process.env.NEXT_PUBLIC_APP_URL || '',
            responseBody: body,
          },
        },
        { status: 401 }
      );
    }
  }

  return response;
}

export async function POST(request: Request) {
  return handleAuthRequest('POST', request);
}

export async function GET(request: Request) {
  return handleAuthRequest('GET', request);
}
